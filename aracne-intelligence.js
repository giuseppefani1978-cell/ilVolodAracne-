(() => {
  "use strict";

  const VERSION = "0.5.0";

  const LANGS = [
    "it",
    "fr",
    "en",
    "es"
  ];

  const LOCALES = {
    it: "it-IT",
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES"
  };

  let bridge = null;
  let currentLanguage = "it";
  let activeRequestLanguage = null;
  let askButton = null;

  const sessionState = {
    turn: 0,
    language: null,
    lastPlaceIds: [],
    lastIntents: [],
    lastRoute: null
  };


  /* =========================================
     TEXTES
     ========================================= */

  const I18N = {

    it: {

      ask: "Chiedi ad Aracne",

      thinking:
        "Aracne sta tessendo…",

      title:
        "Aracne",

      empty:
        "Scrivi o detta prima una domanda.",

      scope:
        "Aracne conosce i luoghi e i percorsi presenti nell’app. Può raccontarti un luogo, cercare cosa c’è vicino, aggiungere tappe e creare itinerari. Non è ancora un assistente generalista su Internet.",

      unknown:
        "Posso aiutarti soprattutto con i luoghi presenti nell’app, ciò che c’è vicino, i percorsi e le funzioni di HIRUNDU. Prova per esempio: «Cosa c’è vicino a Otranto?», «Raccontami Porto Badisco» o «Creami un percorso natura di 3 ore».",

      noPlace:
        "Non ho identificato un luogo preciso nella domanda.",

      nearMe:
        "Cerco i luoghi più vicini a te.",

      noCoords:
        "Non ho coordinate sufficienti per calcolare cosa c’è intorno a questo luogo.",

      add: name =>
        `Preparo ${name} per il tuo percorso.`,

      open: name =>
        `Ti mostro ${name}.`,

      routeFail:
        "Mi servono un po’ più di indicazioni: prova a citare un luogo, un tema, il tempo disponibile o il mezzo.",

      nearbyIntro: name =>
        `Vicino a ${name} puoi trovare:`,

      multiIntro:
        "Hai citato più luoghi. Ecco cosa so:",

      businessesIntro:
        "Attività locali vicine:",

      category: {
        sea: "mare",
        nature: "natura",
        culture: "cultura",
        food: "sapori"
      },

      mins: m =>
        `${m} min circa`
    },


    fr: {

      ask:
        "Demander à Aracne",

      thinking:
        "Aracne tisse sa réponse…",

      title:
        "Aracne",

      empty:
        "Écris ou dicte d’abord une question.",

      scope:
        "Aracne connaît les lieux et les parcours présents dans l’app. Elle peut raconter un lieu, chercher ce qu’il y a autour, ajouter des étapes et créer des itinéraires. Ce n’est pas encore un assistant généraliste connecté à Internet.",

      unknown:
        "Je peux surtout t’aider avec les lieux présents dans l’app, ce qu’il y a autour, les parcours et les fonctions de HIRUNDU. Essaie par exemple : « Qu’est-ce qu’il y a autour d’Otranto ? », « Raconte-moi Porto Badisco » ou « Crée-moi un parcours nature de 3 heures ».",

      noPlace:
        "Je n’ai pas identifié de lieu précis dans la question.",

      nearMe:
        "Je cherche les lieux les plus proches de toi.",

      noCoords:
        "Je n’ai pas assez de coordonnées pour calculer ce qu’il y a autour de ce lieu.",

      add: name =>
        `Je prépare ${name} pour ton parcours.`,

      open: name =>
        `Je t’ouvre ${name}.`,

      routeFail:
        "Il me faut un peu plus d’indications : cite un lieu, un thème, le temps disponible ou le moyen de transport.",

      nearbyIntro: name =>
        `Autour de ${name}, tu peux trouver :`,

      multiIntro:
        "Tu as cité plusieurs lieux. Voici ce que je sais :",

      businessesIntro:
        "Commerces et activités locales à proximité :",

      category: {
        sea: "mer",
        nature: "nature",
        culture: "culture",
        food: "saveurs"
      },

      mins: m =>
        `${m} min environ`
    },


    en: {

      ask:
        "Ask Aracne",

      thinking:
        "Aracne is weaving…",

      title:
        "Aracne",

      empty:
        "Type or dictate a question first.",

      scope:
        "Aracne knows the places and routes contained in the app. It can describe a place, find what is nearby, add stops and create itineraries. It is not yet a general Internet assistant.",

      unknown:
        "I can mainly help with places already in the app, nearby discoveries, routes and HIRUNDU features. Try: “What is near Otranto?”, “Tell me about Porto Badisco”, or “Create a 3-hour nature route”.",

      noPlace:
        "I could not identify a specific place in the question.",

      nearMe:
        "I am looking for the nearest places around you.",

      noCoords:
        "I do not have enough coordinates to calculate what is around this place.",

      add: name =>
        `I am preparing ${name} for your route.`,

      open: name =>
        `I am opening ${name}.`,

      routeFail:
        "I need a little more information: name a place, a theme, the available time or your transport mode.",

      nearbyIntro: name =>
        `Near ${name}, you can find:`,

      multiIntro:
        "You mentioned several places. Here is what I know:",

      businessesIntro:
        "Nearby local businesses and activities:",

      category: {
        sea: "sea",
        nature: "nature",
        culture: "culture",
        food: "food"
      },

      mins: m =>
        `about ${m} min`
    },


    es: {

      ask:
        "Preguntar a Aracne",

      thinking:
        "Aracne está tejiendo…",

      title:
        "Aracne",

      empty:
        "Escribe o dicta primero una pregunta.",

      scope:
        "Aracne conoce los lugares y recorridos presentes en la app. Puede describir un lugar, buscar qué hay cerca, añadir etapas y crear itinerarios. Todavía no es un asistente generalista conectado a Internet.",

      unknown:
        "Puedo ayudarte sobre todo con los lugares presentes en la app, lo que hay cerca, las rutas y las funciones de HIRUNDU. Prueba: «¿Qué hay cerca de Otranto?», «Cuéntame Porto Badisco» o «Crea una ruta de naturaleza de 3 horas».",

      noPlace:
        "No he identificado un lugar concreto en la pregunta.",

      nearMe:
        "Busco los lugares más cercanos a ti.",

      noCoords:
        "No tengo suficientes coordenadas para calcular qué hay alrededor de este lugar.",

      add: name =>
        `Preparo ${name} para tu ruta.`,

      open: name =>
        `Te muestro ${name}.`,

      routeFail:
        "Necesito un poco más de información: indica un lugar, un tema, el tiempo disponible o el medio de transporte.",

      nearbyIntro: name =>
        `Cerca de ${name} puedes encontrar:`,

      multiIntro:
        "Has mencionado varios lugares. Esto es lo que sé:",

      businessesIntro:
        "Comercios y actividades locales cercanas:",

      category: {
        sea: "mar",
        nature: "naturaleza",
        culture: "cultura",
        food: "sabores"
      },

      mins: m =>
        `${m} min aprox.`
    }
  };


  /* =========================================
     CONNAISSANCE SUR HIRUNDU LUI-MÊME
     ========================================= */

  const APP_KNOWLEDGE = [

    {
      keys: [
        "filo verde",
        "green thread",
        "hilo verde"
      ],

      text: {

        it:
          "Il Filo Verde è l’indicatore di viaggio responsabile dell’app: cresce con scelte e missioni più sostenibili.",

        fr:
          "Le Filo Verde est l’indicateur de voyage responsable de l’app : il progresse avec les choix et missions plus durables.",

        en:
          "Filo Verde is the app’s responsible-travel indicator. It grows with more sustainable choices and missions.",

        es:
          "Filo Verde es el indicador de viaje responsable de la app. Progresa con decisiones y misiones más sostenibles."
      }
    },


    {
      keys: [
        "aracne points",
        "points aracne",
        "punti aracne"
      ],

      text: {

        it:
          "Gli Aracne Points vengono guadagnati completando missioni e azioni validate nell’app.",

        fr:
          "Les Aracne Points se gagnent en réalisant des missions et actions validées dans l’app.",

        en:
          "Aracne Points are earned by completing validated missions and actions in the app.",

        es:
          "Los Aracne Points se obtienen completando misiones y acciones validadas en la app."
      }
    },


    {
      keys: [
        "diario",
        "journal",
        "diary"
      ],

      text: {

        it:
          "Il Diario di Aracne salva le tue note localmente sul dispositivo. Non è sincronizzato nel cloud.",

        fr:
          "Le Journal d’Aracne enregistre tes notes localement sur l’appareil. Il n’est pas synchronisé dans le cloud.",

        en:
          "The Aracne Journal stores your notes locally on the device. It is not synced to the cloud.",

        es:
          "El Diario de Aracne guarda tus notas localmente en el dispositivo. No se sincroniza en la nube."
      }
    }
  ];


  /* =========================================
     LANGUE
     ========================================= */

  function normalizeLanguageCode(value) {
    const code=String(value||"").toLowerCase().slice(0,2);
    return LANGS.includes(code) ? code : null;
  }

  function lang() {
    return (
      normalizeLanguageCode(activeRequestLanguage)
      ||
      normalizeLanguageCode(bridge?.getVoiceLanguage?.())
      ||
      normalizeLanguageCode(bridge?.getLanguage?.())
      ||
      normalizeLanguageCode(currentLanguage)
      ||
      "it"
    );
  }


  function tr(key, ...args) {

    const value =
      (I18N[lang()] || I18N.it)[key];

    return typeof value === "function"
      ? value(...args)
      : value;
  }


  /* =========================================
     NORMALISATION
     ========================================= */

  function normalize(value = "") {

    return String(value)

      .toLowerCase()

      .normalize("NFD")

      .replace(
        /[\u0300-\u036f]/g,
        ""
      )

      .replace(
        /[’']/g,
        " "
      )

      .replace(
        /[-–—]/g,
        " "
      )

      .replace(
        /[^a-z0-9\s]/g,
        " "
      )

      .replace(
        /\s+/g,
        " "
      )

      .trim();
  }


  function getTranscript() {

    return (

      bridge
        ?.getTranscript
        ?.()

      ||

      document
        .querySelector(
          "#assistantTranscript"
        )
        ?.value

      ||

      ""

    ).trim();
  }


  /* =========================================
     RECHERCHE POI
     ========================================= */

  function getPlaces(text) {

    try {

      const result =
        bridge
          ?.findPlaces
          ?.(text);

      if (
        Array.isArray(result)
        &&
        result.length
      ) {

        return result.filter(Boolean);
      }

    } catch (error) {

      console.warn(
        "[Aracne] findPlaces",
        error
      );
    }


    const n =
      normalize(text);


    return (
      bridge?.getPlaces?.()
      ||
      []
    ).filter(place => {

      const id =
        normalize(
          place?.id || ""
        );


      const name =
        normalize(
          place?.name || ""
        );


      return (

        (
          id
          &&
          n.includes(id)
        )

        ||

        (
          name.length > 3
          &&
          n.includes(name)
        )
      );
    });
  }


  function placeName(place) {

    return (
      place?.name
      ||
      place?.id
      ||
      ""
    );
  }


  function placeSummary(place) {

    return (

      place
        ?.text
        ?.[lang()]

      ||

      place
        ?.text
        ?.it

      ||

      ""
    );
  }


  function hasCoords(place) {

    return (

      Number.isFinite(
        Number(place?.lat)
      )

      &&

      Number.isFinite(
        Number(place?.lng)
      )
    );
  }


  /* =========================================
     DISTANCE
     ========================================= */

  function distanceKm(a, b) {

    const R =
      6371;


    const rad =
      value =>
        value * Math.PI / 180;


    const dLat =
      rad(
        Number(b.lat)
        -
        Number(a.lat)
      );


    const dLng =
      rad(
        Number(b.lng)
        -
        Number(a.lng)
      );


    const lat1 =
      rad(
        Number(a.lat)
      );


    const lat2 =
      rad(
        Number(b.lat)
      );


    const h =

      Math.sin(
        dLat / 2
      ) ** 2

      +

      Math.cos(lat1)

      *

      Math.cos(lat2)

      *

      Math.sin(
        dLng / 2
      ) ** 2;


    return (

      2

      *

      R

      *

      Math.asin(
        Math.sqrt(h)
      )
    );
  }


  /* =========================================
     CONNAISSANCE APP
     ========================================= */

  function appKnowledge(text) {

    const n =
      normalize(text);


    for (
      const item
      of APP_KNOWLEDGE
    ) {

      const found =
        item.keys.some(
          key =>
            n.includes(
              normalize(key)
            )
        );


      if (found) {

        return (
          item.text[lang()]
          ||
          item.text.it
        );
      }
    }


    return null;
  }


  /* =========================================
     COMPREHENSION v0.4
     Multi-intent, multilingual, deterministic.
     No external AI / no network.
     ========================================= */

  const CONTEXT_I18N = {
    it:{
      clarifyPlace:"Di quale luogo stai parlando?",
      clarifyOrigin:names=>"Vuoi partire da "+names.join(" o ")+" oppure vuoi semplicemente includerli nel percorso?",
      noContext:"Non ho ancora un luogo o un percorso di riferimento. Dimmi prima da dove vuoi partire."
    },
    fr:{
      clarifyPlace:"De quel lieu parles-tu ?",
      clarifyOrigin:names=>"Tu veux partir de "+names.join(" ou ")+" ou simplement les inclure dans le parcours ?",
      noContext:"Je n’ai pas encore de lieu ou de parcours de référence. Indique-moi d’abord d’où tu veux partir."
    },
    en:{
      clarifyPlace:"Which place are you referring to?",
      clarifyOrigin:names=>"Do you want to start from "+names.join(" or ")+" or simply include them in the route?",
      noContext:"I do not have a place or route in context yet. Tell me where you want to start."
    },
    es:{
      clarifyPlace:"¿De qué lugar hablas?",
      clarifyOrigin:names=>"¿Quieres salir de "+names.join(" o ")+" o simplemente incluirlos en la ruta?",
      noContext:"Todavía no tengo un lugar o una ruta de referencia. Dime primero desde dónde quieres salir."
    }
  };

  const CONTEXT_RULES = {
    it:{
      nearby:["e intorno","intorno","e vicino","nei dintorni","cosa c e intorno"],
      routeFollowup:["fallo","rifallo","rifai","modificalo","cambialo","lo stesso percorso"],
      shorter:["piu corto","accorcialo","meno tempo"],
      longer:["piu lungo","allungalo","piu tempo"],
      nature:["piu natura","piu naturale"],
      sea:["piu mare","piu spiagge"],
      culture:["piu cultura","piu storia"],
      food:["piu sapori","piu gastronomia","piu cibo"],
      origin:["partendo da","a partire da","con partenza da","da"],
      include:["con","includendo","passando per","attraverso"],
      contextPlace:["li","quel posto","questa zona","quel luogo"]
    },
    fr:{
      nearby:["et autour","autour","et a proximite","a proximite","dans les environs","et pres de la"],
      routeFollowup:["fais le","refais le","refais","modifie le","change le","le meme parcours","ce parcours"],
      shorter:["plus court","raccourcis le","moins long","moins de temps"],
      longer:["plus long","allonge le","plus de temps"],
      nature:["plus nature","plus naturel","davantage de nature"],
      sea:["plus mer","plus de mer","plus de plages"],
      culture:["plus culture","plus culturel","plus d histoire"],
      food:["plus gastronomie","plus de saveurs","plus cuisine"],
      origin:["en partant de","au depart de","a partir de","depuis"],
      include:["avec","en incluant","en passant par","via"],
      contextPlace:["la bas","ce lieu","cet endroit","sur place","la"]
    },
    en:{
      nearby:["and around","around there","nearby","near there","what is around"],
      routeFollowup:["do it","redo it","redo","change it","modify it","same route","this route"],
      shorter:["shorter","make it shorter","less time"],
      longer:["longer","make it longer","more time"],
      nature:["more nature","more natural","more outdoors"],
      sea:["more sea","more beach","more beaches"],
      culture:["more culture","more history","more cultural"],
      food:["more food","more gastronomy","more local food"],
      origin:["starting from","start from","departing from","from"],
      include:["with","including","via","passing through"],
      contextPlace:["there","that place","this place","on site"]
    },
    es:{
      nearby:["y alrededor","alrededor","cerca de alli","en los alrededores","y cerca"],
      routeFollowup:["hazlo","rehazlo","cambialo","modificalo","la misma ruta","esta ruta"],
      shorter:["mas corto","acortalo","menos tiempo"],
      longer:["mas largo","alargalo","mas tiempo"],
      nature:["mas naturaleza","mas natural"],
      sea:["mas mar","mas playa","mas playas"],
      culture:["mas cultura","mas historia","mas cultural"],
      food:["mas gastronomia","mas sabores","mas comida"],
      origin:["saliendo de","partiendo de","a partir de","desde"],
      include:["con","incluyendo","pasando por","via"],
      contextPlace:["alli","ese lugar","este lugar","ahi"]
    }
  };

  function contextText(language,key,...args) {
    const pack=CONTEXT_I18N[language]||CONTEXT_I18N.it;
    const value=pack[key];
    return typeof value==="function" ? value(...args) : value;
  }

  function resetContext() {
    sessionState.turn=0;
    sessionState.language=null;
    sessionState.lastPlaceIds=[];
    sessionState.lastIntents=[];
    sessionState.lastRoute=null;
    return getContext();
  }

  function getContext() {
    return {
      turn:sessionState.turn,
      language:sessionState.language,
      lastPlaceIds:[...sessionState.lastPlaceIds],
      lastIntents:[...sessionState.lastIntents],
      lastRoute:sessionState.lastRoute
        ? {
            placeIds:[...(sessionState.lastRoute.placeIds||[])],
            durationHours:sessionState.lastRoute.durationHours,
            themes:[...(sessionState.lastRoute.themes||[])],
            mode:sessionState.lastRoute.mode||null
          }
        : null
    };
  }

  function placesByIds(ids=[]) {
    const all=bridge?.getPlaces?.()||[];
    const map=new Map(all.map(place=>[place.id,place]));
    return ids.map(id=>map.get(id)).filter(Boolean);
  }

  const SECTION_LABELS = {
    it:{about:"Su",nearby:"Nei dintorni",route:"Percorso proposto",action:"Azione",compare:"Confronto",stops:"Tappe",duration:"Durata",mode:"Mezzo"},
    fr:{about:"À propos de",nearby:"Autour",route:"Parcours proposé",action:"Action",compare:"Comparaison",stops:"Étapes",duration:"Durée",mode:"Transport"},
    en:{about:"About",nearby:"Nearby",route:"Suggested route",action:"Action",compare:"Comparison",stops:"Stops",duration:"Duration",mode:"Transport"},
    es:{about:"Sobre",nearby:"Alrededores",route:"Ruta propuesta",action:"Acción",compare:"Comparación",stops:"Etapas",duration:"Duración",mode:"Transporte"}
  };

  const MODE_LABELS = {
    it:{driving:"auto / scooter",cycling:"bici",walking:"a piedi"},
    fr:{driving:"voiture / scooter",cycling:"vélo",walking:"à pied"},
    en:{driving:"car / scooter",cycling:"bike",walking:"walking"},
    es:{driving:"coche / scooter",cycling:"bici",walking:"a pie"}
  };

  const NUMBER_WORDS = {
    it:{uno:1,una:1,un:1,due:2,tre:3,quattro:4,cinque:5,sei:6,sette:7,otto:8,nove:9,dieci:10,undici:11,dodici:12},
    fr:{un:1,une:1,deux:2,trois:3,quatre:4,cinq:5,six:6,sept:7,huit:8,neuf:9,dix:10,onze:11,douze:12},
    en:{one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12},
    es:{un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12}
  };

  const LEXICON = {
    it:{
      scope:["cosa puoi fare","cosa sai fare","come funziona","come puoi aiutarmi"],
      tell:["parlami di","parlami","raccontami","spiegami","dimmi di","descrivimi","cosa sai di"],
      routeNouns:["percorso","tragitto","itinerario","giro","passeggiata","camminata","escursione","tour","viaggio"],
      routeVerbs:["crea","creami","costruisci","proponi","prepara","organizza","fammi","suggerisci","consigliami","pianifica"],
      nearbyMe:["vicino a me","intorno a me","nei miei dintorni"],
      nearbyPlace:["vicino a","intorno a","nei dintorni di","nei pressi di","cosa c e vicino a","cosa vedere vicino a"],
      add:["aggiungi","aggiungere","inserisci","inserire","metti","includi","includere"],
      open:["apri","mostra","fammi vedere","visualizza"],
      compare:["confronta","confronto","differenza tra","meglio tra"],
      themes:{nature:["natura","naturale","parco","bosco","verde"],sea:["mare","spiaggia","baia","costa"],culture:["cultura","storia","arte","chiesa","castello","museo"],food:["cibo","cucina","sapori","gastronomia","prodotto locale"],sunset:["tramonto"]},
      modes:{cycling:["bici","bicicletta","ciclismo"],walking:["a piedi","camminare","camminata"],driving:["auto","macchina","scooter","moto"]}
    },
    fr:{
      scope:["que peux tu faire","qu est ce que tu fais","comment ca marche","comment peux tu m aider"],
      tell:["parle moi de","parle moi d","parle moi","raconte moi","raconte moi d","explique moi","dis moi","decris moi","presente moi","que sais tu de","que sais tu d"],
      routeNouns:["parcours","trajet","itineraire","circuit","balade","promenade","excursion","tour","trip","voyage"],
      routeVerbs:["cree","creer","construis","construire","propose","proposer","prepare","preparer","organise","organiser","fais","faire","planifie","planifier","suggere","suggerer","conseille moi"],
      nearbyMe:["autour de moi","pres de moi","a proximite de moi","dans les environs"],
      nearbyPlace:["autour de","autour d","pres de","pres d","a proximite de","a proximite d","aux alentours de","aux alentours d","dans les environs de","dans les environs d","qu est ce qu il y a autour de","qu est ce qu il y a autour d","que voir pres de","que voir pres d"],
      add:["ajoute","ajouter","mets","mettre","insere","inserer","inclus","inclure"],
      open:["ouvre","ouvrir","montre","montre moi","affiche","fais moi voir"],
      compare:["compare","comparaison","difference entre","lequel choisir entre"],
      themes:{nature:["nature","naturel","plein air","parc","foret","vert"],sea:["mer","plage","baie","cote"],culture:["culture","histoire","art","eglise","chateau","musee"],food:["saveurs","gastronomie","cuisine","produit local","manger"],sunset:["coucher de soleil","sunset"]},
      modes:{cycling:["velo","bicyclette","bike"],walking:["a pied","marche","marcher"],driving:["voiture","auto","scooter","moto"]}
    },
    en:{
      scope:["what can you do","what do you do","how does this work","how can you help me"],
      tell:["tell me about","tell me","talk to me about","describe","explain","what do you know about","introduce me to"],
      routeNouns:["route","trip","itinerary","journey","tour","walk","walking tour","excursion","trail","circuit"],
      routeVerbs:["create","build","make","plan","suggest","propose","prepare","organize","organise","recommend"],
      nearbyMe:["near me","around me","close to me","in my area"],
      nearbyPlace:["near","around","close to","nearby","what is around","what s around","what can i see near"],
      add:["add","include","insert","put"],
      open:["open","show","show me","display"],
      compare:["compare","comparison","difference between","which is better"],
      themes:{nature:["nature","natural","outdoors","park","forest","green"],sea:["sea","beach","bay","coast"],culture:["culture","history","art","church","castle","museum"],food:["food","flavours","flavors","cuisine","local food","gastronomy"],sunset:["sunset"]},
      modes:{cycling:["bike","bicycle","cycling"],walking:["walk","walking","on foot"],driving:["car","driving","scooter","motorbike","motorcycle"]}
    },
    es:{
      scope:["que puedes hacer","que sabes hacer","como funciona","como puedes ayudarme"],
      tell:["hablame de","hablame","cuentame","explicame","dime","describeme","presentame","que sabes de"],
      routeNouns:["ruta","trayecto","recorrido","itinerario","circuito","paseo","excursion","tour","trip","viaje"],
      routeVerbs:["crea","crear","construye","construir","propon","propone","proponer","prepara","organiza","organizar","haz","hacer","planifica","sugiere","recomienda"],
      nearbyMe:["cerca de mi","a mi alrededor","en mis alrededores"],
      nearbyPlace:["cerca de","alrededor de","en los alrededores de","proximo a","que hay cerca de","que ver cerca de"],
      add:["anade","anadir","agrega","agregar","incluye","incluir","inserta"],
      open:["abre","abrir","muestra","muestrame","ensena"],
      compare:["compara","comparacion","diferencia entre","cual elegir entre"],
      themes:{nature:["naturaleza","natural","parque","bosque","verde"],sea:["mar","playa","bahia","costa"],culture:["cultura","historia","arte","iglesia","castillo","museo"],food:["comida","sabores","gastronomia","cocina","producto local"],sunset:["atardecer","puesta de sol"]},
      modes:{cycling:["bici","bicicleta","ciclismo"],walking:["a pie","caminar","paseo"],driving:["coche","auto","scooter","moto"]}
    }
  };

  function earliestMatch(text, phrases) {
    let best=-1;

    for(const raw of phrases||[]) {
      const p=normalize(raw);
      if(!p)continue;

      let from=0;
      while(from<=text.length-p.length) {
        const i=text.indexOf(p,from);
        if(i<0)break;

        const before=i===0?" ":text[i-1];
        const after=(i+p.length)>=text.length?" ":text[i+p.length];

        if(before===" " && after===" ") {
          if(best<0 || i<best)best=i;
          break;
        }

        from=i+1;
      }
    }

    return best;
  }

  function hasAny(text, phrases) {
    return earliestMatch(text,phrases)>=0;
  }

  function detectTextLanguage(text) {
    const n=normalize(text);
    if(!n)return null;
    const scores={it:0,fr:0,en:0,es:0};

    for(const code of LANGS) {
      const l=LEXICON[code];
      const groups=[l.scope,l.tell,l.routeNouns,l.routeVerbs,l.nearbyMe,l.nearbyPlace,l.add,l.open,l.compare];
      for(const group of groups) {
        for(const raw of group||[]) {
          const p=normalize(raw);
          if(p && earliestMatch(n,[p])>=0)scores[code]+=p.includes(" ")?3:1;
        }
      }
    }

    let best=null,bestScore=0,second=0;
    for(const code of LANGS) {
      const score=scores[code];
      if(score>bestScore){second=bestScore;bestScore=score;best=code;}
      else if(score>second)second=score;
    }

    return bestScore>=2 && bestScore>second ? best : null;
  }

  function replaceNumberWords(text, language) {
    let n=normalize(text);
    const map=NUMBER_WORDS[language]||{};
    for(const [word,value] of Object.entries(map)) {
      n=n.replace(new RegExp("\\b"+word+"\\b","g"),String(value));
    }
    return n;
  }

  function parseDurationHours(text, language) {
    const n=replaceNumberWords(text,language);

    if(/\b(mezza giornata|demi journee|half day|medio dia)\b/.test(n))return 4;
    if(/\b(giornata intera|journee entiere|full day|dia entero)\b/.test(n))return 8;

    let m=n.match(/\b(\d+(?:[\.,]\d+)?)\s*(?:h|ore|ora|heures?|heure|hours?|hour|horas?|hora)\b/);
    if(m) {
      let hours=parseFloat(m[1].replace(",","."));
      if(/\b(et demie|e mezza|and a half|y media)\b/.test(n))hours+=0.5;
      return hours;
    }

    m=n.match(/\b(\d+(?:[\.,]\d+)?)\s*(?:min|mins|minutes?|minuti|minutos?)\b/);
    if(m)return parseFloat(m[1].replace(",","."))/60;

    return null;
  }

  function detectThemes(text, language) {
    const n=normalize(text), l=LEXICON[language]||LEXICON.it, out=[];
    for(const [theme,phrases] of Object.entries(l.themes||{})) {
      if(hasAny(n,phrases))out.push(theme);
    }
    return out;
  }

  function detectMode(text, language) {
    const n=normalize(text), l=LEXICON[language]||LEXICON.it;
    for(const mode of ["cycling","walking","driving"]) {
      if(hasAny(n,l.modes?.[mode]||[]))return mode;
    }
    return null;
  }

  function placeSearchCandidates(place) {
    const candidates=[];
    const add=value=>{
      const n=normalize(value);
      if(n.length>=3 && !candidates.includes(n))candidates.push(n);
    };

    add(place?.name||"");
    add(String(place?.id||"").replace(/_/g," "));

    String(place?.name||"")
      .split(",")
      .forEach(add);

    const words=normalize(place?.name||"").split(" ").filter(Boolean);
    if(words.length>=2) {
      add(words.slice(0,2).join(" "));
      add(words.slice(-2).join(" "));
    }

    for(const word of words) {
      if(word.length>=5)add(word);
    }

    return candidates.sort((a,b)=>b.length-a.length);
  }

  function findPlacePosition(text, place) {
    let best=-1;
    for(const candidate of placeSearchCandidates(place)) {
      const i=earliestMatch(text,[candidate]);
      if(i>=0 && (best<0 || i<best))best=i;
    }
    return best;
  }

  function assignTargets(text, cues, places) {
    const mentions=places
      .map(place=>({place,pos:findPlacePosition(text,place)}))
      .filter(x=>x.pos>=0)
      .sort((a,b)=>a.pos-b.pos);

    const byPosition=[...cues].sort((a,b)=>a.pos-b.pos);
    const targets={};

    for(let i=0;i<byPosition.length;i++) {
      const cue=byPosition[i];
      const end=i+1<byPosition.length ? byPosition[i+1].pos : text.length+1;

      let local=mentions
        .filter(x=>x.pos>=cue.pos && x.pos<end)
        .map(x=>x.place);

      // Route clauses often inherit the place introduced just before:
      // "Tell me about Gallipoli and build a 3-hour route".
      if(cue.name==="route" && !local.length) {
        const previous=mentions.filter(x=>x.pos<cue.pos);
        if(previous.length)local=[previous[previous.length-1].place];
      }

      targets[cue.name]=[...new Map(local.map(p=>[p.id||p.name,p])).values()];
    }

    return targets;
  }

  function buildBridgeText(text, analysis) {
    const routePlaces=analysis.targets?.route||[];
    let output=routePlaces.map(placeName).join(" ");

    if(analysis.durationHours!=null)output+=" "+analysis.durationHours+" h";
    for(const theme of analysis.themes||[])output+=" "+theme;
    if(analysis.mode)output+=" "+analysis.mode;

    return output.trim() || normalize(text);
  }

  function analyze(text) {
    const n=normalize(text);
    const explicitPlaces=getPlaces(text);
    const language=
      detectTextLanguage(text)
      ||
      normalizeLanguageCode(sessionState.language)
      ||
      normalizeLanguageCode(bridge?.getVoiceLanguage?.())
      ||
      normalizeLanguageCode(bridge?.getLanguage?.())
      ||
      "it";

    const l=LEXICON[language]||LEXICON.it;
    const ctx=CONTEXT_RULES[language]||CONTEXT_RULES.it;

    let durationHours=parseDurationHours(text,language);
    let themes=detectThemes(text,language);
    let mode=detectMode(text,language);

    const cues=[];
    const addIntent=(name,pos,score=1)=>{
      if(pos<0)return;
      const existing=cues.find(x=>x.name===name);
      if(existing){
        existing.score=Math.max(existing.score,score);
        existing.pos=Math.min(existing.pos,pos);
        return;
      }
      cues.push({name,pos,score});
    };

    addIntent("scope",earliestMatch(n,l.scope),9);
    addIntent("tell",earliestMatch(n,l.tell),8);
    addIntent("near_me",earliestMatch(n,l.nearbyMe),9);
    addIntent("near_place",earliestMatch(n,l.nearbyPlace),8);
    addIntent("near_place",earliestMatch(n,ctx.nearby),7);
    addIntent("add",earliestMatch(n,l.add),8);
    addIntent("open",earliestMatch(n,l.open),7);
    addIntent("compare",earliestMatch(n,l.compare),8);

    const routeNounPos=earliestMatch(n,l.routeNouns);
    const routeVerbPos=earliestMatch(n,l.routeVerbs);
    const routeFollowupPos=earliestMatch(n,ctx.routeFollowup);

    const shorter=hasAny(n,ctx.shorter);
    const longer=hasAny(n,ctx.longer);
    const themeModifier=
      hasAny(n,ctx.nature) ? "nature"
      : hasAny(n,ctx.sea) ? "sea"
      : hasAny(n,ctx.culture) ? "culture"
      : hasAny(n,ctx.food) ? "food"
      : null;

    if(themeModifier)themes=[themeModifier];

    if(durationHours==null && sessionState.lastRoute?.durationHours!=null) {
      if(shorter)durationHours=Math.max(1,Number(sessionState.lastRoute.durationHours)-1);
      if(longer)durationHours=Math.min(12,Number(sessionState.lastRoute.durationHours)+1);
    }

    const routeContext=
      durationHours!=null
      || themes.length
      || explicitPlaces.length
      || mode
      || routeFollowupPos>=0
      || shorter
      || longer
      || !!themeModifier;

    if(
      (routeNounPos>=0 && (routeVerbPos>=0 || routeContext))
      ||
      (routeVerbPos>=0 && routeContext)
      ||
      (
        sessionState.lastRoute
        &&
        routeContext
        &&
        (
          routeFollowupPos>=0
          || shorter
          || longer
          || !!themeModifier
          || durationHours!=null
          || mode
        )
      )
    ) {
      const positions=[routeNounPos,routeVerbPos,routeFollowupPos].filter(x=>x>=0);
      addIntent("route",positions.length?Math.min(...positions):0,9);
    }

    let places=[...explicitPlaces];

    const needsRememberedPlace=
      !places.length
      &&
      (
        cues.some(x=>x.name==="near_place")
        ||
        hasAny(n,ctx.contextPlace)
        ||
        (
          cues.some(x=>x.name==="route")
          &&
          !!sessionState.lastRoute
        )
      );

    if(needsRememberedPlace) {
      const ids=
        cues.some(x=>x.name==="route") && sessionState.lastRoute?.placeIds?.length
          ? sessionState.lastRoute.placeIds
          : sessionState.lastPlaceIds;

      places=placesByIds(ids);
    }

    // A named place with no explicit action is informational.
    if(!cues.length && places.length)addIntent("tell",0,4);

    if(cues.some(x=>x.name==="compare")) {
      const i=cues.findIndex(x=>x.name==="tell");
      if(i>=0)cues.splice(i,1);
    }

    if(cues.length>1) {
      const i=cues.findIndex(x=>x.name==="scope");
      if(i>=0)cues.splice(i,1);
    }

    const order={tell:10,compare:15,near_me:20,near_place:20,add:30,open:35,route:40,scope:50};
    cues.sort((a,b)=>(order[a.name]||99)-(order[b.name]||99)||a.pos-b.pos);

    const analysis={
      language,
      normalized:n,
      explicitPlaces,
      places,
      intents:cues.map(x=>x.name),
      cues,
      durationHours,
      themes,
      mode,
      contextUsed:needsRememberedPlace || !!themeModifier || shorter || longer || routeFollowupPos>=0,
      modifiers:{shorter,longer,theme:themeModifier},
      clarification:null
    };

    analysis.targets=assignTargets(n,cues,places);

    // Context fallback for follow-up routes: inherit the last route's origin/places.
    if(
      analysis.intents.includes("route")
      &&
      !(analysis.targets.route?.length)
      &&
      sessionState.lastRoute?.placeIds?.length
    ) {
      analysis.targets.route=placesByIds(sessionState.lastRoute.placeIds);
    }

    // Context fallback for "and around?".
    if(
      analysis.intents.includes("near_place")
      &&
      !(analysis.targets.near_place?.length)
      &&
      sessionState.lastPlaceIds.length
    ) {
      analysis.targets.near_place=placesByIds(sessionState.lastPlaceIds);
    }

    // Inherit route settings unless the user explicitly changes them.
    if(analysis.intents.includes("route") && sessionState.lastRoute) {
      if(durationHours==null && sessionState.lastRoute.durationHours!=null) {
        analysis.durationHours=sessionState.lastRoute.durationHours;
      }
      if(!themes.length && sessionState.lastRoute.themes?.length) {
        analysis.themes=[...sessionState.lastRoute.themes];
      }
      if(!mode && sessionState.lastRoute.mode) {
        analysis.mode=sessionState.lastRoute.mode;
      }
    }

    const routeTargets=analysis.targets.route||[];
    const hasOriginCue=hasAny(n,ctx.origin);
    const hasIncludeCue=hasAny(n,ctx.include);

    if(
      analysis.intents.includes("route")
      &&
      explicitPlaces.length>=2
      &&
      routeTargets.length>=2
      &&
      !hasOriginCue
      &&
      !hasIncludeCue
    ) {
      analysis.clarification={
        type:"route_origin",
        placeIds:routeTargets.map(place=>place.id),
        text:contextText(language,"clarifyOrigin",routeTargets.slice(0,3).map(placeName))
      };
    }

    const placeRequired=analysis.intents.some(x=>["tell","near_place","add","open"].includes(x));
    if(placeRequired && !analysis.places.length && !analysis.clarification) {
      analysis.clarification={
        type:"place",
        placeIds:[],
        text:contextText(language,"clarifyPlace")
      };
    }

    const contextOnlyRequest=
      !explicitPlaces.length
      &&
      (
        routeFollowupPos>=0
        || shorter
        || longer
        || !!themeModifier
        || hasAny(n,ctx.contextPlace)
        || hasAny(n,ctx.nearby)
      );

    if(
      contextOnlyRequest
      &&
      !sessionState.lastPlaceIds.length
      &&
      !sessionState.lastRoute
      &&
      !analysis.clarification
    ) {
      analysis.clarification={
        type:"missing_context",
        placeIds:[],
        text:contextText(language,"noContext")
      };
    }

    analysis.bridgeText=buildBridgeText(text,analysis);
    return analysis;
  }

  function rememberTurn(analysis, routeInfo=null) {
    sessionState.turn+=1;
    sessionState.language=analysis.language||sessionState.language;
    sessionState.lastIntents=[...(analysis.intents||[])];

    let focusPlaces=[];

    for(const key of ["tell","near_place","open","route","add"]) {
      const candidates=analysis.targets?.[key]||[];
      if(candidates.length){
        focusPlaces=candidates;
        if(key!=="add")break;
      }
    }

    if(focusPlaces.length) {
      sessionState.lastPlaceIds=focusPlaces.map(place=>place.id).filter(Boolean);
    } else if(analysis.places?.length) {
      sessionState.lastPlaceIds=analysis.places.map(place=>place.id).filter(Boolean);
    }

    if(analysis.intents.includes("route")) {
      const routePlaces=
        routeInfo?.selected?.length
          ? routeInfo.selected
          : (analysis.targets?.route||[]);

      sessionState.lastRoute={
        placeIds:routePlaces.map(place=>place.id).filter(Boolean),
        durationHours:
          routeInfo?.hours!=null
            ? routeInfo.hours
            : analysis.durationHours,
        themes:[...(analysis.themes||[])],
        mode:routeInfo?.detectedMode||analysis.mode||null
      };

      if(sessionState.lastRoute.placeIds.length) {
        sessionState.lastPlaceIds=[sessionState.lastRoute.placeIds[0]];
      }
    }

    return getContext();
  }

  function formatRouteResult(info, language) {
    const labels=SECTION_LABELS[language]||SECTION_LABELS.it;
    const modes=MODE_LABELS[language]||MODE_LABELS.it;
    const lines=[];
    const selected=info?.selected||[];

    if(selected.length)lines.push(labels.stops+": "+selected.map(placeName).join(" → "));
    if(info?.hours!=null)lines.push(labels.duration+": "+info.hours+" h");
    if(info?.detectedMode)lines.push(labels.mode+": "+(modes[info.detectedMode]||info.detectedMode));

    return lines.join("\n");
  }


  /* =========================================
     REPONSE DETAILLEE POI
     ========================================= */

  function enrichPlace(place) {

    const output = [];


    const summary =
      placeSummary(place);


    if (summary) {

      output.push(summary);
    }


    const pack =
      I18N[lang()]
      ||
      I18N.it;


    if (

      place?.cat

      &&

      pack.category
        ?.[place.cat]

    ) {

      output.push(
        `${pack.category[place.cat]}.`
      );
    }


    if (
      Number.isFinite(
        Number(place?.mins)
      )
    ) {

      output.push(
        `${pack.mins(
          Number(place.mins)
        )}.`
      );
    }


    if (

      Array.isArray(
        place?.tags
      )

      &&

      place.tags.length

    ) {

      output.push(
        `${place.tags
          .slice(0, 2)
          .join(", ")}.`
      );
    }


    return output.join(" ");
  }


  /* =========================================
     AUTOUR D'UN POI
     ========================================= */

  function nearbyFrom(
    origin,
    limit = 5
  ) {

    if (
      !hasCoords(origin)
    ) {

      return {
        pois: [],
        businesses: []
      };
    }


    const pois = (

      bridge
        ?.getPlaces
        ?.()

      ||

      []

    )

      .filter(
        place =>
          place.id !== origin.id
          &&
          hasCoords(place)
      )

      .map(
        place => ({
          ...place,

          _d:
            distanceKm(
              origin,
              place
            )
        })
      )

      .sort(
        (a, b) =>
          a._d - b._d
      )

      .slice(
        0,
        limit
      );


    /*
     * Optionnel :
     * fonctionne dès que nous ajoutons
     * une vraie base de commerces.
     */

    const businesses = (

      bridge
        ?.getBusinesses
        ?.()

      ||

      []

    )

      .filter(
        hasCoords
      )

      .map(
        business => ({
          ...business,

          _d:
            distanceKm(
              origin,
              business
            )
        })
      )

      .sort(
        (a, b) =>
          a._d - b._d
      )

      .slice(
        0,
        4
      );


    return {
      pois,
      businesses
    };
  }


  function formatNearby(
    origin,
    data
  ) {

    if (
      !hasCoords(origin)
    ) {

      return tr(
        "noCoords"
      );
    }


    const lines = [

      tr(
        "nearbyIntro",
        placeName(origin)
      )
    ];


    data.pois.forEach(
      place => {

        lines.push(
          `• ${placeName(place)} — ${place._d.toFixed(1)} km`
        );
      }
    );


    if (
      data.businesses.length
    ) {

      lines.push(
        "",
        tr(
          "businessesIntro"
        )
      );


      data.businesses.forEach(
        business => {

          lines.push(

            `• ${business.name} — ${business._d.toFixed(1)} km`

            +

            (
              business.type
                ? ` · ${business.type}`
                : ""
            )
          );
        }
      );
    }


    return lines.join(
      "\n"
    );
  }


  /* =========================================
     PLUSIEURS POI
     ========================================= */

  function multiAnswer(
    places
  ) {

    const lines = [
      tr("multiIntro")
    ];


    places
      .slice(0, 4)
      .forEach(
        place => {

          lines.push(

            `• ${placeName(place)} — ${enrichPlace(place)}`
          );
        }
      );


    return lines.join(
      "\n"
    );
  }


  /* =========================================
     MOTEUR
     ========================================= */

  async function execute(
    text
  ) {

    text=String(text||"").trim();

    if(!text) {
      return {
        ok:false,
        intent:"empty",
        intents:["empty"],
        language:lang(),
        text:tr("empty")
      };
    }

    const analysis=analyze(text);
    const previousLanguage=activeRequestLanguage;
    activeRequestLanguage=analysis.language;

    try {
      const labels=SECTION_LABELS[analysis.language]||SECTION_LABELS.it;
      const sections=[];
      const actions=[];
      let ok=true;
      let routeInfo=null;

      if(analysis.clarification) {
        return {
          ok:false,
          intent:"clarify",
          intents:[...(analysis.intents||[])],
          language:analysis.language,
          clarification:analysis.clarification,
          analysis,
          text:analysis.clarification.text
        };
      }

      if(analysis.intents.includes("scope")) {
        return {
          ok:true,
          intent:"scope",
          intents:["scope"],
          language:analysis.language,
          analysis,
          text:tr("scope")
        };
      }

      const appAnswer=appKnowledge(text);
      if(appAnswer && !analysis.intents.some(x=>["route","add","open","near_me","near_place"].includes(x))) {
        sections.push(appAnswer);
      }

      const comparePlaces=analysis.targets.compare?.length ? analysis.targets.compare : analysis.places;
      const tellPlaces=analysis.targets.tell?.length ? analysis.targets.tell : analysis.places;

      if(analysis.intents.includes("compare") && comparePlaces.length>=2) {
        sections.push(labels.compare+"\n"+multiAnswer(comparePlaces));
      } else if(analysis.intents.includes("tell") && tellPlaces.length) {
        if(tellPlaces.length===1) {
          const place=tellPlaces[0];
          sections.push(labels.about+" "+placeName(place)+"\n"+enrichPlace(place));
        } else {
          sections.push(multiAnswer(tellPlaces));
        }
      }

      if(analysis.intents.includes("near_me")) {
        await bridge?.nearMe?.();
        sections.push(labels.nearby+"\n"+tr("nearMe"));
        actions.push("near_me");
      }

      const nearbyPlaces=analysis.targets.near_place?.length ? analysis.targets.near_place : analysis.places;
      if(analysis.intents.includes("near_place") && nearbyPlaces.length) {
        const origin=nearbyPlaces[0];
        const data=nearbyFrom(origin);
        sections.push(labels.nearby+"\n"+formatNearby(origin,data));
        actions.push("near_place");
      }

      if(analysis.intents.includes("add") && !analysis.intents.includes("route")) {
        const addPlaces=analysis.targets.add?.length ? analysis.targets.add : analysis.places;
        if(!addPlaces.length) {
          sections.push(tr("noPlace"));
          ok=false;
        } else {
          for(const place of addPlaces.slice(0,4)) {
            await bridge?.addPlace?.(place.id,place);
          }
          sections.push(labels.action+"\n"+tr("add",addPlaces.slice(0,4).map(placeName).join(", ")));
          actions.push("add");
        }
      }

      const openPlaces=analysis.targets.open?.length ? analysis.targets.open : analysis.places;
      if(analysis.intents.includes("open") && openPlaces.length) {
        await bridge?.openPlace?.(openPlaces[0].id,openPlaces[0]);
        if(!analysis.intents.includes("tell")) {
          sections.push(labels.action+"\n"+tr("open",placeName(openPlaces[0])));
        }
        actions.push("open");
      }

      // Route is deliberately executed last so informational intentions are composed first.
      if(analysis.intents.includes("route")) {
        const routeTargets=
          analysis.targets?.route?.length
            ? analysis.targets.route
            : analysis.places;

        const result=await bridge?.createRouteFromText?.(
          analysis.bridgeText,
          {
            keepAssistantOpen:analysis.intents.length>1,
            intents:analysis.intents,
            routeRequest:{
              placeIds:routeTargets.map(place=>place.id).filter(Boolean),
              durationHours:analysis.durationHours,
              themes:[...(analysis.themes||[])],
              mode:analysis.mode||null
            }
          }
        );

        if(result?.ok) {
          routeInfo=result.info||null;
          const routeText=formatRouteResult(result.info,analysis.language) || result.text || result.spokenText || "";
          sections.push(labels.route+(routeText?"\n"+routeText:""));
          actions.push("route");
        } else {
          sections.push(labels.route+"\n"+tr("routeFail"));
          ok=false;
        }
      }

      if(!sections.length) {
        if(analysis.places.length>=2)sections.push(multiAnswer(analysis.places));
        else if(analysis.places.length===1)sections.push(enrichPlace(analysis.places[0]));
        else {
          sections.push(tr("unknown"));
          ok=false;
        }
      }

      const context=rememberTurn(analysis,routeInfo);

      return {
        ok,
        intent:analysis.intents.length>1?"composed":(analysis.intents[0]||"unknown"),
        intents:analysis.intents,
        actions,
        language:analysis.language,
        analysis,
        context,
        places:analysis.places,
        text:sections.filter(Boolean).join("\n\n")
      };

    } finally {
      activeRequestLanguage=previousLanguage;
    }
  }


  /* =========================================
     AFFICHAGE
     ========================================= */

  function show(text) {

    bridge
      ?.showResult
      ?.(
        tr("title"),
        text
      );
  }


  /* =========================================
     VOIX
     ========================================= */

  function stopSpeaking() {

    try {

      window
        .speechSynthesis
        ?.cancel();

    } catch (error) {}
  }


  function speak(text, languageOverride=null) {

    if (

      !text

      ||

      !(
        "speechSynthesis"
        in window
      )

      ||

      !(
        "SpeechSynthesisUtterance"
        in window
      )

    ) {

      return;
    }


    stopSpeaking();


    const utterance =
      new SpeechSynthesisUtterance(
        text
      );


    const speechLanguage=
      normalizeLanguageCode(languageOverride)
      ||
      lang();

    utterance.lang =
      LOCALES[speechLanguage]
      ||
      LOCALES.it;


    utterance.rate =
      0.96;


    const voices =
      window
        .speechSynthesis
        .getVoices?.()
      ||
      [];


    const voice =

      voices.find(
        item =>
          item.lang ===
          utterance.lang
      )

      ||

      voices.find(
        item =>
          (
            item.lang || ""
          )
            .toLowerCase()
            .startsWith(
              speechLanguage
            )
      );


    if (voice) {

      utterance.voice =
        voice;
    }


    window
      .speechSynthesis
      .speak(
        utterance
      );
  }


  /* =========================================
     QUESTION
     ========================================= */

  async function ask(
    text = getTranscript(),
    options = {}
  ) {

    /*
     * Evite qu'Aracne
     * écoute sa propre voix.
     */

    try {

      bridge
        ?.stopRecognition
        ?.();

    } catch (error) {}


    const result =
      await execute(
        text
      );


    if (
      options.show !== false
    ) {

      show(
        result.text
      );
    }


    if (
      options.speak !== false
    ) {

      speak(
        result.text,
        result.language
      );
    }


    return result;
  }


  /* =========================================
     EXPLICATION DANS LE MODAL
     ========================================= */

  function injectScopeHint() {

    const body =
      document.querySelector(
        ".assistant-body"
      );


    if (

      !body

      ||

      document.getElementById(
        "aracneScopeHint"
      )

    ) {

      return;
    }


    const hint =
      document.createElement(
        "div"
      );


    hint.id =
      "aracneScopeHint";


    hint.style.cssText =

      "margin:10px 0 14px;"

      +

      "padding:12px 14px;"

      +

      "border-radius:14px;"

      +

      "background:rgba(40,120,232,.08);"

      +

      "font-size:.82rem;"

      +

      "line-height:1.4";


    hint.textContent =
      tr("scope");


    const status =
      document.getElementById(
        "assistantStatus"
      );


    body.insertBefore(
      hint,
      status || body.firstChild
    );
  }


  /* =========================================
     BOUTON
     ========================================= */

  function updateUI() {

    const span =
      askButton
        ?.querySelector(
          "span"
        );


    if (span) {

      span.textContent =
        tr("ask");
    }


    const hint =
      document.getElementById(
        "aracneScopeHint"
      );


    if (hint) {

      hint.textContent =
        tr("scope");
    }
  }


  function ensureButton() {

    const actions =
      document.querySelector(
        ".assistant-actions"
      );


    if (!actions) {
      return;
    }


    askButton =
      document.getElementById(
        "assistantAsk"
      );


    if (!askButton) {

      askButton =
        document.createElement(
          "button"
        );


      askButton.id =
        "assistantAsk";


      askButton.type =
        "button";


      askButton.className =
        "assistant-action route";


      askButton.innerHTML =

        '<i class="fa-solid fa-wand-magic-sparkles"></i>'

        +

        "<span></span>";


      actions.appendChild(
        askButton
      );
    }


    if (
      !askButton
        .dataset
        .boundV3
    ) {

      askButton.addEventListener(
        "click",

        async () => {

          const span =
            askButton
              .querySelector(
                "span"
              );


          askButton.disabled =
            true;


          if (span) {

            span.textContent =
              tr("thinking");
          }


          try {

            await ask();

          } finally {

            askButton.disabled =
              false;


            updateUI();
          }
        }
      );


      askButton.dataset.boundV3 =
        "1";
    }


    updateUI();
  }


  /* =========================================
     CONNECTION
     ========================================= */

  function connect(
    appBridge
  ) {

    bridge =
      appBridge;


    currentLanguage =
      lang();


    ensureButton();

    injectScopeHint();


    document
      .querySelectorAll(
        ".voice-lang"
      )
      .forEach(
        button => {

          if (
            button.dataset
              .aracneV3Lang
          ) {

            return;
          }


          button.addEventListener(
            "click",

            () => {

              currentLanguage =

                button
                  .dataset
                  .voiceLang

                ||

                currentLanguage;


              setTimeout(
                updateUI,
                0
              );
            }
          );


          button.dataset
            .aracneV3Lang =
            "1";
        }
      );


    console.info(
      `[Aracne Intelligence] v${VERSION} connectée à HIRUNDU`
    );


    return true;
  }


  /* =========================================
     API
     ========================================= */

  window.AracneIntelligence = {

    version:
      VERSION,

    connect,

    ask,

    speak,

    stopSpeaking,

    execute,

    analyze,

    detectLanguage: detectTextLanguage,

    context: getContext,

    resetContext,

    status: () => ({

      version:
        VERSION,

      connected:
        !!bridge,

      language:
        lang(),

      places:
        bridge
          ?.getPlaces
          ?.()
          ?.length
        ||
        0,

      businesses:
        bridge
          ?.getBusinesses
          ?.()
          ?.length
        ||
        0
    })
  };


  if (
    window
      .aracneIntelligenceBridge
  ) {

    connect(
      window
        .aracneIntelligenceBridge
    );
  }

})();