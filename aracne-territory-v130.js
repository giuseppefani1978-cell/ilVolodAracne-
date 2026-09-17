(() => {
  "use strict";

  const VERSION="1.3.0";
  const engine=window.AracneIntelligence;
  const kb=window.AracneKnowledgeBase;
  const bridge=window.aracneIntelligenceBridge;
  if(!engine || !kb || typeof engine.execute!=="function")return;

  const baseExecute=engine.execute.bind(engine);
  let localFocusTerritoryId=null;

  const CUES={
    fr:{tell:["parle moi","parles moi","parlez moi","raconte moi","racontez moi","peux tu me parler","pouvez vous me parler","parler de"],see:["a voir","que voir","quoi voir","a faire","que faire","quoi faire","visiter","decouvrir"],near:["autour","a cote","aux alentours","pres de","proche de","environs"]},
    it:{tell:["parlami","raccontami","dimmi di","mi parli di","parlare di"],see:["da vedere","cosa vedere","da fare","cosa fare","visitare","scoprire"],near:["intorno","vicino","nei dintorni","a fianco"]},
    en:{tell:["tell me about","talk to me about","talk about","describe"],see:["what to see","what can i see","what to do","what can i do","visit","discover"],near:["around","nearby","near","close to","in the area"]},
    es:{tell:["hablame","cuentame","dime sobre","hablar de"],see:["que ver","que hacer","para ver","para hacer","visitar","descubrir"],near:["alrededor","cerca","en los alrededores","proximo"]}
  };

  const LABELS={
    fr:{about:"À propos de",history:"Un peu d’histoire",see:"À voir et à faire",around:"Autour",poi:"Points d’intérêt reliés"},
    it:{about:"A proposito di",history:"Un po’ di storia",see:"Da vedere e da fare",around:"Nei dintorni",poi:"Punti di interesse collegati"},
    en:{about:"About",history:"A little history",see:"What to see and do",around:"Around",poi:"Linked points of interest"},
    es:{about:"Sobre",history:"Un poco de historia",see:"Qué ver y hacer",around:"Alrededores",poi:"Puntos de interés relacionados"}
  };

  function normalize(value=""){
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g," ").replace(/[-–—]/g," ").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
  }

  function languageFor(text=""){
    return engine.detectLanguage?.(text)
      || String(bridge?.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge?.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function hasAny(text,list=[]){
    const n=normalize(text);
    return list.some(item=>n.includes(normalize(item)));
  }

  function explicitTerritory(text,language){
    try{
      const matches=kb.findTerritories?.(text,language)||[];
      const first=matches[0];
      if(!first)return null;
      const entry=first.entry||kb.getTerritory?.(first.id)||null;
      return entry?{id:first.id,...entry}:null;
    }catch(error){return null;}
  }

  function currentTerritory(text,language){
    const explicit=explicitTerritory(text,language);
    if(explicit)return explicit;
    if(!localFocusTerritoryId)return null;
    const entry=kb.getTerritory?.(localFocusTerritoryId)||null;
    return entry?{id:localFocusTerritoryId,...entry}:null;
  }

  function linkedPoiNames(id){
    const ids=kb.poisForTerritory?.(id)||[];
    const places=bridge?.getPlaces?.()||[];
    return ids.map(poiId=>places.find(place=>place?.id===poiId)).filter(Boolean).map(place=>place.name||place.id).filter(Boolean);
  }

  function localizedTerritoryText(territory,language){
    // Knowledge records have evolved over several versions. Support both
    // text[lang] and direct multilingual fields without forcing a schema rewrite.
    if(territory?.text?.[language])return territory.text[language];
    if(territory?.text?.it)return territory.text.it;
    const out={};
    for(const key of ["summary","about","history","see","around","nature","culture","food"]){
      const value=territory?.[key];
      if(typeof value==="string")out[key]=value;
      else if(value?.[language])out[key]=value[language];
      else if(value?.it)out[key]=value.it;
    }
    return out;
  }

  function makeText(territory,language,mode){
    const labels=LABELS[language]||LABELS.it;
    const localized=localizedTerritoryText(territory,language);
    if(!localized || !Object.keys(localized).length)return null;
    const parts=[];

    const about=localized.about||localized.summary||"";
    if(mode.tell){
      if(about)parts.push(`${labels.about} ${territory.name}\n${about}`);
      if(localized.history)parts.push(`${labels.history}\n${localized.history}`);
    }
    if(mode.see){
      const see=localized.see||localized.highlights||localized.culture||localized.nature||"";
      if(see)parts.push(`${labels.see}\n${Array.isArray(see)?see.join(" · "):see}`);
    }
    if(mode.near){
      const around=localized.around||localized.nearby||localized.nature||"";
      if(around)parts.push(`${labels.around}\n${Array.isArray(around)?around.join(" · "):around}`);
    }

    if(mode.see){
      const poiNames=linkedPoiNames(territory.id);
      if(poiNames.length)parts.push(`${labels.poi}\n• ${poiNames.join("\n• ")}`);
    }

    return parts.join("\n\n").trim();
  }

  async function execute(text){
    const original=String(text||"").trim();
    if(!original)return baseExecute(original);

    const language=languageFor(original);
    const cues=CUES[language]||CUES.it;
    const explicit=explicitTerritory(original,language);
    const territory=explicit||currentTerritory(original,language);
    if(!territory)return baseExecute(original);

    const routeCue=/\b(parcours|itineraire|trajet|route|percorso|itinerario|tragitto|ruta|recorrido|journey|trip|tour)\b/i.test(normalize(original));
    if(routeCue)return baseExecute(original);

    const mode={tell:hasAny(original,cues.tell),see:hasAny(original,cues.see),near:hasAny(original,cues.near)};
    if(!mode.tell&&!mode.see&&!mode.near)return baseExecute(original);

    const textOut=makeText(territory,language,mode);
    if(!textOut)return baseExecute(original);

    localFocusTerritoryId=territory.id;

    // Keep the original engine's conversational context synchronized whenever
    // the user explicitly names a territory. The territory answer itself stays
    // city-level; POIs are only surfaced as linked children.
    if(explicit){try{await baseExecute(original);}catch(error){}}

    return {
      ok:true,
      intent:mode.tell?"tell":mode.see?"see_place":"near_place",
      intents:[...(mode.tell?["tell"]:[]),...(mode.see?["see_place"]:[]),...(mode.near?["near_place"]:[])],
      language,
      text:textOut,
      actions:[],
      places:[],
      territories:[territory],
      analysis:{territoryLevel:true,territoryId:territory.id,version:VERSION}
    };
  }

  engine.execute=execute;
  window.AracneTerritory130={version:VERSION,execute,baseExecute,reset:()=>{localFocusTerritoryId=null;},focus:()=>localFocusTerritoryId};
  console.info(`[Aracne Territory] v${VERSION} active — city first, POI second`);
})();
