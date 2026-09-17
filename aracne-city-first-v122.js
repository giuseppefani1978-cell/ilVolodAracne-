(() => {
  "use strict";

  const VERSION="1.2.2";
  const engine=window.AracneIntelligence;
  const bridge=window.aracneIntelligenceBridge;

  if(!engine || !bridge){
    console.warn("[Aracne City First] base engine not ready");
    return;
  }

  const originalFindPlaces=typeof bridge.findPlaces==="function" ? bridge.findPlaces.bind(bridge) : null;
  const originalFindExactPlaces=typeof bridge.findExactPlaces==="function" ? bridge.findExactPlaces.bind(bridge) : null;

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

  function containsExact(haystack,needle){
    const h=" "+normalize(haystack)+" ";
    const n=normalize(needle);
    return !!n && h.includes(" "+n+" ");
  }

  function territoryMatches(text){
    try{return engine.territoriesFor?.(text)||[];}catch(error){return [];}
  }

  function territoryIds(text){
    return new Set(territoryMatches(text).map(item=>item?.id).filter(Boolean));
  }

  function isBareCityRepresentative(place,territories){
    const placeId=normalize(place?.id||"");
    const placeName=normalize(place?.name||"");
    for(const raw of territoryMatches(place?.name||place?.id||"")){
      const id=raw?.id;
      if(!id || !territories.has(id))continue;
      const entry=raw?.entry||{};
      const territoryName=normalize(entry?.name||id);
      if(placeId===normalize(id) || (placeName && territoryName && placeName===territoryName))return true;
    }
    return false;
  }

  function isExplicitPoiMention(text,place,territories){
    if(!place)return false;
    if(isBareCityRepresentative(place,territories))return false;

    const name=String(place?.name||"").trim();
    const id=String(place?.id||"").replace(/_/g," ").trim();

    // POIs are accepted only when the user explicitly says/writes their own
    // specific name. A city name alone must never be converted into a POI.
    if(name.length>=4 && containsExact(text,name))return true;
    if(id.length>=5 && containsExact(text,id))return true;
    return false;
  }

  function filterPlaces(text,places){
    const territories=territoryIds(text);
    if(!territories.size)return Array.isArray(places)?places:[];
    return (Array.isArray(places)?places:[]).filter(place=>isExplicitPoiMention(text,place,territories));
  }

  if(originalFindPlaces){
    bridge.findPlaces=text=>filterPlaces(text,originalFindPlaces(text));
  }

  if(originalFindExactPlaces){
    bridge.findExactPlaces=text=>filterPlaces(text,originalFindExactPlaces(text));
  }

  window.AracneCityFirst122={
    version:VERSION,
    filterPlaces,
    restore:()=>{
      if(originalFindPlaces)bridge.findPlaces=originalFindPlaces;
      if(originalFindExactPlaces)bridge.findExactPlaces=originalFindExactPlaces;
    }
  };

  console.info(`[Aracne City First] v${VERSION} active`);
})();
