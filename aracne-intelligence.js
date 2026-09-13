/**
 * IL VOLO D'ARACNE — ARACNE INTELLIGENCE
 * Version 0.2.0
 *
 * Moteur local :
 * - compréhension d'intentions
 * - accès aux vrais POI HIRUNDU
 * - actions sur l'application
 * - réponse écrite
 * - réponse vocale
 *
 * Aucun LLM.
 * Aucune clé API.
 */

(() => {
  "use strict";

  const VERSION = "0.2.0";

  const LANGS = ["it", "fr", "en", "es"];

  const LOCALES = {
    it: "it-IT",
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES"
  };

  let bridge = null;
  let currentLanguage = "it";
  let askButton = null;
  let speaking = false;

  const I18N = {

    it: {
      ask: "Chiedi ad Aracne",
      thinking: "Aracne sta tessendo…",
      empty: "Scrivi o detta prima una domanda.",

      unknown:
        "Non ho ancora capito bene la richiesta. Puoi chiedermi di raccontarti un luogo, aprirlo, aggiungerlo al percorso, cercare cosa c’è vicino o creare un itinerario.",

      no_place:
        "Non ho trovato un luogo preciso nella tua richiesta.",

      preparing_add: name =>
        `Preparo ${name} per il tuo percorso.`,

      opening: name =>
        `Ti mostro ${name}.`,

      nearby:
        "Cerco i luoghi più vicini a te.",

      route_ok:
        "Ho preparato un itinerario con le tue indicazioni.",

      route_fail:
        "Non ho abbastanza indicazioni per creare il percorso. Prova a indicare un luogo, un tema, il tempo disponibile o il mezzo.",

      help:
        "Puoi chiedermi informazioni su un luogo, aprire un luogo, aggiungere una tappa, cercare cosa c’è vicino a te oppure creare un percorso.",

      no_voice:
        "La sintesi vocale non è disponibile su questo dispositivo.",

      title: "Aracne"
    },

    fr: {
      ask: "Demander à Aracne",
      thinking: "Aracne tisse sa réponse…",
      empty: "Écris ou dicte d’abord une question.",

      unknown:
        "Je n’ai pas encore bien compris la demande. Tu peux me demander de raconter un lieu, de l’ouvrir, de l’ajouter au parcours, de chercher ce qu’il y a autour de toi ou de créer un itinéraire.",

      no_place:
        "Je n’ai pas trouvé de lieu précis dans ta demande.",

      preparing_add: name =>
        `Je prépare ${name} pour ton parcours.`,

      opening: name =>
        `Je t’ouvre ${name}.`,

      nearby:
        "Je cherche les lieux les plus proches autour de toi.",

      route_ok:
        "J’ai préparé un itinéraire à partir de tes indications.",

      route_fail:
        "Je n’ai pas assez d’indications pour créer le parcours. Indique un lieu, un thème, le temps disponible ou le moyen de transport.",

      help:
        "Tu peux me demander des informations sur un lieu, ouvrir un lieu, ajouter une étape, chercher ce qu’il y a autour de toi ou créer un parcours.",

      no_voice:
        "La synthèse vocale n’est pas disponible sur cet appareil.",

      title: "Aracne"
    },

    en: {
      ask: "Ask Aracne",
      thinking: "Aracne is weaving…",
      empty: "Type or dictate a question first.",

      unknown:
        "I did not fully understand the request yet. You can ask me about a place, open it, add it to your route, find what is nearby, or create an itinerary.",

      no_place:
        "I could not identify a specific place in your request.",

      preparing_add: name =>
        `I am preparing ${name} for your route.`,

      opening: name =>
        `I am opening ${name}.`,

      nearby:
        "I am looking for the nearest places around you.",

      route_ok:
        "I prepared an itinerary from your instructions.",

      route_fail:
        "I do not have enough information to create the route. Try naming a place, a theme, the time available, or your transport mode.",

      help:
        "You can ask me about a place, open a place, add a stop, find what is nearby, or create a route.",

      no_voice:
        "Speech synthesis is not available on this device.",

      title: "Aracne"
    },

    es: {
      ask: "Preguntar a Aracne",
      thinking: "Aracne está tejiendo…",
      empty: "Escribe o dicta primero una pregunta.",

      unknown:
        "Todavía no he entendido bien la petición. Puedes preguntarme por un lugar, abrirlo, añadirlo a la ruta, buscar qué hay cerca o crear un itinerario.",

      no_place:
        "No he encontrado un lugar concreto en tu petición.",

      preparing_add: name =>
        `Preparo ${name} para tu ruta.`,

      opening: name =>
        `Te muestro ${name}.`,

      nearby:
        "Busco los lugares más cercanos a ti.",

      route_ok:
        "He preparado un itinerario con tus indicaciones.",

      route_fail:
        "No tengo suficientes indicaciones para crear la ruta. Indica un lugar, un tema, el tiempo disponible o el medio de transporte.",

      help:
        "Puedes preguntarme por un lugar, abrir un lugar, añadir una etapa, buscar qué hay cerca o crear una ruta.",

      no_voice:
        "La síntesis de voz no está disponible en este dispositivo.",

      title: "Aracne"
    }
  };


  /* =========================================
     LANGUE
     ========================================= */

  function getLanguage() {

    const detected =
      bridge?.getVoiceLanguage?.() ||
      bridge?.getLanguage?.() ||
      currentLanguage;

    return LANGS.includes(detected)
      ? detected
      : "it";
  }


  function tr(key, ...args) {

    const pack =
      I18N[getLanguage()] ||
      I18N.it;

    const value = pack[key];

    return typeof value === "function"
      ? value(...args)
      : value;
  }


  /* =========================================
     TEXTE
     ========================================= */

  function normalize(value = "") {

    return String(value)

      .toLowerCase()

      .normalize("NFD")

      .replace(/[\u0300-\u036f]/g, "")

      .replace(/[’']/g, " ")

      .replace(/[^a-z0-9\s-]/g, " ")

      .replace(/\s+/g, " ")

      .trim();
  }


  function getTranscript() {

    const external =
      bridge?.getTranscript?.();

    if (typeof external === "string") {
      return external.trim();
    }

    return (
      document
        .getElementById("assistantTranscript")
        ?.value || ""
    ).trim();
  }


  /* =========================================
     POI / KNOWLEDGE
     ========================================= */

  function getPlaces(text) {

    try {

      if (bridge?.findPlaces) {

        const result =
          bridge.findPlaces(text);

        if (Array.isArray(result)) {
          return result.filter(Boolean);
        }
      }

    } catch (error) {

      console.warn(
        "[Aracne Intelligence] findPlaces",
        error
      );
    }


    const allPlaces =
      bridge?.getPlaces?.() || [];

    const n =
      normalize(text);


    return allPlaces.filter(place => {

      const id =
        normalize(place?.id || "");

      const name =
        normalize(place?.name || "");


      return (
        (id && n.includes(id)) ||
        (
          name.length > 3 &&
          n.includes(name)
        )
      );
    });
  }


  function placeName(place) {

    return (
      place?.name ||
      place?.title?.[getLanguage()] ||
      place?.title?.it ||
      place?.id ||
      ""
    );
  }


  function placeSummary(place) {

    if (!place) return "";

    const language =
      getLanguage();


    return (

      place?.text?.[language] ||

      place?.text?.it ||

      place?.summary?.[language] ||

      place?.summary?.it ||

      ""

    ).trim();
  }


  /* =========================================
     INTENTIONS
     ========================================= */

  function detectIntent(rawText) {

    const n =
      normalize(rawText);


    if (!n) {
      return "empty";
    }


    /* HELP */

    if (

      /^(aiuto|aide|help|ayuda)\b/.test(n) ||

      /\b(cosa posso fare|que puis je faire|what can i do|que puedo hacer)\b/.test(n)

    ) {

      return "help";
    }


    /* AUTOUR DE MOI */

    if (

      /\b(vicino a me|intorno a me|autour de moi|pres de moi|a proximite|near me|nearby|around me|cerca de mi|a mi alrededor)\b/.test(n)

    ) {

      return "nearby";
    }


    /* CREER UN PARCOURS */

    if (

      /\b(crea|creami|prepara|fammi|fai|costruisci|cree|creer|prepare|preparer|fais|construis|create|build|make|plan|haz)\b.*\b(percorso|itinerario|route|itineraire|itinerary|ruta)\b/.test(n)

    ) {

      return "route";
    }


    /* AJOUTER */

    if (

      /\b(aggiungi|aggiungere|inserisci|ajoute|ajouter|mets|add|include|anade|añade|agrega)\b/.test(n)

    ) {

      return "add";
    }


    /* OUVRIR */

    if (

      /\b(apri|mostra|fammi vedere|ouvre|montre|affiche|open|show|abre|muestra)\b/.test(n)

    ) {

      return "open";
    }


    /* RACONTER */

    if (

      /\b(raccontami|parlami|dimmi|cos e|cosa e|raconte moi|parle moi|dis moi|qu est ce que|tell me|what is|what s|cuentame|hablame|que es)\b/.test(n)

    ) {

      return "tell";
    }


    /* SI UN POI EST DIRECTEMENT CITE */

    if (
      getPlaces(rawText).length
    ) {

      return "tell";
    }


    return "unknown";
  }


  /* =========================================
     VOIX
     ========================================= */

  function stopSpeaking() {

    if (
      "speechSynthesis" in window
    ) {

      window
        .speechSynthesis
        .cancel();
    }

    speaking = false;
  }


  function chooseVoice(language) {

    if (
      !("speechSynthesis" in window)
    ) {

      return null;
    }


    const voices =
      window
        .speechSynthesis
        .getVoices() || [];


    const locale =
      LOCALES[language] ||
      LOCALES.it;


    return (

      voices.find(
        voice =>
          voice.lang === locale
      )

      ||

      voices.find(
        voice =>
          (voice.lang || "")
            .toLowerCase()
            .startsWith(
              language.toLowerCase()
            )
      )

      ||

      null
    );
  }


  function speak(text, options = {}) {

    return new Promise(resolve => {

      if (!text) {
        return resolve(false);
      }


      if (

        !(
          "speechSynthesis" in window
        )

        ||

        !(
          "SpeechSynthesisUtterance" in window
        )

      ) {

        bridge?.toast?.(
          tr("no_voice")
        );

        return resolve(false);
      }


      stopSpeaking();


      const language =
        options.lang ||
        getLanguage();


      const utterance =
        new SpeechSynthesisUtterance(
          text
        );


      utterance.lang =
        LOCALES[language] ||
        LOCALES.it;


      utterance.rate =
        options.rate ?? 0.96;


      utterance.pitch =
        options.pitch ?? 1;


      utterance.volume =
        options.volume ?? 1;


      const voice =
        chooseVoice(language);


      if (voice) {

        utterance.voice =
          voice;
      }


      speaking = true;


      utterance.onend = () => {

        speaking = false;

        resolve(true);
      };


      utterance.onerror = () => {

        speaking = false;

        resolve(false);
      };


      window
        .speechSynthesis
        .speak(
          utterance
        );
    });
  }


  /* =========================================
     AFFICHAGE
     ========================================= */

  function show(text) {

    if (
      bridge?.showResult
    ) {

      bridge.showResult(
        tr("title"),
        text
      );

      return;
    }


    const title =
      document.getElementById(
        "assistantResultTitle"
      );


    const body =
      document.getElementById(
        "assistantResultText"
      );


    const box =
      document.getElementById(
        "assistantResult"
      );


    if (title) {
      title.textContent =
        tr("title");
    }


    if (body) {
      body.textContent =
        text;
    }


    if (box) {
      box.classList.add(
        "show"
      );
    }
  }


  /* =========================================
     EXECUTION
     ========================================= */

  async function execute(rawText) {

    const intent =
      detectIntent(rawText);


    const places =
      getPlaces(rawText);


    const place =
      places[0] || null;


    switch (intent) {


      case "empty":

        return {

          ok: false,

          intent,

          text:
            tr("empty")

        };


      case "help":

        return {

          ok: true,

          intent,

          text:
            tr("help")

        };


      case "nearby":

        try {

          await bridge?.nearMe?.();

        } catch (error) {

          console.warn(
            "[Aracne Intelligence] nearMe",
            error
          );
        }


        return {

          ok: true,

          intent,

          text:
            tr("nearby")

        };


      case "route": {

        if (
          !bridge?.createRouteFromText
        ) {

          return {

            ok: false,

            intent,

            text:
              tr("route_fail")

          };
        }


        try {

          const result =
            await bridge
              .createRouteFromText(
                rawText
              );


          if (
            !result?.ok
          ) {

            return {

              ok: false,

              intent,

              text:
                tr("route_fail"),

              result

            };
          }


          return {

            ok: true,

            intent,

            text:
              result.spokenText ||
              result.text ||
              tr("route_ok"),

            result

          };


        } catch (error) {

          console.warn(
            "[Aracne Intelligence] route",
            error
          );


          return {

            ok: false,

            intent,

            text:
              tr("route_fail")

          };
        }
      }


      case "add":

        if (!place) {

          return {

            ok: false,

            intent,

            text:
              tr("no_place")

          };
        }


        try {

          await bridge?.addPlace?.(
            place.id,
            place
          );


          return {

            ok: true,

            intent,

            place,

            text:
              tr(
                "preparing_add",
                placeName(place)
              )

          };


        } catch (error) {

          console.warn(
            "[Aracne Intelligence] add",
            error
          );


          return {

            ok: false,

            intent,

            place,

            text:
              tr("no_place")

          };
        }


      case "open":

        if (!place) {

          return {

            ok: false,

            intent,

            text:
              tr("no_place")

          };
        }


        try {

          await bridge?.openPlace?.(
            place.id,
            place
          );


          return {

            ok: true,

            intent,

            place,

            text:
              tr(
                "opening",
                placeName(place)
              )

          };


        } catch (error) {

          console.warn(
            "[Aracne Intelligence] open",
            error
          );


          return {

            ok: false,

            intent,

            place,

            text:
              tr("no_place")

          };
        }


      case "tell":

        if (!place) {

          return {

            ok: false,

            intent,

            text:
              tr("no_place")

          };
        }


        return {

          ok: true,

          intent,

          place,

          text:
            placeSummary(place) ||
            tr("no_place")

        };


      default:

        return {

          ok: false,

          intent: "unknown",

          text:
            tr("unknown")

        };
    }
  }


  /* =========================================
     ASK
     ========================================= */

  async function ask(
    rawText,
    options = {}
  ) {

    const text =
      String(
        rawText ??
        getTranscript()
      ).trim();


    /*
     * Très important :
     * on coupe le micro avant
     * qu'Aracne parle.
     *
     * Sinon elle risque d'écouter
     * sa propre voix.
     */

    try {

      bridge
        ?.stopRecognition
        ?.();

    } catch (_) {}


    const result =
      await execute(text);


    if (
      options.show !== false
    ) {

      show(
        result.text
      );
    }


    if (

      options.speak !== false

      &&

      result.text

    ) {

      await speak(
        result.text,
        {
          lang:
            options.lang ||
            getLanguage()
        }
      );
    }


    return result;
  }


  /* =========================================
     BOUTON
     ========================================= */

  function updateButtonLabel() {

    if (!askButton) {
      return;
    }


    const span =
      askButton.querySelector(
        "span"
      );


    if (span) {

      span.textContent =
        tr("ask");
    }
  }


  function setButtonBusy(
    busy
  ) {

    if (!askButton) {
      return;
    }


    askButton.disabled =
      !!busy;


    const span =
      askButton.querySelector(
        "span"
      );


    if (!span) {
      return;
    }


    span.textContent =
      busy
        ? tr("thinking")
        : tr("ask");
  }


  async function onAskClick() {

    const text =
      getTranscript();


    if (!text) {

      bridge?.toast?.(
        tr("empty")
      );

      show(
        tr("empty")
      );

      return;
    }


    setButtonBusy(true);


    try {

      await ask(
        text,
        {
          show: true,
          speak: true
        }
      );


    } catch (error) {

      console.error(
        "[Aracne Intelligence]",
        error
      );


      show(
        tr("unknown")
      );


    } finally {

      setButtonBusy(false);
    }
  }


  function ensureAskButton() {

    const actions =
      document.querySelector(
        ".assistant-actions"
      );


    if (!actions) {

      return null;
    }


    let button =
      document.getElementById(
        "assistantAsk"
      );


    if (!button) {

      button =
        document.createElement(
          "button"
        );


      button.className =
        "assistant-action route";


      button.id =
        "assistantAsk";


      button.type =
        "button";


      button.innerHTML = `
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span></span>
      `;


      actions.appendChild(
        button
      );
    }


    askButton =
      button;


    updateButtonLabel();


    if (
      !button.dataset
        .aracneIntelligenceBound
    ) {

      button.addEventListener(
        "click",
        onAskClick
      );


      button.dataset
        .aracneIntelligenceBound =
        "1";
    }


    return button;
  }


  /* =========================================
     CONNECTION A HIRUNDU
     ========================================= */

  function connect(
    appBridge
  ) {

    if (
      !appBridge ||
      typeof appBridge !== "object"
    ) {

      console.error(
        "[Aracne Intelligence] Bridge HIRUNDU manquant."
      );

      return false;
    }


    bridge =
      appBridge;


    const language =

      bridge
        .getVoiceLanguage
        ?.()

      ||

      bridge
        .getLanguage
        ?.();


    if (
      LANGS.includes(
        language
      )
    ) {

      currentLanguage =
        language;
    }


    ensureAskButton();


    /*
     * Mise à jour du texte du bouton
     * quand l'utilisateur change
     * la langue vocale.
     */

    document
      .querySelectorAll(
        ".voice-lang"
      )
      .forEach(button => {

        if (
          button.dataset
            .aracneIntelligenceLangBound
        ) {

          return;
        }


        button.addEventListener(
          "click",
          () => {

            currentLanguage =
              button.dataset
                .voiceLang
              ||
              currentLanguage;


            setTimeout(
              updateButtonLabel,
              0
            );
          }
        );


        button.dataset
          .aracneIntelligenceLangBound =
          "1";
      });


    console.info(
      `[Aracne Intelligence] v${VERSION} connectée à HIRUNDU`
    );


    return true;
  }


  /* =========================================
     API PUBLIQUE
     ========================================= */

  function setLanguage(
    language
  ) {

    if (
      LANGS.includes(
        language
      )
    ) {

      currentLanguage =
        language;


      updateButtonLabel();
    }


    return currentLanguage;
  }


  function status() {

    return {

      version:
        VERSION,

      connected:
        !!bridge,

      language:
        getLanguage(),

      speaking,

      places:
        bridge
          ?.getPlaces
          ?.()
          ?.length
        ??
        0

    };
  }


  window.AracneIntelligence = {

    version:
      VERSION,

    connect,

    ask,

    speak,

    stopSpeaking,

    detectIntent,

    setLanguage,

    status
  };


  /*
   * Si le bridge existe déjà,
   * connexion immédiate.
   */

  if (
    window
      .aracneIntelligenceBridge
  ) {

    connect(
      window
        .aracneIntelligenceBridge
    );
  }


  /*
   * Sinon on réessaie
   * au chargement du DOM.
   */

  else {

    document.addEventListener(
      "DOMContentLoaded",
      () => {

        if (

          window
            .aracneIntelligenceBridge

          &&

          !bridge

        ) {

          connect(
            window
              .aracneIntelligenceBridge
          );
        }
      }
    );
  }

})();