(() => {
  "use strict";

  const VERSION = "0.3.0";

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
     COMPREHENSION
     ========================================= */

  function isCapabilities(text) {

    return /\b(que peux tu faire|qu est ce que tu fais|comment ca marche|cosa puoi fare|cosa sai fare|what can you do|what do you do|que puedes hacer|como funciona)\b/
      .test(
        normalize(text)
      );
  }


  function isNearMe(text) {

    return /\b(autour de moi|pres de moi|a proximite de moi|vicino a me|intorno a me|near me|around me|cerca de mi|a mi alrededor)\b/
      .test(
        normalize(text)
      );
  }


  function isNearbyPlace(text) {

    return /\b(autour de|pres de|a proximite de|vicino a|intorno a|near|around|close to|cerca de|alrededor de)\b/
      .test(
        normalize(text)
      );
  }


  function isRoute(text) {

    const n =
      normalize(text);


    return (

      /\b(percorso|itinerario|route|itineraire|itinerary|ruta)\b/
        .test(n)

      &&

      /\b(crea|creami|prepara|fammi|fai|costruisci|cree|creer|prepare|fais|create|build|make|plan|haz)\b/
        .test(n)
    );
  }


  function isAdd(text) {

    return /\b(aggiungi|aggiungere|inserisci|ajoute|ajouter|mets|add|include|anade|añade|agrega)\b/
      .test(
        normalize(text)
      );
  }


  function isOpen(text) {

    return /\b(apri|mostra|fammi vedere|ouvre|montre|affiche|open|show|abre|muestra)\b/
      .test(
        normalize(text)
      );
  }


  function isCompare(text) {

    return /\b(compare|compara|confronta|difference|differenza|différence|entre|between)\b/
      .test(
        normalize(text)
      );
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


    const appAnswer =
      appKnowledge(text);


    /*
     * Que peux-tu faire ?
     */

    if (
      isCapabilities(text)
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

    if (appAnswer) {

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
      isNearMe(text)
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

      isNearbyPlace(text)

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
      isRoute(text)
    ) {

      const result =
        await bridge
          ?.createRouteFromText
          ?.(text);


      if (
        result?.ok
      ) {

        return {

          ok: true,

          intent:
            "route",

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
      isAdd(text)
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
      isOpen(text)
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
        isCompare(text)
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