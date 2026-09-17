(() => {
  "use strict";

  const VERSION="1.2.4";
  const bridge=window.aracneIntelligenceBridge;
  const conversation=window.AracneUnderstanding121;
  if(!bridge || !conversation || typeof bridge.saveAnswer!=="function")return;

  const originalSaveAnswer=bridge.saveAnswer.bind(bridge);
  let reportCursor=0;
  let lastSignature="";

  const TITLES={
    fr:"Rapport de conversation Aracne",
    it:"Rapporto della conversazione con Aracne",
    en:"Aracne conversation report",
    es:"Informe de conversación con Aracne"
  };
  const USER={fr:"Vous",it:"Tu",en:"You",es:"Tú"};

  function currentLanguage(messages=[]){
    const last=[...messages].reverse().find(message=>message?.language);
    return last?.language
      || String(bridge.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function buildReport(messages,language){
    const title=TITLES[language]||TITLES.it;
    const user=USER[language]||USER.it;
    const lines=[title,""];
    for(const message of messages){
      const role=message?.role==="user"?user:"Aracne";
      const text=String(message?.text||"").trim();
      if(!text)continue;
      lines.push(`${role}: ${text}`,"");
    }
    return lines.join("\n").trim();
  }

  function reportMessages(){
    const all=conversation.messages?.()||[];
    return {all,batch:all.slice(reportCursor)};
  }

  function flushReport(reason="conversation_end"){
    const {all,batch}=reportMessages();
    if(batch.length<2)return false;
    if(!batch.some(message=>message?.role==="user") || !batch.some(message=>message?.role==="assistant"))return false;

    const language=currentLanguage(batch);
    const text=buildReport(batch,language);
    if(!text)return false;
    const signature=`${reportCursor}|${text}`;
    if(signature===lastSignature)return false;

    const saved=originalSaveAnswer({
      ok:true,
      intent:"conversation_report",
      intents:["conversation_report"],
      language,
      text,
      actions:[],
      places:[],
      analysis:{conversationReport:true,reason,version:VERSION}
    });

    if(saved!==false){
      reportCursor=all.length;
      lastSignature=signature;
      console.info("[Aracne Report] saved",reason,{messages:batch.length});
      return true;
    }
    return false;
  }

  // Conversation turns are no longer stored one answer at a time. A coherent
  // report is written when the conversation reaches a natural end instead.
  bridge.saveAnswer=result=>{
    if(result?.intent==="conversation_report")return originalSaveAnswer(result);
    const endsWithRoute=(Array.isArray(result?.actions)&&result.actions.includes("route"))
      || (Array.isArray(result?.intents)&&result.intents.includes("route"));
    if(endsWithRoute){
      setTimeout(()=>flushReport("route_completed"),0);
    }
    return true;
  };

  const closeButton=document.querySelector('[data-modal-close="assistantModal"]');
  closeButton?.addEventListener("click",()=>flushReport("assistant_closed"),true);

  const carnetButton=document.getElementById("assistantViewNotes");
  carnetButton?.addEventListener("click",()=>flushReport("carnet_opened"),true);

  const modal=document.getElementById("assistantModal");
  modal?.addEventListener("click",event=>{
    if(event.target===modal)flushReport("assistant_closed");
  },true);

  window.addEventListener("pagehide",()=>flushReport("page_hidden"),{capture:true});

  window.AracneReport124={
    version:VERSION,
    flush:flushReport,
    status:()=>({version:VERSION,reportCursor,messages:(conversation.messages?.()||[]).length})
  };

  console.info(`[Aracne Report] v${VERSION} active — conversation reports to carnet`);
})();
