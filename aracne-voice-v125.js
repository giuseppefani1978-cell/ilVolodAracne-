(() => {
  "use strict";

  const VERSION="1.2.5";
  const bridge=window.aracneIntelligenceBridge;
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR || !bridge)return;

  let recognition=null;
  let keepListening=false;
  let sessionBase="";
  let stoppedByUser=false;

  const LOCALES={it:"it-IT",fr:"fr-FR",en:"en-GB",es:"es-ES"};
  const STATUS={
    it:{ready:"Microfono spento",listening:"Ti ascolto…"},
    fr:{ready:"Microphone éteint",listening:"Je vous écoute…"},
    en:{ready:"Microphone off",listening:"Listening…"},
    es:{ready:"Micrófono apagado",listening:"Te escucho…"}
  };

  const norm=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
  const words=value=>norm(value).split(" ").filter(Boolean);

  function language(){
    return String(bridge.getVoiceLanguage?.()||bridge.getLanguage?.()||"it").slice(0,2).toLowerCase();
  }

  function setStatus(key){
    const el=document.getElementById("assistantStatus");
    if(!el)return;
    const l=language();
    el.textContent=(STATUS[l]||STATUS.it)[key]||key;
  }

  function overlapWords(a,b){
    const wa=words(a), wb=words(b);
    const max=Math.min(wa.length,wb.length,18);
    for(let size=max;size>=2;size--){
      if(wa.slice(-size).join(" ")===wb.slice(0,size).join(" "))return size;
    }
    return 0;
  }

  function mergeSpeech(a,b){
    a=String(a||"").trim();
    b=String(b||"").trim();
    if(!a)return b;
    if(!b)return a;

    const na=norm(a), nb=norm(b);
    const wb=words(b);

    // Android Chrome can emit the same hypothesis repeatedly, sometimes first
    // as interim and later again as a final result. Never append a long phrase
    // that is already present in the transcript.
    if(nb.length>=12 && (na===nb || na.endsWith(nb) || na.includes(nb)))return a;
    if(na.length>=12 && nb.startsWith(na))return b;

    const overlap=overlapWords(a,b);
    if(overlap>=2){
      const rawWords=String(b).trim().split(/\s+/);
      return (a+" "+rawWords.slice(overlap).join(" ")).replace(/\s+/g," ").trim();
    }

    // Successive Android hypotheses often grow from the same first words.
    // Prefer the longer hypothesis instead of concatenating it.
    const wa=words(a);
    if(wa.length>=3 && wb.length>=3){
      const prefix=Math.min(4,wa.length,wb.length);
      if(prefix>=3 && wa.slice(-prefix).join(" ")===wb.slice(0,prefix).join(" ")){
        return mergeSpeech(a,b);
      }
    }

    return (a+" "+b).replace(/\s+/g," ").trim();
  }

  function collapseSegments(segments){
    let out="";
    for(const segment of segments.map(v=>String(v||"").trim()).filter(Boolean)){
      const nOut=norm(out), nSeg=norm(segment);
      if(!out){out=segment;continue;}
      if(nSeg.length>=12 && nOut.includes(nSeg))continue;
      if(nOut.length>=12 && nSeg.startsWith(nOut)){out=segment;continue;}
      out=mergeSpeech(out,segment);
    }
    return out.trim();
  }

  function currentField(){return document.getElementById("assistantTranscript");}

  function setButtons(listening){
    const start=document.getElementById("assistantMicStart");
    const stop=document.getElementById("assistantMicStop");
    if(start)start.disabled=!!listening;
    if(stop)stop.disabled=!listening;
  }

  function stop(){
    stoppedByUser=true;
    keepListening=false;
    const active=recognition;
    recognition=null;
    if(active){
      try{active.onend=null;active.stop();}catch(error){try{active.abort();}catch(inner){}}
    }
    setButtons(false);
    setStatus("ready");
  }

  function start(isRestart=false){
    if(recognition)return;
    stoppedByUser=false;
    keepListening=true;
    sessionBase=String(currentField()?.value||"").trim();

    const r=new SR();
    recognition=r;
    r.lang=LOCALES[language()]||LOCALES.it;
    r.continuous=true;
    r.interimResults=true;
    r.maxAlternatives=1;

    r.onstart=()=>{
      setButtons(true);
      setStatus("listening");
    };

    r.onresult=event=>{
      const finals=[];
      const interim=[];

      // Rebuild the current recognition session from event.results instead of
      // blindly appending every final result. This is the key Android fix:
      // Chrome frequently republishes earlier hypotheses as new final events.
      for(let i=0;i<event.results.length;i++){
        const transcript=String(event.results[i]?.[0]?.transcript||"").trim();
        if(!transcript)continue;
        (event.results[i].isFinal?finals:interim).push(transcript);
      }

      const sessionFinal=collapseSegments(finals);
      const sessionInterim=collapseSegments(interim);
      const sessionText=collapseSegments([sessionFinal,sessionInterim]);
      const merged=collapseSegments([sessionBase,sessionText]);
      const field=currentField();
      if(field)field.value=merged;
    };

    r.onerror=event=>{
      console.warn("[Aracne Voice Android] recognition",event?.error||event);
      if(["not-allowed","service-not-allowed","audio-capture"].includes(event?.error)){
        keepListening=false;
      }
    };

    r.onend=()=>{
      if(recognition===r)recognition=null;
      setButtons(false);
      if(keepListening && !stoppedByUser){
        // Preserve exactly what is currently displayed, then start a fresh
        // recognition session. If Android replays the last phrase, mergeSpeech
        // removes the overlap instead of duplicating it.
        sessionBase=String(currentField()?.value||"").trim();
        setTimeout(()=>{if(keepListening&&!recognition)start(true);},220);
      }else{
        setStatus("ready");
      }
    };

    try{r.start();}
    catch(error){
      recognition=null;
      keepListening=false;
      setButtons(false);
      setStatus("ready");
      console.warn("[Aracne Voice Android] start",error);
    }
  }

  function replaceButton(id,handler){
    const old=document.getElementById(id);
    if(!old)return null;
    const button=old.cloneNode(true);
    old.replaceWith(button);
    button.addEventListener("click",handler);
    return button;
  }

  const startButton=replaceButton("assistantMicStart",()=>start(false));
  const stopButton=replaceButton("assistantMicStop",stop);
  if(stopButton)stopButton.disabled=true;

  const originalStop=bridge.stopRecognition;
  bridge.stopRecognition=()=>{
    stop();
    try{return originalStop?.();}catch(error){return false;}
  };

  document.querySelector('[data-modal-close="assistantModal"]')?.addEventListener("click",stop,true);
  document.getElementById("assistantAsk")?.addEventListener("click",()=>{if(recognition)stop();},true);

  window.AracneVoice125={
    version:VERSION,
    start,
    stop,
    mergeSpeech,
    collapseSegments,
    status:()=>({version:VERSION,listening:!!recognition,keepListening})
  };

  console.info(`[Aracne Voice] v${VERSION} active — Android duplicate dictation guard`);
})();
