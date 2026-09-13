(() => {
  "use strict";

  const VERSION = "0.4.0";

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
  let askButton = null;


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
        "Inizia da ciò che vuoi fare: «Crea o proponi un percorso…», «Parlami di…», «Cosa c’è vicino a…?» oppure «Aggiungi…». Puoi formulare la frase in modo naturale: Aracne prova a riconoscere l’intenzione, il luogo, il tema e la durata. Conosce i contenuti dell’app e non è ancora un assistente generalista su Internet.",

      unknown:
        "Non ho collegato bene la frase a un’azione. Prova a iniziare con «Crea/Proponi un percorso», «Parlami di», «Cosa c’è vicino a» o «Aggiungi», poi descrivi liberamente ciò che vuoi: per esempio «Vorrei una passeggiata nella natura di tre ore partendo da Lecce».",

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
        "Commence par ce que tu veux faire : «Crée ou propose un parcours…», «Parle-moi de…», «Qu’est-ce qu’il y a autour de… ?» ou «Ajoute…». Tu peux ensuite formuler la phrase naturellement : Aracne essaie d’identifier l’intention, le lieu, le thème et la durée. Elle connaît le contenu de l’app et n’est pas encore un assistant généraliste sur Internet.",

      unknown:
        "Je n’ai pas relié correctement ta phrase à une action. Commence par «Crée/Propose un parcours», «Parle-moi de», «Qu’est-ce qu’il y a autour de» ou «Ajoute», puis précise librement ce que tu veux : par exemple «J’aimerais une balade nature de trois heures en partant de Lecce».",

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
        "Start with what you want to do: “Create or suggest a route…”, “Tell me about…”, “What is around…?” or “Add…”. You can then phrase the request naturally: Aracne tries to identify the intent, place, theme and duration. It knows the app’s content and is not yet a general Internet assistant.",

      unknown:
        "I could not confidently connect that sentence to an action. Start with “Create/Suggest a route”, “Tell me about”, “What is around” or “Add”, then describe what you want naturally; for example: “I’d like a three-hour nature walk starting from Lecce”.",

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
        "Empieza por lo que quieres hacer: «Crea o propón una ruta…», «Háblame de…», «¿Qué hay cerca de…?» o «Añade…». Después puedes formular la frase de forma natural: Aracne intenta identificar la intención, el lugar, el tema y la duración. Conoce el contenido de la app y todavía no es un asistente generalista de Internet.",

      unknown:
        "No he relacionado bien la frase con una acción. Empieza con «Crea/Propón una ruta», «Háblame de», «¿Qué hay cerca de?» o «Añade», y después describe libremente lo que quieres; por ejemplo: «Me gustaría un paseo de naturaleza de tres horas saliendo de Lecce».",

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

  function lang() {

    const detected =
      bridge?.getVoiceLanguage?.()
      ||
      bridge?.getLanguage?.()
      ||
      currentLanguage;

    return LANGS.includes(detected)
      ? detected
      : "it";
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
        /[^a-z0-9\s-]/g,
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
     Intent scoring multilingue — IT / FR / EN / ES
     ========================================= */

  const INTENT_LEXICON = {
    it: {
      scope:["cosa puoi fare","cosa sai fare","come funziona","come puoi aiutarmi","aiutami a capire"],
      routeStrong:["percorso","itinerario","circuito","giro turistico"],
      routeSoft:["passeggiata","camminata","escursione","gita","tour","giornata","mezza giornata"],
      routeRequest:["crea","creami","prepara","proponi","organizza","fammi","fai","costruisci","vorrei","voglio","mi piacerebbe","consigliami","suggerisci","cosa posso fare","cosa fare"],
      origin:["partendo da","a partire da","con partenza da","da"],
      nearbyMe:["vicino a me","intorno a me","nei miei dintorni"],
      nearbyPlace:["vicino a","intorno a","nei dintorni di","nei pressi di","cosa c e vicino","cosa vedere vicino"],
      add:["aggiungi","aggiungere","inserisci","inserire","metti","includi","includere"],
      open:["apri","mostra","fammi vedere","visualizza"],
      tell:["raccontami","parlami di","parlami","dimmi di","spiegami","descrivimi","cosa sai di","cosa vedere a","cosa c e a"],
      compare:["confronta","confronto","differenza tra","meglio tra"]
    },
    fr: {
      scope:["que peux tu faire","qu est ce que tu fais","comment ca marche","comment peux tu m aider","a quoi sers tu"],
      routeStrong:["parcours","itineraire","circuit","circuit touristique"],
      routeSoft:["balade","promenade","excursion","sortie","visite","journee","demi journee","tour"],
      routeRequest:["cree","creer","propose","proposer","fais","faire","prepare","preparer","organise","organiser","construis","construire","je voudrais","j aimerais","je veux","suggere","suggerer","conseille moi","que faire","qu est ce que je peux faire"],
      origin:["en partant de","au depart de","a partir de","depuis"],
      nearbyMe:["autour de moi","pres de moi","a proximite de moi","dans les environs"],
      nearbyPlace:["autour de","pres de","a proximite de","aux alentours de","dans les environs de","qu est ce qu il y a autour de","que voir pres de"],
      add:["ajoute","ajouter","mets","mettre","insere","inserer","inclus","inclure"],
      open:["ouvre","ouvrir","montre","montre moi","affiche","fais moi voir"],
      tell:["parle moi de","raconte moi","dis moi","explique moi","decris moi","que sais tu de","que voir a","qu est ce qu il y a a"],
      compare:["compare","comparaison","difference entre","lequel choisir entre"]
    },
    en: {
      scope:["what can you do","what do you do","how does this work","how can you help me","what are you for"],
      routeStrong:["route","itinerary","circuit","travel plan"],
      routeSoft:["walk","walking tour","excursion","outing","day trip","half day","tour","trip"],
      routeRequest:["create","build","make","plan","suggest","recommend","prepare","organize","organise","i want","i would like","i d like","can you make","can you suggest","what can i do","what to do"],
      origin:["starting from","start from","departing from","from"],
      nearbyMe:["near me","around me","close to me","in my area"],
      nearbyPlace:["near","around","close to","nearby","what is around","what s around","what can i see near"],
      add:["add","include","insert","put"],
      open:["open","show","show me","display"],
      tell:["tell me about","tell me","explain","describe","what do you know about","what to see in","what is in"],
      compare:["compare","comparison","difference between","which is better"]
    },
    es: {
      scope:["que puedes hacer","que sabes hacer","como funciona","como puedes ayudarme","para que sirves"],
      routeStrong:["ruta","itinerario","recorrido","circuito"],
      routeSoft:["paseo","caminata","excursion","salida","visita","dia","medio dia","tour"],
      routeRequest:["crea","crear","propon","propone","proponer","haz","hacer","prepara","organiza","organizar","construye","quiero","me gustaria","recomiendame","sugiere","sugerir","que puedo hacer","que hacer"],
      origin:["saliendo de","partiendo de","a partir de","desde"],
      nearbyMe:["cerca de mi","a mi alrededor","en mis alrededores"],
      nearbyPlace:["cerca de","alrededor de","en los alrededores de","proximo a","que hay cerca de","que ver cerca de"],
      add:["anade","añade","anadir","añadir","agrega","agregar","incluye","incluir","inserta"],
      open:["abre","abrir","muestra","muestrame","ensena","enseñame"],
      tell:["hablame de","háblame de","cuentame","cuéntame","dime","explicame","explícame","describe","que sabes de","que ver en","que hay en"],
      compare:["compara","comparacion","comparación","diferencia entre","cual elegir entre"]
    }
  };

  const NUMBER_WORDS = {
    it:{uno:"1",una:"1",un:"1",due:"2",tre:"3",quattro:"4",cinque:"5",sei:"6",sette:"7",otto:"8"},
    fr:{un:"1",une:"1",deux:"2",trois:"3",quatre:"4",cinq:"5",six:"6",sept:"7",huit:"8"},
    en:{one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8"},
    es:{uno:"1",una:"1",un:"1",dos:"2",tres:"3",cuatro:"4",cinco:"5",seis:"6",siete:"7",ocho:"8"}
  };

  function phraseCount(n, phrases) {
    let count=0;
    for(const phrase of phrases||[]) {
      const p=normalize(phrase);
      if(p && n.includes(p)) count++;
    }
    return count;
  }

  function hasDurationSignal(n) {
    return /\b\d+(?:[\.,]\d+)?\s*(?:h|ore|ora|heures?|heure|hours?|hour|horas?|hora|min|mins|minutes?|minuti|minutos?)\b/.test(n)
      || /\b(mezza giornata|demi journee|half day|medio dia|giornata intera|journee entiere|full day|dia entero)\b/.test(n)
      || /\b(uno|una|un|due|tre|quattro|cinque|sei|sette|otto|deux|trois|quatre|cinq|six|sept|huit|one|two|three|four|five|seven|eight|dos|tres|cuatro|cinco|seis|siete|ocho)\s+(?:ore|ora|heures?|hours?|horas?)\b/.test(n);
  }

  function hasThemeSignal(n) {
    return /\b(natura|nature|natural|mare|mer|sea|mar|spiaggia|plage|beach|playa|cultura|culture|storia|histoire|history|historia|arte|food|cibo|cucina|gastronomia|saveurs|flavours|flavors|sabores|comida|tramonto|sunset|atardecer|coucher de soleil)\b/.test(n);
  }

  function genericPlaceQuestion(n) {
    return /\b(che cosa c e|cosa c e|cosa vedere|qu est ce qu il y a|que voir|quoi voir|what is there|what s there|what to see|que hay|que ver)\b/.test(n);
  }

  function normalizeNumberWordsForBridge(text) {
    let out=normalize(text);
    const maps=[NUMBER_WORDS[lang()]||{},NUMBER_WORDS.it,NUMBER_WORDS.fr,NUMBER_WORDS.en,NUMBER_WORDS.es];
    const merged=Object.assign({},...maps);
    for(const [word,digit] of Object.entries(merged)) {
      out=out.replace(new RegExp("\\b"+word+"\\b","g"),digit);
    }
    return out;
  }

  function understand(text, knownPlaces=null) {
    const n=normalize(text);
    const places=Array.isArray(knownPlaces)?knownPlaces:getPlaces(text);
    const l=INTENT_LEXICON[lang()]||INTENT_LEXICON.it;

    const scores={
      scope:0,
      route:0,
      near_me:0,
      near_place:0,
      add:0,
      open:0,
      tell:0,
      compare:0
    };

    scores.scope += phraseCount(n,l.scope)*8;
    scores.add += phraseCount(n,l.add)*7;
    scores.open += phraseCount(n,l.open)*6;
    scores.tell += phraseCount(n,l.tell)*6;
    scores.compare += phraseCount(n,l.compare)*6;
    scores.near_me += phraseCount(n,l.nearbyMe)*9;
    scores.near_place += phraseCount(n,l.nearbyPlace)*6;

    const strongRoute=phraseCount(n,l.routeStrong);
    const softRoute=phraseCount(n,l.routeSoft);
    const requestRoute=phraseCount(n,l.routeRequest);
    const originCue=phraseCount(n,l.origin);

    scores.route += strongRoute*5;
    scores.route += softRoute*3;
    scores.route += requestRoute*2.5;
    scores.route += originCue ? 1 : 0;
    scores.route += hasDurationSignal(n) ? 2 : 0;
    scores.route += hasThemeSignal(n) ? 1 : 0;
    scores.route += places.length ? 0.5 : 0;

    // A natural request can imply a route even without saying "route/parcours".
    if(requestRoute && hasDurationSignal(n) && (hasThemeSignal(n)||places.length)) {
      scores.route += 2;
    }

    if(genericPlaceQuestion(n) && places.length) {
      scores.tell += 4;
    }

    if(places.length>=2 && scores.compare>0) {
      scores.compare += 2;
    }

    // "Around X" can appear in a route request. Explicit route cues win.
    if(scores.route>=5 && (strongRoute||requestRoute)) {
      scores.near_place=Math.min(scores.near_place,5);
    }

    const priority=["scope","add","route","near_me","near_place","open","compare","tell"];
    let intent="unknown";
    let bestScore=0;

    for(const candidate of priority) {
      const score=scores[candidate]||0;
      if(score>bestScore) {
        bestScore=score;
        intent=candidate;
      }
    }

    const minimum={
      scope:6,
      add:5,
      route:4.5,
      near_me:6,
      near_place:5,
      open:5,
      compare:5,
      tell:4
    };

    if(intent!=="unknown" && bestScore<(minimum[intent]||5)) {
      intent="unknown";
    }

    return {
      intent,
      confidence:Math.min(1,bestScore/10),
      score:bestScore,
      scores,
      places,
      signals:{
        duration:hasDurationSignal(n),
        theme:hasThemeSignal(n),
        origin:originCue>0,
        strongRoute:strongRoute>0,
        requestRoute:requestRoute>0
      }
    };
  }

  function isCapabilities(text){return understand(text).intent==="scope";}
  function isNearMe(text){return understand(text).intent==="near_me";}
  function isNearbyPlace(text){return understand(text).intent==="near_place";}
  function isRoute(text){return understand(text).intent==="route";}
  function isAdd(text){return understand(text).intent==="add";}
  function isOpen(text){return understand(text).intent==="open";}
  function isCompare(text){return understand(text).intent==="compare";}


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

    text =
      String(
        text || ""
      ).trim();


    if (!text) {

      return {
        ok: false,
        intent: "empty",
        text: tr("empty")
      };
    }


    const places =
      getPlaces(text);

    const understanding =
      understand(text, places);

    const intent =
      understanding.intent;

    const appAnswer =
      appKnowledge(text);


    /*
     * Que peux-tu faire ?
     */

    if (
      intent === "scope"
    ) {

      return {
        ok: true,
        intent: "scope",
        text: tr("scope")
      };
    }


    /*
     * Questions sur HIRUNDU
     */

    if (
      appAnswer
      &&
      !["route","add","open","near_me","near_place"].includes(intent)
    ) {

      return {
        ok: true,
        intent: "app_knowledge",
        text: appAnswer
      };
    }


    /*
     * Autour de moi
     */

    if (
      intent === "near_me"
    ) {

      await bridge
        ?.nearMe
        ?.();


      return {
        ok: true,
        intent: "near_me",
        text: tr("nearMe")
      };
    }


    /*
     * Autour d'un POI précis
     */

    if (

      intent === "near_place"

      &&

      places.length

    ) {

      const origin =
        places[0];


      const data =
        nearbyFrom(
          origin
        );


      return {

        ok: true,

        intent:
          "near_place",

        place:
          origin,

        data,

        text:
          formatNearby(
            origin,
            data
          )
      };
    }


    /*
     * Créer parcours
     */

    if (
      intent === "route"
    ) {

      const result =
        await bridge
          ?.createRouteFromText
          ?.(normalizeNumberWordsForBridge(text));


      if (
        result?.ok
      ) {

        return {

          ok: true,

          intent:
            "route",

          confidence:
            understanding.confidence,

          analysis:
            understanding,

          text:
            result.spokenText
            ||
            result.text
        };
      }


      return {

        ok: false,

        intent:
          "route",

        text:
          tr("routeFail")
      };
    }


    /*
     * Ajouter un ou plusieurs lieux
     */

    if (
      intent === "add"
    ) {

      if (
        !places.length
      ) {

        return {

          ok: false,

          intent:
            "add",

          text:
            tr("noPlace")
        };
      }


      /*
       * Maximum 4 dans une commande
       */

      for (
        const place
        of places.slice(0, 4)
      ) {

        await bridge
          ?.addPlace
          ?.(
            place.id,
            place
          );
      }


      return {

        ok: true,

        intent:
          "add",

        text:
          tr(
            "add",

            places
              .slice(0, 4)
              .map(placeName)
              .join(", ")
          )
      };
    }


    /*
     * Ouvrir
     */

    if (
      intent === "open"
    ) {

      if (
        !places.length
      ) {

        return {

          ok: false,

          intent:
            "open",

          text:
            tr("noPlace")
        };
      }


      await bridge
        ?.openPlace
        ?.(
          places[0].id,
          places[0]
        );


      return {

        ok: true,

        intent:
          "open",

        text:
          tr(
            "open",
            placeName(
              places[0]
            )
          )
      };
    }


    /*
     * Plusieurs POI dans la question
     */

    if (

      (
        intent === "compare"
        &&
        places.length >= 2
      )

      ||

      places.length >= 2

    ) {

      return {

        ok: true,

        intent:
          "multi",

        places,

        text:
          multiAnswer(
            places
          )
      };
    }


    /*
     * Un seul lieu
     */

    if (
      places.length === 1
    ) {

      return {

        ok: true,

        intent:
          "tell",

        place:
          places[0],

        text:
          enrichPlace(
            places[0]
          )
      };
    }


    /*
     * Question hors périmètre
     */

    return {

      ok: false,

      intent:
        "unknown",

      text:
        tr("unknown")
    };
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


  function speak(text) {

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


    utterance.lang =
      LOCALES[lang()]
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
              lang()
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
        result.text
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

    analyze: text => understand(text, getPlaces(text)),

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