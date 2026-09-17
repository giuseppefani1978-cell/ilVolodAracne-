(() => {
  "use strict";

  const VERSION="1.2.4";
  const engine=window.AracneIntelligence;
  const bridge=window.aracneIntelligenceBridge;
  if(!engine || !bridge || typeof engine.execute!=="function")return;

  const baseExecute=engine.execute.bind(engine);

  const CUES={
    fr:{
      tell:["parle moi","parles moi","raconte moi","parlez moi","racontez moi","peux tu me parler","pouvez vous me parler","tu me parles","tu me parle","me parler de","parler de"],
      near:["a cote","autour","aux alentours","pres de","proche de","dans les environs"],
      see:["a voir","a faire","que voir","quoi voir","que faire","quoi faire","visiter","decouvrir"],
      route:["parcours","itineraire","trajet","circuit","route"],
      theme:{sea:["plage","plages","mer","bord de mer","cote"],nature:["nature","parc","foret","plein air"],culture:["culture","histoire","art","musee","eglise","chateau"],food:["gastronomie","cuisine","saveurs","restaurant"]}
    },
    it:{
      tell:["parlami","raccontami","dimmi di","mi parli","mi parli di","parlare di"],
      near:["vicino","intorno","nei dintorni","a fianco"],
      see:["da vedere","da fare","cosa vedere","cosa fare","visitare","scoprire"],
      route:["percorso","itinerario","tragitto","tour"],
      theme:{sea:["spiaggia","spiagge","mare","costa"],nature:["natura","parco","bosco"],culture:["cultura","storia","arte","museo","chiesa","castello"],food:["gastronomia","cucina","sapori","ristorante"]}
    },
    en:{
      tell:["tell me about","tell me","talk to me about","talk about","describe"],
      near:["near","nearby","around","close to","in the area"],
      see:["what to see","what can i see","what to do","what can i do","visit","discover"],
      route:["route","itinerary","trip","tour"],
      theme:{sea:["beach","beaches","sea","coast","seaside"],nature:["nature","park","forest","outdoors"],culture:["culture","history","art","museum","church","castle"],food:["food","gastronomy","cuisine","restaurant"]}
    },
    es:{
      tell:["hablame","cuentame","dime sobre","me hables","me hables de","hablar de"],
      near:["cerca","alrededor","en los alrededores","proximo"],
      see:["que ver","que hacer","para ver","para hacer","visitar","descubrir"],
      route:["ruta","itinerario","recorrido","trayecto","tour"],
      theme:{sea:["playa","playas","mar","costa"],nature:["naturaleza","parque","bosque"],culture:["cultura","historia","arte","museo","iglesia","castillo"],food:["gastronomia","cocina","sabores","restaurante"]}
    }
  };

  const QUERY={
    fr:{
      tell:name=>`Parle-moi de ${name}.`,
      near:name=>`Qu'est-ce qu'il y a autour de ${name} ?`,
      see:name=>`Qu'est-ce qu'il y a à voir et à faire à ${name} ?`,
      route:(names,theme)=>`Crée un parcours à partir de ${names[0]}${names.slice(1).map(n=>` puis ${n}`).join("")}${theme==="sea"?", en privilégiant les plages et le bord de mer":theme==="nature"?", en privilégiant la nature":theme==="culture"?", en privilégiant la culture et le patrimoine":theme==="food"?", en privilégiant la gastronomie locale":""}.`
    },
    it:{
      tell:name=>`Parlami di ${name}.`,
      near:name=>`Cosa c'è intorno a ${name}?`,
      see:name=>`Cosa c'è da vedere e da fare a ${name}?`,
      route:(names,theme)=>`Crea un percorso a partire da ${names[0]}${names.slice(1).map(n=>` poi ${n}`).join("")}${theme==="sea"?", privilegiando spiagge e mare":theme==="nature"?", privilegiando la natura":theme==="culture"?", privilegiando cultura e patrimonio":theme==="food"?", privilegiando la gastronomia locale":""}.`
    },
    en:{
      tell:name=>`Tell me about ${name}.`,
      near:name=>`What is around ${name}?`,
      see:name=>`What is there to see and do in ${name}?`,
      route:(names,theme)=>`Create a route starting from ${names[0]}${names.slice(1).map(n=>` then ${n}`).join("")}${theme==="sea"?", prioritising beaches and the coast":theme==="nature"?", prioritising nature":theme==="culture"?", prioritising culture and heritage":theme==="food"?", prioritising local food":""}.`
    },
    es:{
      tell:name=>`Háblame de ${name}.`,
      near:name=>`¿Qué hay alrededor de ${name}?`,
      see:name=>`¿Qué hay que ver y hacer en ${name}?`,
      route:(names,theme)=>`Crea una ruta a partir de ${names[0]}${names.slice(1).map(n=>` luego ${n}`).join("")}${theme==="sea"?", priorizando las playas y la costa":theme==="nature"?", priorizando la naturaleza":theme==="culture"?", priorizando la cultura y el patrimonio":theme==="food"?", priorizando la gastronomía local":""}.`
    }
  };

  function normalize(value=""){
    return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[’']/g," ").replace(/[-–—]/g," ").replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
  }

  function languageFor(text=""){
    return engine.detectLanguage?.(text)
      || String(bridge.getVoiceLanguage?.()||"").slice(0,2).toLowerCase()
      || String(bridge.getLanguage?.()||"").slice(0,2).toLowerCase()
      || "it";
  }

  function phrasePosition(n,phrases=[]){
    let best=-1;
    for(const raw of phrases){
      const p=n.indexOf(normalize(raw));
      if(p>=0 && (best<0 || p<best))best=p;
    }
    return best;
  }

  function detectIntentSequence(text,language){
    const n=normalize(text);
    const rule=CUES[language]||CUES.it;
    return ["tell","near","see","route"]
      .map(name=>({name,pos:phrasePosition(n,rule[name])}))
      .filter(item=>item.pos>=0)
      .sort((a,b)=>a.pos-b.pos);
  }

  function territoryInfo(match){
    if(!match)return null;
    const entry=match.entry||{};
    return {id:match.id||entry.id||null,name:entry.name||match.name||match.id||"",matchedAlias:match.matchedAlias||null};
  }

  function orderedTerritories(text){
    const n=normalize(text);
    const seen=new Set();
    const out=[];
    let raw=[];
    try{raw=engine.territoriesFor?.(text)||[];}catch(error){raw=[];}
    for(const match of raw){
      const item=territoryInfo(match);
      if(!item?.id || seen.has(item.id))continue;
      let pos=Number.POSITIVE_INFINITY;
      for(const candidate of [item.matchedAlias,item.name,item.id].filter(Boolean)){
        const p=n.indexOf(normalize(candidate));
        if(p>=0)pos=Math.min(pos,p);
      }
      out.push({...item,pos});
      seen.add(item.id);
    }
    return out.sort((a,b)=>a.pos-b.pos);
  }

  function themeFor(text,language){
    const n=normalize(text);
    const themes=(CUES[language]||CUES.it).theme||{};
    for(const [theme,words] of Object.entries(themes)){
      if(words.some(word=>n.includes(normalize(word))))return theme;
    }
    return null;
  }

  function cleanInfoText(text){
    return String(text||"")
      .split("\n")
      .filter(line=>!(/POI\s+HIRUNDU/i.test(line) && /(filtre|filtro|filter|correspon|corrispond|match)/i.test(line)))
      .join("\n")
      .replace(/\n{3,}/g,"\n\n")
      .trim();
  }

  function routeStepLabel(language){
    return ({fr:"Étapes",it:"Tappe",en:"Stops",es:"Etapas"})[language]||"Étapes";
  }

  function cleanRouteText(text,names,language){
    let value=cleanInfoText(text);
    if(!names?.length)return value;
    const replacement=`${routeStepLabel(language)}: ${names.join(" → ")}`;
    const pattern=/^(Étapes|Tappe|Stops|Etapas)\s*:[^\n]*/gmi;
    if(pattern.test(value)){
      pattern.lastIndex=0;
      value=value.replace(pattern,replacement);
    }
    return value;
  }

  function uniqueTexts(parts){
    const seen=new Set();
    const out=[];
    for(const part of parts){
      const text=String(part?.text||"").trim();
      if(!text)continue;
      const key=normalize(text);
      if(seen.has(key))continue;
      seen.add(key);
      out.push({...part,text});
    }
    return out;
  }

  async function compositeExecute(rawText){
    const original=String(rawText||"").trim();
    if(!original)return baseExecute(original);

    const pending=engine.context?.()?.pendingClarification;
    if(pending)return baseExecute(original);

    const language=languageFor(original);
    const intents=detectIntentSequence(original,language);
    if(intents.length<2)return baseExecute(original);

    const territories=orderedTerritories(original);
    if(!territories.length)return baseExecute(original);

    const routeCue=intents.find(item=>item.name==="route");
    const infoTerritories=routeCue
      ? territories.filter(item=>item.pos<routeCue.pos)
      : territories;
    const focus=infoTerritories[0]||territories[0];

    let routeTerritories=routeCue
      ? territories.filter(item=>item.pos>=routeCue.pos)
      : [];
    if(routeCue && focus && !routeTerritories.some(item=>item.id===focus.id)){
      routeTerritories=[focus,...routeTerritories];
    }
    if(routeCue && routeTerritories.length<2 && territories.length>1){
      routeTerritories=territories.slice();
    }

    const query=QUERY[language]||QUERY.it;
    const theme=themeFor(original,language);
    const parts=[];
    const results=[];
    let routeResult=null;
    let clarificationResult=null;

    for(const intent of intents){
      let q=null;
      if(intent.name==="tell" && focus)q=query.tell(focus.name);
      if(intent.name==="near" && focus)q=query.near(focus.name);
      if(intent.name==="see" && focus)q=query.see(focus.name);
      if(intent.name==="route" && routeTerritories.length>=2)q=query.route(routeTerritories.map(item=>item.name),theme);
      if(!q)continue;

      const result=await baseExecute(q);
      results.push(result);
      const isClarification=!!result?.clarification || String(result?.intent||"").startsWith("clarify");
      if(intent.name==="route")routeResult=result;

      const sectionText=intent.name==="route"
        ? cleanRouteText(result?.text,routeTerritories.map(item=>item.name),language)
        : cleanInfoText(result?.text);
      if(sectionText)parts.push({intent:intent.name,text:sectionText});

      if(isClarification){
        clarificationResult=result;
        break;
      }
    }

    if(!results.length)return baseExecute(original);

    const cleanParts=uniqueTexts(parts);
    const text=cleanParts.map(part=>part.text).join("\n\n").trim();
    const anchor=clarificationResult || routeResult || results[results.length-1] || {};
    const actions=[...new Set(results.flatMap(result=>Array.isArray(result?.actions)?result.actions:[]))];
    const intentNames=intents.map(item=>item.name==="near"?"near_place":item.name==="see"?"see_place":item.name);

    return {
      ...anchor,
      ok:anchor?.ok!==false,
      text:text || anchor?.text || "",
      language:anchor?.language||language,
      intents:intentNames,
      actions,
      analysis:{
        ...(anchor?.analysis||{}),
        orchestration:{
          version:VERSION,
          original,
          orderedIntents:intentNames,
          focusTerritoryId:focus?.id||null,
          routeTerritoryIds:routeTerritories.map(item=>item.id)
        }
      }
    };
  }

  engine.execute=compositeExecute;
  window.AracneSemantic124={version:VERSION,execute:compositeExecute,baseExecute,detectIntentSequence,orderedTerritories};
  console.info(`[Aracne Semantic] v${VERSION} active — ordered multi-intent orchestration`);
})();
