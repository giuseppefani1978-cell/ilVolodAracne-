(() => {
  "use strict";

  const VERSION="1.3.0";
  const engine=window.AracneIntelligence;
  const bridge=window.aracneIntelligenceBridge;
  const conversation=window.AracneUnderstanding121;
  if(!engine || !bridge || !conversation)return;

  const originalSaveAnswer=typeof bridge.saveAnswer==="function"?bridge.saveAnswer.bind(bridge):null;
  const originalCreateRoute=typeof bridge.createRouteFromText==="function"?bridge.createRouteFromText.bind(bridge):null;
  let replaceRouteOnNextRoute=false;
  let sessionNumber=Number(localStorage.getItem("aracne_conversation_counter")||0)+1;

  const TEXT={
    fr:{new:"Nouvelle conversation",confirm:"La conversation actuelle sera archivée dans le carnet puis effacée de cet écran.",title:"Conversation avec Aracne",you:"Vous"},
    it:{new:"Nuova conversazione",confirm:"La conversazione attuale sarà archiviata nel diario e poi cancellata da questa schermata.",title:"Conversazione con Aracne",you:"Tu"},
    en:{new:"New conversation",confirm:"The current conversation will be archived in the travel journal and then cleared from this screen.",title:"Conversation with Aracne",you:"You"},
    es:{new:"Nueva conversación",confirm:"La conversación actual se archivará en el diario de viaje y luego se borrará de esta pantalla.",title:"Conversación con Aracne",you:"Tú"}
  };

  function language(){
    const messages=conversation.messages?.()||[];
    const last=[...messages].reverse().find(message=>message?.language);
    return last?.language
      || String(bridge.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function tr(key){return (TEXT[language()]||TEXT.it)[key]||key;}

  function reportText(messages){
    const lang=language();
    const strings=TEXT[lang]||TEXT.it;
    const locale=lang==="en"?"en-GB":lang==="fr"?"fr-FR":lang==="es"?"es-ES":"it-IT";
    const stamp=new Intl.DateTimeFormat(locale,{dateStyle:"medium",timeStyle:"short"}).format(new Date());
    const lines=[`${strings.title} #${sessionNumber} — ${stamp}`,""];
    for(const message of messages){
      const text=String(message?.text||"").trim();
      if(!text)continue;
      lines.push(`${message.role==="user"?strings.you:"Aracne"}: ${text}`,"");
    }
    return lines.join("\n").trim();
  }

  function archiveCurrentConversation(){
    const messages=conversation.messages?.()||[];
    if(!messages.some(m=>m?.role==="user") || !messages.some(m=>m?.role==="assistant"))return false;
    if(!originalSaveAnswer)return false;

    const text=reportText(messages);
    const archiveKey=`aracne_session_archived_${sessionNumber}`;
    if(localStorage.getItem(archiveKey)==="1")return true;

    const saved=originalSaveAnswer({
      ok:true,
      intent:"conversation_report",
      intents:["conversation_report"],
      language:language(),
      text,
      actions:[],
      places:[],
      analysis:{conversationReport:true,sessionNumber,version:VERSION}
    });

    if(saved!==false){
      localStorage.setItem(archiveKey,"1");
      return true;
    }
    return false;
  }

  function clearActiveConversation(){
    try{engine.stopSpeaking?.();}catch(error){}
    try{bridge.stopRecognition?.();}catch(error){}
    try{engine.resetContext?.();}catch(error){}
    try{window.AracneTerritory130?.reset?.();}catch(error){}
    try{conversation.clearThread?.();}catch(error){}
    const transcript=document.getElementById("assistantTranscript");
    if(transcript)transcript.value="";
    const result=document.getElementById("assistantResult");
    if(result){result.textContent="";result.classList.add("aracne121-hidden-result");}
  }

  function startNewConversation(){
    const messages=conversation.messages?.()||[];
    if(messages.length && !window.confirm(tr("confirm")))return false;
    archiveCurrentConversation();
    clearActiveConversation();
    replaceRouteOnNextRoute=true;
    sessionNumber+=1;
    localStorage.setItem("aracne_conversation_counter",String(sessionNumber-1));
    localStorage.removeItem(`aracne_session_archived_${sessionNumber}`);
    return true;
  }

  function addButton(){
    if(document.getElementById("aracneNewConversation130"))return;
    const notes=document.getElementById("assistantViewNotes");
    if(!notes?.parentNode)return;
    const button=document.createElement("button");
    button.id="aracneNewConversation130";
    button.type="button";
    button.className=notes.className||"assistant-view-notes";
    button.innerHTML='<i class="fa-solid fa-rotate"></i> <span></span>';
    button.querySelector("span").textContent=tr("new");
    button.addEventListener("click",startNewConversation);
    notes.parentNode.insertBefore(button,notes);
  }

  if(originalCreateRoute){
    bridge.createRouteFromText=async (...args)=>{
      if(replaceRouteOnNextRoute){
        // A new conversation owns a new active route. Existing saved routes are
        // untouched, but the map's current working route is cleared immediately
        // before the first route request of the new conversation.
        try{document.getElementById("clearRoute")?.click();}catch(error){}
        replaceRouteOnNextRoute=false;
      }
      return await originalCreateRoute(...args);
    };
  }

  // While a session is active, do not create one note per answer. The complete
  // discussion is archived as one travel-journal item when the session ends.
  if(originalSaveAnswer){
    bridge.saveAnswer=result=>{
      if(result?.intent==="conversation_report")return originalSaveAnswer(result);
      return true;
    };
  }

  document.querySelector('[data-modal-close="assistantModal"]')?.addEventListener("click",archiveCurrentConversation,true);
  document.getElementById("assistantViewNotes")?.addEventListener("click",archiveCurrentConversation,true);
  window.addEventListener("pagehide",archiveCurrentConversation,{capture:true});

  addButton();

  window.AracneSession130={
    version:VERSION,
    archive:archiveCurrentConversation,
    newConversation:startNewConversation,
    session:()=>sessionNumber,
    status:()=>({version:VERSION,sessionNumber,replaceRouteOnNextRoute,messages:(conversation.messages?.()||[]).length})
  };

  console.info(`[Aracne Session] v${VERSION} active — persistent thread, journal archive, replaceable route`);
})();
