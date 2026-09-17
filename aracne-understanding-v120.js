(() => {
  "use strict";

  const VERSION="1.2.0";
  const engine=window.AracneIntelligence;
  const bridge=window.aracneIntelligenceBridge;

  if(!engine || !bridge){
    console.warn("[Aracne Understanding] base engine not ready");
    return;
  }

  const RULES={
    it:{
      fillers:["ehm","em","mmm","allora","dunque","praticamente","cioe","ecco"],
      trailing:["ok","okay","ecco","no"],
      sequence:["poi","dopo","quindi","successivamente","infine","alla fine","e poi"],
      routePrefix:"creami un percorso ",
      seePrefix:"cosa vedere a ",
      themeWords:{sea:["mare","spiaggia","spiagge","costa","baia","baie"],nature:["natura","parco","parchi","bosco","boschi","verde"],culture:["cultura","storia","arte","chiese","chiesa","castello","castelli","musei","museo"],food:["cibo","cucina","gastronomia","sapori","ristoranti","ristorante"]},
      first:["il primo","la prima","primo","prima","il primo luogo","la prima citta"],
      second:["il secondo","la seconda","secondo","seconda","il secondo luogo","la seconda citta"],
      third:["il terzo","la terza","terzo","terza"],
      contrast:[" invece "," ma "," soltanto "," solo "],
      negativeRoute:[
        /\bnon\s+(?:voglio|vorrei)\s+(?:un\s+)?(?:percorso|itinerario|tragitto|tour)\b/g,
        /\bnon\s+(?:farmi|crearmi|costruirmi|prepararmi|organizzarmi)\s+(?:un\s+)?(?:percorso|itinerario|tragitto|tour)\b/g,
        /\bsenza\s+(?:un\s+)?(?:percorso|itinerario|tragitto|tour)\b/g
      ],
      rewrites:[
        [/\bche cosa si puo vedere\b/g,"cosa vedere"],
        [/\bcosa si puo vedere\b/g,"cosa vedere"],
        [/\bche cosa posso vedere\b/g,"cosa vedere"],
        [/\bcosa posso vedere\b/g,"cosa vedere"],
        [/\bche cosa c e da vedere\b/g,"cosa c e da vedere"],
        [/\bche cosa si puo fare\b/g,"cosa vedere"],
        [/\bcosa si puo fare\b/g,"cosa vedere"],
        [/\be successivamente\b/g,"e poi"],
        [/\be infine\b/g,"e poi"],
        [/\bper finire\b/g,"e poi"]
      ]
    },
    fr:{
      fillers:["euh","heu","hum","alors","bon","ben","bah","en fait","donc","voila"],
      trailing:["ok","okay","voila","non"],
      sequence:["puis","ensuite","apres","apres ca","finalement","enfin","et puis","et ensuite"],
      routePrefix:"cree un parcours ",
      seePrefix:"que voir a ",
      themeWords:{sea:["mer","plage","plages","cote","baie","baies"],nature:["nature","parc","parcs","foret","forets","plein air"],culture:["culture","histoire","art","eglise","eglises","chateau","chateaux","musee","musees"],food:["gastronomie","cuisine","saveurs","restaurant","restaurants","manger"]},
      first:["le premier","la premiere","premier","premiere","le premier lieu","la premiere ville"],
      second:["le deuxieme","la deuxieme","le second","la seconde","deuxieme","second"],
      third:["le troisieme","la troisieme","troisieme"],
      contrast:[" mais "," plutot "," seulement "," juste "," par contre "],
      negativeRoute:[
        /\bje\s+ne\s+veux\s+pas\s+(?:de\s+|d\s+|un\s+)?(?:parcours|itineraire|trajet|circuit|tour)\b/g,
        /\bje\s+veux\s+pas\s+(?:de\s+|d\s+|un\s+)?(?:parcours|itineraire|trajet|circuit|tour)\b/g,
        /\bpas\s+de\s+(?:parcours|itineraire|trajet|circuit|tour)\b/g,
        /\bsans\s+(?:parcours|itineraire|trajet|circuit|tour)\b/g,
        /\bne\s+(?:me\s+)?(?:fais|cree|construis|prepare)\s+pas\s+(?:un\s+)?(?:parcours|itineraire|trajet|circuit|tour)\b/g
      ],
      rewrites:[
        [/\bqu est ce qu on peut voir\b/g,"que voir"],
        [/\bqu est ce que l on peut voir\b/g,"que voir"],
        [/\bqu est ce que je peux voir\b/g,"que voir"],
        [/\bqu est ce qu il faut voir\b/g,"que voir"],
        [/\bqu est ce qu on peut faire\b/g,"que voir"],
        [/\bqu est ce que l on peut faire\b/g,"que voir"],
        [/\bet ensuite\b/g,"puis"],
        [/\bet finalement\b/g,"puis"],
        [/\bpour finir\b/g,"puis"]
      ]
    },
    en:{
      fillers:["um","uh","erm","well","so","basically","actually","okay","ok"],
      trailing:["ok","okay","right","no"],
      sequence:["then","next","after","after that","finally","lastly","and then"],
      routePrefix:"create a route ",
      seePrefix:"what to see in ",
      themeWords:{sea:["sea","beach","beaches","coast","bay","bays"],nature:["nature","park","parks","forest","forests","outdoors"],culture:["culture","history","art","church","churches","castle","castles","museum","museums"],food:["food","gastronomy","cuisine","flavours","flavors","restaurant","restaurants"]},
      first:["the first","first","first one","the first one","first place"],
      second:["the second","second","second one","the second one","second place"],
      third:["the third","third","third one","the third one"],
      contrast:[" but "," instead "," rather "," just "," only "],
      negativeRoute:[
        /\bi\s+do\s+not\s+want\s+(?:a\s+|an\s+)?(?:route|itinerary|trip|tour)\b/g,
        /\bi\s+dont\s+want\s+(?:a\s+|an\s+)?(?:route|itinerary|trip|tour)\b/g,
        /\bdont\s+(?:make|create|build|plan)\s+(?:me\s+)?(?:a\s+|an\s+)?(?:route|itinerary|trip|tour)\b/g,
        /\bdo\s+not\s+(?:make|create|build|plan)\s+(?:me\s+)?(?:a\s+|an\s+)?(?:route|itinerary|trip|tour)\b/g,
        /\bwithout\s+(?:a\s+|an\s+)?(?:route|itinerary|trip|tour)\b/g,
        /\bno\s+(?:route|itinerary|trip|tour)\b/g
      ],
      rewrites:[
        [/\bwhat can i see\b/g,"what to see"],
        [/\bwhat can we see\b/g,"what to see"],
        [/\bwhat is there to visit\b/g,"what to see"],
        [/\bwhat can i do there\b/g,"what to see there"],
        [/\band finally\b/g,"and then"],
        [/\blast but not least\b/g,"and then"]
      ]
    },
    es:{
      fillers:["eh","em","mmm","bueno","pues","entonces","o sea","vale"],
      trailing:["ok","okay","vale","no"],
      sequence:["luego","despues","despues de eso","entonces","finalmente","por ultimo","y luego"],
      routePrefix:"crea una ruta ",
      seePrefix:"que ver en ",
      themeWords:{sea:["mar","playa","playas","costa","bahia","bahias"],nature:["naturaleza","parque","parques","bosque","bosques","aire libre"],culture:["cultura","historia","arte","iglesia","iglesias","castillo","castillos","museo","museos"],food:["comida","gastronomia","cocina","sabores","restaurante","restaurantes"]},
      first:["el primero","la primera","primero","primera","el primer lugar","la primera ciudad"],
      second:["el segundo","la segunda","segundo","segunda"],
      third:["el tercero","la tercera","tercero","tercera"],
      contrast:[" pero "," sino "," solo "," solamente "," mejor "],
      negativeRoute:[
        /\bno\s+quiero\s+(?:una\s+)?(?:ruta|itinerario|recorrido|trayecto|tour)\b/g,
        /\bno\s+(?:me\s+)?(?:hagas|crees|construyas|prepares)\s+(?:una\s+)?(?:ruta|itinerario|recorrido|trayecto|tour)\b/g,
        /\bsin\s+(?:una\s+)?(?:ruta|itinerario|recorrido|trayecto|tour)\b/g
      ],
      rewrites:[
        [/\bque puedo ver\b/g,"que ver"],
        [/\bque podemos ver\b/g,"que ver"],
        [/\bque se puede ver\b/g,"que ver"],
        [/\bque puedo hacer alli\b/g,"que ver alli"],
        [/\by finalmente\b/g,"y luego"],
        [/\bpor ultimo\b/g,"y luego"]
      ]
    }
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

  function languageFor(text){
    return engine.detectLanguage?.(text)
      || String(bridge.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function hasPhrase(text,phrases=[]){
    const wrapped=" "+text+" ";
    return phrases.some(raw=>wrapped.includes(" "+normalize(raw)+" "));
  }

  function stripLeadingFillers(text,rule){
    let words=text.split(" ").filter(Boolean);
    let changed=true;
    while(changed && words.length){
      changed=false;
      for(const filler of [...rule.fillers].sort((a,b)=>b.length-a.length)){
        const f=normalize(filler).split(" ");
        if(f.every((word,index)=>words[index]===word)){
          words=words.slice(f.length);
          changed=true;
          break;
        }
      }
    }
    return words.join(" ");
  }

  function stripTrailingResidue(text,rule){
    const words=text.split(" ").filter(Boolean);
    if(words.length<6)return text;
    const last=words[words.length-1];
    if(rule.trailing.includes(last))words.pop();
    return words.join(" ");
  }

  function stripNegatedRoute(text,rule){
    let n=text;
    const hasNegative=rule.negativeRoute.some(re=>{
      re.lastIndex=0;
      return re.test(n);
    });
    if(!hasNegative)return {text:n,negated:false};

    // In natural speech a correction usually follows "but / instead / juste / invece".
    // If present, keep the positive clause and discard the rejected route clause.
    let best=-1;
    for(const raw of rule.contrast||[]){
      const token=normalize(raw);
      const pos=(" "+n+" ").indexOf(" "+token+" ");
      if(pos>=0 && (best<0 || pos<best))best=pos;
    }
    if(best>=0){
      const wrapped=" "+n+" ";
      const tail=wrapped.slice(best).trim().replace(/^(?:mais|plutot|seulement|juste|par contre|invece|ma|soltanto|solo|but|instead|rather|just|only|pero|sino|solamente|mejor)\s+/,"");
      if(tail)return {text:tail,negated:true};
    }

    for(const re of rule.negativeRoute){
      re.lastIndex=0;
      n=n.replace(re," ");
    }
    return {text:n.replace(/\s+/g," ").trim(),negated:true};
  }

  function applyRewrites(text,rule){
    let n=text;
    for(const [pattern,replacement] of rule.rewrites||[])n=n.replace(pattern,replacement);
    return n.replace(/\s+/g," ").trim();
  }

  function themeIn(text,rule){
    for(const [theme,words] of Object.entries(rule.themeWords||{})){
      if(hasPhrase(text,words))return theme;
    }
    return null;
  }

  function territoryCount(text){
    try{
      const matches=engine.territoriesFor?.(text)||[];
      return new Set(matches.map(item=>item?.id).filter(Boolean)).size;
    }catch(error){
      return 0;
    }
  }

  function hasExplicitIntent(text,language){
    const common={
      it:["parlami","raccontami","spiegami","cosa vedere","vicino a","intorno a","percorso","itinerario","apri","mostra","aggiungi"],
      fr:["parle moi","raconte moi","explique moi","que voir","autour de","pres de","parcours","itineraire","ouvre","montre","ajoute"],
      en:["tell me","describe","explain","what to see","near","around","route","itinerary","open","show","add"],
      es:["hablame","cuentame","explicame","que ver","cerca de","alrededor de","ruta","itinerario","abre","muestra","anade"]
    };
    return hasPhrase(text,common[language]||common.it);
  }

  function resolveOrdinal(text,language){
    const context=engine.context?.();
    const pending=context?.pendingClarification;
    if(pending?.type!=="route_origin" || !(pending.placeIds?.length))return null;
    const rule=RULES[language]||RULES.it;
    let index=-1;
    if(hasPhrase(text,rule.first))index=0;
    else if(hasPhrase(text,rule.second))index=1;
    else if(hasPhrase(text,rule.third))index=2;
    if(index<0 || !pending.placeIds[index])return null;

    const id=pending.placeIds[index];
    const place=(bridge.getPlaces?.()||[]).find(item=>item?.id===id);
    return place?.name||id;
  }

  function contextualThemeFollowup(text,language){
    const context=engine.context?.();
    const territoryId=context?.lastTerritoryId;
    if(!territoryId)return null;
    if(territoryCount(text)>0 || hasExplicitIntent(text,language))return null;

    const words=text.split(" ").filter(Boolean);
    if(words.length>9)return null;
    const rule=RULES[language]||RULES.it;
    const theme=themeIn(text,rule);
    if(!theme)return null;
    return rule.seePrefix+territoryId+" "+theme;
  }

  function sequentialRoute(text,language,negatedRoute){
    if(negatedRoute)return null;
    const rule=RULES[language]||RULES.it;
    const count=territoryCount(text);
    if(count<3)return null;
    if(hasExplicitIntent(text,language))return null;

    const hasSequence=hasPhrase(text,rule.sequence);
    const mostlyPlaces=text.split(" ").length<=Math.max(10,count*4);
    if(!hasSequence && !mostlyPlaces)return null;
    return rule.routePrefix+text;
  }

  function prepare(rawText){
    const original=String(rawText||"").trim();
    const language=languageFor(original);
    const rule=RULES[language]||RULES.it;
    let text=normalize(original);

    text=stripLeadingFillers(text,rule);
    text=stripTrailingResidue(text,rule);

    const ordinal=resolveOrdinal(text,language);
    if(ordinal){
      return {original,prepared:ordinal,language,reason:"clarification_ordinal"};
    }

    const negated=stripNegatedRoute(text,rule);
    text=negated.text;
    text=applyRewrites(text,rule);

    const followup=contextualThemeFollowup(text,language);
    if(followup){
      return {original,prepared:followup,language,reason:"context_theme_followup"};
    }

    const route=sequentialRoute(text,language,negated.negated);
    if(route)text=route;

    return {
      original,
      prepared:text,
      language,
      reason:route?"implicit_sequence_route":(negated.negated?"negated_route":"naturalized")
    };
  }

  function installButton(){
    const oldButton=document.getElementById("assistantAsk");
    if(!oldButton || oldButton.dataset.aracneUnderstanding120==="1")return !!oldButton;

    // Clone only the Ask button on the isolated test branch. This removes the
    // base click listener so the same stable engine can receive our normalized
    // text without changing the rest of HIRUNDU.
    const button=oldButton.cloneNode(true);
    button.dataset.aracneUnderstanding120="1";
    oldButton.replaceWith(button);

    button.addEventListener("click",async()=>{
      const span=button.querySelector("span");
      const idleLabel=span?.textContent||"Aracne";
      const raw=bridge.getTranscript?.()
        || document.querySelector("#assistantTranscript")?.value
        || "";
      const prepared=prepare(raw);

      button.disabled=true;
      if(span)span.textContent=prepared.language==="fr"?"Aracne tisse…":prepared.language==="en"?"Aracne is weaving…":prepared.language==="es"?"Aracne está tejiendo…":"Aracne sta tessendo…";

      try{
        console.info("[Aracne Understanding]",VERSION,prepared.reason,{original:prepared.original,prepared:prepared.prepared});
        await engine.ask(prepared.prepared);
      }catch(error){
        console.error("[Aracne Understanding] request failed",error);
        try{bridge.showResult?.("Aracne",prepared.language==="fr"?"Je n’ai pas compris cette demande. Essaie de la reformuler simplement.":prepared.language==="en"?"I could not understand that request. Try rephrasing it simply.":prepared.language==="es"?"No he entendido la solicitud. Intenta reformularla de forma sencilla.":"Non ho capito la richiesta. Prova a riformularla in modo semplice.");}catch(displayError){}
      }finally{
        button.disabled=false;
        if(span)span.textContent=idleLabel;
      }
    });

    return true;
  }

  const observer=new MutationObserver(()=>{
    if(installButton()){
      // Keep observing because the modal can be recreated by future builds.
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  installButton();

  window.AracneUnderstanding120={
    version:VERSION,
    prepare,
    install:installButton,
    status:()=>({version:VERSION,installed:document.getElementById("assistantAsk")?.dataset?.aracneUnderstanding120==="1"})
  };

  console.info(`[Aracne Understanding] v${VERSION} active`);
})();
