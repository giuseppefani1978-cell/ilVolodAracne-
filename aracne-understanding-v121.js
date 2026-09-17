(() => {
  "use strict";

  const VERSION="1.2.1";
  const engine=window.AracneIntelligence;
  const bridge=window.aracneIntelligenceBridge;

  if(!engine || !bridge){
    console.warn("[Aracne Conversation] base engine not ready");
    return;
  }

  const state={
    messages:[],
    running:false,
    speechToken:0,
    lastResult:null
  };

  const LABELS={
    it:{you:"Tu",aracne:"Aracne",thinking:"Aracne sta tessendo…",error:"Non sono riuscita a capire bene la richiesta. Puoi riformularla?"},
    fr:{you:"Vous",aracne:"Aracne",thinking:"Aracne tisse sa réponse…",error:"Je n’ai pas réussi à comprendre correctement la demande. Peux-tu la reformuler ?"},
    en:{you:"You",aracne:"Aracne",thinking:"Aracne is weaving…",error:"I could not understand the request correctly. Could you rephrase it?"},
    es:{you:"Tú",aracne:"Aracne",thinking:"Aracne está tejiendo…",error:"No he podido entender bien la solicitud. ¿Puedes reformularla?"}
  };

  const ORDINALS={
    it:[["il primo","la prima","primo","prima"],["il secondo","la seconda","secondo","seconda"],["il terzo","la terza","terzo","terza"]],
    fr:[["le premier","la premiere","premier","premiere"],["le deuxieme","la deuxieme","le second","la seconde","deuxieme","second"],["le troisieme","la troisieme","troisieme"]],
    en:[["the first","first","first one","the first one"],["the second","second","second one","the second one"],["the third","third","third one","the third one"]],
    es:[["el primero","la primera","primero","primera"],["el segundo","la segunda","segundo","segunda"],["el tercero","la tercera","tercero","tercera"]]
  };

  function normalize(value=""){
    return String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[’']/g," ")
      .replace(/[-–—]/g," ")
      .replace(/[^a-z0-9\s]/g," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function languageFor(text=""){
    return engine.detectLanguage?.(text)
      || String(bridge.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function label(language,key){
    return (LABELS[language]||LABELS.it)[key]||key;
  }

  function boundaryIncludes(haystack,needle){
    const h=" "+normalize(haystack)+" ";
    const n=normalize(needle);
    return !!n && h.includes(" "+n+" ");
  }

  function territoryMatches(text){
    try{return engine.territoriesFor?.(text)||[];}catch(error){return [];}
  }

  function territoryInfo(match){
    if(!match)return null;
    const entry=match.entry||{};
    return {
      id:match.id||entry.id||null,
      name:entry.name||match.name||match.id||"",
      aliases:entry.aliases||{},
      matchedAlias:match.matchedAlias||null
    };
  }

  function orderedTerritories(text){
    const n=normalize(text);
    const seen=new Set();
    const out=[];

    for(const raw of territoryMatches(text)){
      const item=territoryInfo(raw);
      if(!item?.id || seen.has(item.id))continue;
      const candidates=[item.matchedAlias,item.name,item.id]
        .filter(Boolean)
        .map(normalize)
        .filter(Boolean);
      let pos=Number.POSITIVE_INFINITY;
      for(const candidate of candidates){
        const p=(" "+n+" ").indexOf(" "+candidate+" ");
        if(p>=0)pos=Math.min(pos,p);
      }
      out.push({...item,pos});
      seen.add(item.id);
    }

    return out.sort((a,b)=>a.pos-b.pos);
  }

  function exactPoiIds(text,territories){
    const n=normalize(text);
    const territoryMap=new Map((territories||[]).map(t=>[t.id,t]));
    const ids=new Set();

    for(const place of bridge.getPlaces?.()||[]){
      const name=normalize(place?.name||"");
      const idText=normalize(String(place?.id||"").replace(/_/g," "));
      const fullNameMatch=name.length>=4 && (" "+n+" ").includes(" "+name+" ");
      const idMatch=idText.length>=5 && (" "+n+" ").includes(" "+idText+" ");
      if(!fullNameMatch && !idMatch)continue;

      let cityRepresentative=false;
      for(const territory of territoryMap.values()){
        const cityName=normalize(territory.name||territory.id);
        if(
          normalize(place?.id||"")===normalize(territory.id)
          ||
          (name && cityName && name===cityName)
        ){
          cityRepresentative=true;
          break;
        }
      }

      // A bare city mention means the city. A POI is treated as explicit only
      // when its full, more specific name is actually spoken or written.
      if(cityRepresentative)continue;
      ids.add(place.id);
    }
    return ids;
  }

  async function withCityFirstEntityPolicy(text,fn){
    const territories=orderedTerritories(text);
    if(!territories.length || typeof bridge.findExactPlaces!=="function")return await fn();

    const originalFindExact=bridge.findExactPlaces;
    const explicitIds=exactPoiIds(text,territories);

    bridge.findExactPlaces=query=>{
      let base=[];
      try{base=originalFindExact.call(bridge,query)||[];}catch(error){base=[];}
      return base.filter(place=>explicitIds.has(place?.id));
    };

    try{
      return await fn();
    }finally{
      bridge.findExactPlaces=originalFindExact;
    }
  }

  function resolveOrdinalClarification(text,language){
    const context=engine.context?.();
    const pending=context?.pendingClarification;
    if(pending?.type!=="route_origin" || !(pending.placeIds?.length))return null;
    const n=normalize(text);
    const groups=ORDINALS[language]||ORDINALS.it;
    let index=-1;

    groups.some((phrases,i)=>{
      if(phrases.some(p=>boundaryIncludes(n,p))){index=i;return true;}
      return false;
    });

    if(index<0 || !pending.placeIds[index])return null;
    const id=pending.placeIds[index];
    const place=(bridge.getPlaces?.()||[]).find(item=>item?.id===id);
    return place?.name||id;
  }

  function prepareForEngine(rawText){
    const original=String(rawText||"").trim();
    const language=languageFor(original);
    const ordinal=resolveOrdinalClarification(original,language);

    // v1.2.1 deliberately keeps the user's sentence intact. The previous test
    // layer rewrote whole clauses and damaged the order of multiple intentions.
    // We only translate an ordinal clarification into the concrete pending city.
    return {
      original,
      prepared:ordinal||original,
      language,
      reason:ordinal?"clarification_ordinal":"original_semantics"
    };
  }

  function addStyles(){
    if(document.getElementById("aracneConversation121Styles"))return;
    const style=document.createElement("style");
    style.id="aracneConversation121Styles";
    style.textContent=`
      #aracneConversation121{display:none;margin:8px 0 12px;padding:2px 0;max-height:38vh;overflow:auto;scroll-behavior:smooth}
      #aracneConversation121.show{display:block}
      .aracne121-msg{display:flex;flex-direction:column;gap:3px;margin:8px 0}
      .aracne121-msg.user{align-items:flex-end}
      .aracne121-msg.assistant{align-items:flex-start}
      .aracne121-who{font-size:.68rem;font-weight:700;opacity:.58;padding:0 5px}
      .aracne121-bubble{max-width:92%;padding:10px 12px;border-radius:15px;font-size:.86rem;line-height:1.38;white-space:pre-wrap;overflow-wrap:anywhere}
      .aracne121-msg.user .aracne121-bubble{background:rgba(138,35,135,.10);border:1px solid rgba(138,35,135,.16);border-bottom-right-radius:5px}
      .aracne121-msg.assistant .aracne121-bubble{background:rgba(40,120,232,.08);border:1px solid rgba(40,120,232,.14);border-bottom-left-radius:5px}
      .aracne121-msg.clarify .aracne121-bubble{box-shadow:inset 3px 0 0 rgba(138,35,135,.38)}
      #assistantResult.aracne121-hidden-result{display:none!important}
    `;
    document.head.appendChild(style);
  }

  function ensureThread(){
    addStyles();
    const body=document.querySelector(".assistant-body");
    if(!body)return null;
    let thread=document.getElementById("aracneConversation121");
    if(thread)return thread;

    thread=document.createElement("div");
    thread.id="aracneConversation121";
    thread.setAttribute("role","log");
    thread.setAttribute("aria-live","polite");

    const result=document.getElementById("assistantResult");
    if(result?.parentNode===body)body.insertBefore(thread,result);
    else body.appendChild(thread);

    renderThread();
    return thread;
  }

  function renderThread(){
    const thread=document.getElementById("aracneConversation121");
    if(!thread)return;
    thread.innerHTML="";

    for(const message of state.messages){
      const row=document.createElement("div");
      row.className="aracne121-msg "+message.role+(message.clarify?" clarify":"");
      const who=document.createElement("div");
      who.className="aracne121-who";
      who.textContent=message.role==="user"?label(message.language,"you"):label(message.language,"aracne");
      const bubble=document.createElement("div");
      bubble.className="aracne121-bubble";
      bubble.textContent=message.text;
      row.append(who,bubble);
      thread.appendChild(row);
    }

    thread.classList.toggle("show",state.messages.length>0);
    requestAnimationFrame(()=>{thread.scrollTop=thread.scrollHeight;});
  }

  function pushMessage(role,text,language,options={}){
    const value=String(text||"").trim();
    if(!value)return;
    state.messages.push({role,text:value,language,clarify:!!options.clarify});
    if(state.messages.length>24)state.messages=state.messages.slice(-24);
    ensureThread();
    renderThread();
  }

  function setUnderlyingResult(result){
    try{bridge.showResult?.("Aracne",result?.text||"");}catch(error){
      console.warn("[Aracne Conversation] showResult",error);
    }
    document.getElementById("assistantResult")?.classList.add("aracne121-hidden-result");
  }

  function isClarification(result){
    return !!result?.clarification || String(result?.intent||"").startsWith("clarify");
  }

  function hasSuccessfulRoute(result){
    return Array.isArray(result?.actions) && result.actions.includes("route");
  }

  function clearTranscript(){
    const field=document.getElementById("assistantTranscript");
    if(field)field.value="";
  }

  function focusTranscript(){
    setTimeout(()=>document.getElementById("assistantTranscript")?.focus(),80);
  }

  function estimatedSpeechMs(text){
    const words=String(text||"").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(3800,Math.min(28000,Math.round((words/2.15)*1000)+1200));
  }

  function speakKeepingChatOpen(result){
    state.speechToken+=1;
    try{engine.speak?.(result?.text||"",result?.language||null);}catch(error){
      console.warn("[Aracne Conversation] clarification speech",error);
    }
  }

  function speakThenRevealRoute(result){
    const token=++state.speechToken;
    let finished=false;
    const finish=()=>{
      if(finished || token!==state.speechToken)return;
      finished=true;
      try{bridge.speechEnd?.(result);}catch(error){
        console.warn("[Aracne Conversation] speechEnd",error);
        try{bridge.afterAnswer?.(result);}catch(inner){}
      }
    };

    let handle=null;
    try{
      handle=engine.speak?.(
        result?.text||"",
        result?.language||null,
        {
          onStart:()=>{try{bridge.speechStart?.(result);}catch(error){}},
          onEnd:finish,
          onError:finish
        }
      );
    }catch(error){
      console.warn("[Aracne Conversation] route speech",error);
    }

    if(!handle){
      setTimeout(finish,900);
      return;
    }

    // iOS/WebKit can miss onend. The map must still appear only after the
    // approximate end of the spoken answer, never while Aracne is clarifying.
    setTimeout(finish,estimatedSpeechMs(result?.text));
  }

  async function runConversation(rawText){
    if(state.running)return null;
    const prepared=prepareForEngine(rawText);
    if(!prepared.original)return null;

    state.running=true;
    pushMessage("user",prepared.original,prepared.language);
    clearTranscript();

    try{
      const result=await withCityFirstEntityPolicy(prepared.prepared,()=>engine.execute(prepared.prepared));
      state.lastResult=result;

      setUnderlyingResult(result);
      const clarify=isClarification(result);
      pushMessage("assistant",result?.text||"",result?.language||prepared.language,{clarify});

      if(clarify){
        // The clarification belongs to the conversation. Keep the modal open,
        // retain the thread, and let the next user turn resolve engine context.
        speakKeepingChatOpen(result);
        focusTranscript();
        return result;
      }

      try{bridge.saveAnswer?.(result);}catch(error){
        console.warn("[Aracne Conversation] saveAnswer",error);
      }

      if(hasSuccessfulRoute(result)){
        // Final answer first; only when speech is finished do we hand over to
        // the existing map + spider-weaving experience.
        speakThenRevealRoute(result);
      }else{
        // Pure information answers stay conversational: no forced map/close.
        speakKeepingChatOpen(result);
        focusTranscript();
      }

      return result;
    }catch(error){
      console.error("[Aracne Conversation] request failed",error);
      const language=prepared.language;
      const text=label(language,"error");
      const fallback={ok:false,intent:"error",language,text,actions:[]};
      state.lastResult=fallback;
      setUnderlyingResult(fallback);
      pushMessage("assistant",text,language,{clarify:true});
      focusTranscript();
      return fallback;
    }finally{
      state.running=false;
    }
  }

  function installButton(){
    ensureThread();
    const oldButton=document.getElementById("assistantAsk");
    if(!oldButton)return false;
    if(oldButton.dataset.aracneConversation121==="1")return true;

    const button=oldButton.cloneNode(true);
    button.dataset.aracneConversation121="1";
    oldButton.replaceWith(button);

    button.addEventListener("click",async()=>{
      const raw=bridge.getTranscript?.()
        || document.getElementById("assistantTranscript")?.value
        || "";
      if(!String(raw).trim())return;

      const language=languageFor(raw);
      const span=button.querySelector("span");
      const idle=span?.textContent||"Aracne";
      button.disabled=true;
      if(span)span.textContent=label(language,"thinking");

      try{await runConversation(raw);}
      finally{
        button.disabled=false;
        if(span)span.textContent=idle;
      }
    });

    return true;
  }

  function keepThreadVisible(){
    ensureThread();
    if(state.messages.length)renderThread();
    document.getElementById("assistantResult")?.classList.add("aracne121-hidden-result");
  }

  const observer=new MutationObserver(()=>{
    installButton();
    keepThreadVisible();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});

  installButton();
  keepThreadVisible();

  window.AracneUnderstanding121={
    version:VERSION,
    run:runConversation,
    prepare:prepareForEngine,
    messages:()=>state.messages.map(message=>({...message})),
    clearThread:()=>{state.messages=[];renderThread();},
    status:()=>({
      version:VERSION,
      installed:document.getElementById("assistantAsk")?.dataset?.aracneConversation121==="1",
      messages:state.messages.length,
      context:engine.context?.()||null
    })
  };

  console.info(`[Aracne Conversation] v${VERSION} active — city-first, persistent thread`);
})();
