(() => {
  "use strict";

  const VERSION="1.3.0";
  const engine=window.AracneIntelligence;
  const kb=window.AracneKnowledgeBase;
  const bridge=window.aracneIntelligenceBridge;
  if(!engine || !kb || typeof engine.execute!=="function")return;

  const baseExecute=engine.execute.bind(engine);

  const LEX={
    fr:{
      fillers:["euh","heu","ben","bah","alors","en fait","du coup","voila","bon"],
      tell:["parle moi de","parles moi de","parlez moi de","raconte moi","racontez moi","peux tu me parler de","pouvez vous me parler de","dis moi quelque chose sur"],
      see:["qu est ce qu il y a a voir","qu est ce qu on peut voir","qu est ce que je peux voir","que voir","quoi voir","qu est ce qu il y a a faire","que faire","quoi faire","visiter","decouvrir"],
      near:["qu est ce qu il y a autour","qu y a t il autour","autour de","a cote de","aux alentours de","pres de","proche de","dans les environs"],
      route:["fais moi un parcours","fait moi un parcours","construis moi un parcours","cree moi un parcours","creer un parcours","propose moi un parcours","itineraire","trajet","circuit","parcours"],
      sequence:["puis","ensuite","apres","et apres","finalement","enfin"],
      routeNeg:["ne me fais pas de parcours","ne fais pas de parcours","je ne veux pas de parcours","pas de parcours","sans parcours"],
      theme:{sea:["plage","plages","mer","bord de mer","cote"],nature:["nature","parc","foret","plein air","campagne"],culture:["culture","histoire","patrimoine","musee","eglise","chateau","art"],food:["gastronomie","cuisine","saveurs","restaurant","manger"]}
    },
    it:{
      fillers:["eh","ehm","allora","dunque","cioe","in pratica","ecco","insomma"],
      tell:["parlami di","raccontami","dimmi qualcosa su","mi parli di","puoi parlarmi di"],
      see:["cosa c e da vedere","che cosa c e da vedere","cosa si puo vedere","cosa posso vedere","cosa vedere","che cosa vedere","cosa c e da fare","cosa si puo fare","cosa posso fare","cosa fare","visitare","scoprire"],
      near:["cosa c e intorno","che cosa c e intorno","cosa c e vicino","intorno a","vicino a","nei dintorni","a fianco"],
      route:["fammi un percorso","fai un percorso","costruiscimi un percorso","creami un percorso","crea un percorso","proponimi un percorso","itinerario","tragitto","percorso"],
      sequence:["poi","e poi","dopo","successivamente","infine","alla fine"],
      routeNeg:["non farmi un percorso","non fare un percorso","non voglio un percorso","niente percorso","senza percorso"],
      theme:{sea:["spiaggia","spiagge","mare","costa"],nature:["natura","parco","bosco","campagna"],culture:["cultura","storia","patrimonio","museo","chiesa","castello","arte"],food:["gastronomia","cucina","sapori","ristorante","mangiare"]}
    },
    en:{
      fillers:["um","uh","well","so","you know","basically","actually"],
      tell:["tell me about","talk to me about","talk about","describe","can you tell me about"],
      see:["what is there to see","what can i see","what to see","what is there to do","what can i do","what to do","visit","discover"],
      near:["what is around","what is nearby","around","nearby","near","close to","in the area"],
      route:["make me a route","build me a route","create a route","plan a route","make an itinerary","itinerary","journey","trip","route"],
      sequence:["then","and then","after","after that","next","finally"],
      routeNeg:["do not make a route","don t make a route","i do not want a route","i don t want a route","no route","without a route"],
      theme:{sea:["beach","beaches","sea","coast","seaside"],nature:["nature","park","forest","outdoors","countryside"],culture:["culture","history","heritage","museum","church","castle","art"],food:["food","gastronomy","cuisine","restaurant","eat"]}
    },
    es:{
      fillers:["eh","em","bueno","pues","entonces","o sea","en realidad"],
      tell:["hablame de","cuentame","dime algo sobre","puedes hablarme de"],
      see:["que hay que ver","que se puede ver","que puedo ver","que ver","que hay que hacer","que se puede hacer","que puedo hacer","que hacer","visitar","descubrir"],
      near:["que hay alrededor","que hay cerca","alrededor de","cerca de","en los alrededores","proximo a"],
      route:["hazme una ruta","crea una ruta","construye una ruta","proponme una ruta","itinerario","recorrido","trayecto","ruta"],
      sequence:["luego","y luego","despues","a continuacion","finalmente","por ultimo"],
      routeNeg:["no hagas una ruta","no quiero una ruta","sin ruta","ninguna ruta"],
      theme:{sea:["playa","playas","mar","costa"],nature:["naturaleza","parque","bosque","campo"],culture:["cultura","historia","patrimonio","museo","iglesia","castillo","arte"],food:["gastronomia","cocina","sabores","restaurante","comer"]}
    }
  };

  const QUERY={
    fr:{tell:n=>`Parle-moi de ${n}.`,see:n=>`Qu'est-ce qu'il y a à voir et à faire à ${n} ?`,near:n=>`Qu'est-ce qu'il y a autour de ${n} ?`,route:(names,theme)=>`Crée un parcours à partir de ${names[0]}${names.slice(1).map(n=>` puis ${n}`).join("")}${themePhrase("fr",theme)}.`},
    it:{tell:n=>`Parlami di ${n}.`,see:n=>`Cosa c'è da vedere e da fare a ${n}?`,near:n=>`Cosa c'è intorno a ${n}?`,route:(names,theme)=>`Crea un percorso a partire da ${names[0]}${names.slice(1).map(n=>` poi ${n}`).join("")}${themePhrase("it",theme)}.`},
    en:{tell:n=>`Tell me about ${n}.`,see:n=>`What is there to see and do in ${n}?`,near:n=>`What is around ${n}?`,route:(names,theme)=>`Create a route starting from ${names[0]}${names.slice(1).map(n=>` then ${n}`).join("")}${themePhrase("en",theme)}.`},
    es:{tell:n=>`Háblame de ${n}.`,see:n=>`¿Qué hay que ver y hacer en ${n}?`,near:n=>`¿Qué hay alrededor de ${n}?`,route:(names,theme)=>`Crea una ruta a partir de ${names[0]}${names.slice(1).map(n=>` luego ${n}`).join("")}${themePhrase("es",theme)}.`}
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

  function themePhrase(language,theme){
    if(!theme)return "";
    const map={
      fr:{sea:", en privilégiant les plages et le littoral",nature:", en privilégiant la nature",culture:", en privilégiant la culture et le patrimoine",food:", en privilégiant la gastronomie locale"},
      it:{sea:", privilegiando spiagge e costa",nature:", privilegiando la natura",culture:", privilegiando cultura e patrimonio",food:", privilegiando la gastronomia locale"},
      en:{sea:", prioritising beaches and the coast",nature:", prioritising nature",culture:", prioritising culture and heritage",food:", prioritising local food"},
      es:{sea:", priorizando las playas y la costa",nature:", priorizando la naturaleza",culture:", priorizando la cultura y el patrimonio",food:", priorizando la gastronomía local"}
    };
    return map[language]?.[theme]||"";
  }

  function cleanHesitations(text,language){
    let n=` ${normalize(text)} `;
    const fillers=(LEX[language]||LEX.it).fillers||[];
    for(const filler of fillers){
      const f=normalize(filler).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
      n=n.replace(new RegExp(`\\s${f}\\s`,"g")," ");
    }
    return n.replace(/\s+/g," ").trim();
  }

  function phrasePosition(n,phrases=[]){
    let best=-1;
    for(const phrase of phrases){
      const p=n.indexOf(normalize(phrase));
      if(p>=0 && (best<0||p<best))best=p;
    }
    return best;
  }

  function routeNegated(n,language){
    return (LEX[language]||LEX.it).routeNeg.some(p=>n.includes(normalize(p)));
  }

  function detectTheme(n,language){
    const themes=(LEX[language]||LEX.it).theme||{};
    for(const [theme,words] of Object.entries(themes))if(words.some(word=>n.includes(normalize(word))))return theme;
    return null;
  }

  function orderedTerritories(text,language){
    const n=normalize(text);
    let matches=[];
    try{matches=kb.findTerritories?.(text,language)||[];}catch(error){matches=[];}
    const out=[];
    const seen=new Set();
    for(const match of matches){
      const id=match?.id;
      if(!id||seen.has(id))continue;
      const entry=match.entry||kb.getTerritory?.(id)||{};
      const candidates=[match.matchedAlias,entry.name,id,...Object.values(entry.aliases||{}).flat()].filter(Boolean).map(normalize);
      let pos=Number.POSITIVE_INFINITY;
      for(const candidate of candidates){const p=n.indexOf(candidate);if(p>=0)pos=Math.min(pos,p);}
      out.push({id,name:entry.name||id,entry,pos});
      seen.add(id);
    }
    return out.sort((a,b)=>a.pos-b.pos);
  }

  function detectIntents(text,language,territories){
    const n=cleanHesitations(text,language);
    const lex=LEX[language]||LEX.it;
    const intents=[];
    for(const name of ["tell","see","near","route"]){
      let pos=phrasePosition(n,lex[name]);
      if(name==="route" && routeNegated(n,language))pos=-1;
      if(pos>=0)intents.push({name,pos});
    }

    // A sequence of named territories joined by temporal connectors is a route
    // even if the user never says "route" explicitly.
    if(!intents.some(i=>i.name==="route") && territories.length>=2){
      const seqPos=phrasePosition(n,lex.sequence);
      if(seqPos>=0)intents.push({name:"route",pos:Math.max(0,territories[0].pos)});
    }

    return intents.sort((a,b)=>a.pos-b.pos);
  }

  function dedupeSections(parts){
    const seen=new Set();
    const out=[];
    for(const part of parts){
      const text=String(part?.text||"").trim();
      if(!text)continue;
      const key=normalize(text);
      if(seen.has(key))continue;
      seen.add(key);
      out.push(text);
    }
    return out;
  }

  async function execute(rawText){
    const original=String(rawText||"").trim();
    if(!original)return baseExecute(original);

    // Clarification replies belong to the base engine's active reasoning state.
    if(engine.context?.()?.pendingClarification)return baseExecute(original);

    const language=languageFor(original);
    const territories=orderedTerritories(original,language);
    const intents=detectIntents(original,language,territories);
    if(intents.length<=1)return baseExecute(original);

    const routeCue=intents.find(i=>i.name==="route")||null;
    const beforeRoute=routeCue?territories.filter(t=>t.pos<routeCue.pos):territories;
    const focus=beforeRoute[0]||territories[0]||null;
    let routeTerritories=routeCue?territories.filter(t=>t.pos>=routeCue.pos):[];

    if(routeCue && focus && !routeTerritories.some(t=>t.id===focus.id))routeTerritories=[focus,...routeTerritories];
    if(routeCue && routeTerritories.length<2 && territories.length>=2)routeTerritories=territories.slice();

    const theme=detectTheme(cleanHesitations(original,language),language);
    const query=QUERY[language]||QUERY.it;
    const results=[];
    const sections=[];
    let anchor=null;

    for(const intent of intents){
      let q=null;
      if(intent.name==="tell"&&focus)q=query.tell(focus.name);
      if(intent.name==="see"&&focus)q=query.see(focus.name);
      if(intent.name==="near"&&focus)q=query.near(focus.name);
      if(intent.name==="route"&&routeTerritories.length>=2)q=query.route(routeTerritories.map(t=>t.name),theme);
      if(!q)continue;

      const result=await baseExecute(q);
      results.push(result);
      anchor=result||anchor;
      if(result?.text)sections.push({intent:intent.name,text:result.text});
      if(result?.clarification || String(result?.intent||"").startsWith("clarify"))break;
    }

    if(!results.length)return baseExecute(original);

    const text=dedupeSections(sections).join("\n\n").trim();
    const actions=[...new Set(results.flatMap(result=>Array.isArray(result?.actions)?result.actions:[]))];
    const mappedIntents=intents.map(i=>i.name==="see"?"see_place":i.name==="near"?"near_place":i.name);

    return {
      ...(anchor||{}),
      ok:anchor?.ok!==false,
      text:text||anchor?.text||"",
      language:anchor?.language||language,
      intents:mappedIntents,
      actions,
      analysis:{
        ...(anchor?.analysis||{}),
        layeredUnderstanding:{
          version:VERSION,
          original,
          normalized:cleanHesitations(original,language),
          orderedIntents:mappedIntents,
          focusTerritoryId:focus?.id||null,
          routeTerritoryIds:routeTerritories.map(t=>t.id),
          theme
        }
      }
    };
  }

  engine.execute=execute;
  window.AracneIntent130={version:VERSION,execute,baseExecute,detectIntents,orderedTerritories,cleanHesitations};
  console.info(`[Aracne Intent] v${VERSION} active — multilingual layered intent parsing`);
})();
