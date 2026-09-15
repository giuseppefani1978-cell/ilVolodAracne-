(() => {
  "use strict";

  const DATA = {
    "version": "0.9.0",
    "updated": "2026-09-15",
    "languages": [
      "it",
      "fr",
      "en",
      "es"
    ],
    "policy": {
      "sourcePriority": [
        "institutional",
        "official-tourism",
        "protected-area",
        "curated-tourism"
      ],
      "dynamicFacts": "Opening hours, prices, events and temporary access conditions must be treated as volatile and verified before being presented as current.",
      "legendRule": "Myths and traditions are explicitly labelled as such and are never presented as established historical fact."
    },
    "sources": {
      "italia-otranto-castle": {
        "title": "Aragonese Castle, Otranto",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/otranto/monuments/aragonese-castle"
      },
      "visit-badisco": {
        "title": "Porto Badisco",
        "publisher": "Visit Puglia",
        "type": "curated-tourism",
        "url": "https://visit.puglia.it/en/porto-badisco"
      },
      "visit-cervi": {
        "title": "Grotta dei Cervi",
        "publisher": "Visit Puglia",
        "type": "curated-tourism",
        "url": "https://visit.puglia.it/en/grotta-dei-cervi"
      },
      "visit-zinzulusa": {
        "title": "Grotta Zinzulusa",
        "publisher": "Visit Puglia",
        "type": "curated-tourism",
        "url": "https://visit.puglia.it/en/zinzulusa-cave"
      },
      "wwf-cesine": {
        "title": "Le Cesine",
        "publisher": "WWF Italia",
        "type": "protected-area",
        "url": "https://www.wwf.it/dove-interveniamo/il-nostro-lavoro-in-italia/oasi/le-cesine/"
      },
      "nardo-porto-selvaggio": {
        "title": "Parco Naturale di Porto Selvaggio",
        "publisher": "Comune di Nardò",
        "type": "institutional",
        "url": "https://www.comune.nardo.le.it/informazione/parco-naturale-di-porto-selvaggio/"
      },
      "fai-cerrate": {
        "title": "Abbazia di Santa Maria di Cerrate",
        "publisher": "FAI – Fondo per l'Ambiente Italiano",
        "type": "institutional",
        "url": "https://fondoambiente.it/luoghi/abbazia-di-santa-maria-di-cerrate/"
      },
      "mic-copertino": {
        "title": "Castello di Copertino",
        "publisher": "Ministero della Cultura / Direzione regionale Musei Puglia",
        "type": "institutional",
        "url": "https://museipuglia.cultura.gov.it/musei/castello-di-copertino/"
      },
      "visit-galatina": {
        "title": "Basilica di Santa Caterina d'Alessandria",
        "publisher": "Visit Puglia",
        "type": "curated-tourism",
        "url": "https://visit.puglia.it/en/basilicas-and-sanctuaries-of-puglia"
      },
      "italia-lecce-city": {
        "title": "Lecce",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/lecce"
      },
      "italia-otranto-city": {
        "title": "Otranto",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/otranto"
      },
      "italia-gallipoli-city": {
        "title": "Gallipoli",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/lecce/gallipoli"
      },
      "italia-nardo-city": {
        "title": "Nardò",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/it/puglia/nardo"
      },
      "italia-castro-city": {
        "title": "Castro",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/castro"
      },
      "italia-galatina-city": {
        "title": "Galatina",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/it/puglia/lecce/galatina"
      },
      "visit-copertino-city": {
        "title": "Copertino",
        "publisher": "Visit Puglia",
        "type": "curated-tourism",
        "url": "https://visit.puglia.it/en/copertino"
      },
      "italia-manduria-city": {
        "title": "Manduria",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/it/puglia/manduria"
      },
      "italia-ostuni-city": {
        "title": "Ostuni",
        "publisher": "Italia.it",
        "type": "official-tourism",
        "url": "https://www.italia.it/en/puglia/brindisi/ostuni"
      }
    },
    "entries": {
      "otranto": {
        "poiId": "otranto",
        "confidence": "high",
        "themes": [
          "history",
          "fortification",
          "renaissance",
          "architecture"
        ],
        "sourceIds": [
          "italia-otranto-castle"
        ],
        "summary": {
          "it": "Il Castello Aragonese è il grande presidio fortificato di Otranto. L’assetto aragonese fu progettato e realizzato tra il 1485 e il 1498, dopo la traumatica presa ottomana della città del 1480.",
          "fr": "Le château aragonais est la grande forteresse d’Otranto. Son organisation aragonaise fut conçue et réalisée entre 1485 et 1498, après la prise ottomane traumatique de la ville en 1480.",
          "en": "The Aragonese Castle is Otranto’s major fortified landmark. Its Aragonese layout was designed and built between 1485 and 1498, after the traumatic Ottoman capture of the city in 1480.",
          "es": "El Castillo Aragonés es la gran fortaleza de Otranto. Su configuración aragonesa fue diseñada y construida entre 1485 y 1498, después de la traumática toma otomana de la ciudad en 1480."
        },
        "history": {
          "it": "Ferdinando I d’Aragona promosse la ricostruzione; il progetto è attribuito a Ciro Ciri con la collaborazione di Francesco di Giorgio Martini. La fortezza inglobò difese precedenti e fu ulteriormente rinforzata nel Cinquecento.",
          "fr": "Ferdinand Ier d’Aragon lança la reconstruction ; le projet est attribué à Ciro Ciri avec la collaboration de Francesco di Giorgio Martini. La forteresse intégra des défenses antérieures et fut encore renforcée au XVIe siècle.",
          "en": "Ferdinand I of Aragon promoted the rebuilding; the design is attributed to Ciro Ciri with Francesco di Giorgio Martini. The fortress incorporated earlier defences and was strengthened again in the 16th century.",
          "es": "Fernando I de Aragón impulsó la reconstrucción; el proyecto se atribuye a Ciro Ciri con la colaboración de Francesco di Giorgio Martini. La fortaleza integró defensas anteriores y volvió a reforzarse en el siglo XVI."
        },
        "highlights": {
          "it": [
            "fossato che circonda la fortezza",
            "pianta pentagonale irregolare",
            "tre torri cilindriche angolari",
            "bastioni e stemmi monumentali"
          ],
          "fr": [
            "douves autour de la forteresse",
            "plan pentagonal irrégulier",
            "trois tours cylindriques d’angle",
            "bastions et armoiries monumentales"
          ],
          "en": [
            "moat around the fortress",
            "irregular pentagonal plan",
            "three cylindrical corner towers",
            "bastions and monumental coats of arms"
          ],
          "es": [
            "foso alrededor de la fortaleza",
            "planta pentagonal irregular",
            "tres torres cilíndricas angulares",
            "bastiones y escudos monumentales"
          ]
        }
      },
      "badisco": {
        "poiId": "badisco",
        "confidence": "medium-high",
        "themes": [
          "sea",
          "landscape",
          "prehistory",
          "myth"
        ],
        "sourceIds": [
          "visit-badisco",
          "visit-cervi"
        ],
        "summary": {
          "it": "Porto Badisco è una piccola insenatura della costa rocciosa tra Otranto e Santa Cesarea Terme, con tratti sabbiosi, acqua limpida e sentieri costieri.",
          "fr": "Porto Badisco est une petite crique de la côte rocheuse entre Otranto et Santa Cesarea Terme, avec quelques zones sableuses, une eau claire et des sentiers côtiers.",
          "en": "Porto Badisco is a small inlet on the rocky coast between Otranto and Santa Cesarea Terme, with some sandy stretches, clear water and coastal trails.",
          "es": "Porto Badisco es una pequeña cala de la costa rocosa entre Otranto y Santa Cesarea Terme, con algunos tramos de arena, agua clara y senderos costeros."
        },
        "history": {
          "it": "Il luogo è strettamente legato alla Grotta dei Cervi, scoperta nel 1970 e celebre per il suo eccezionale patrimonio di pitture rupestri neolitiche.",
          "fr": "Le lieu est étroitement lié à la Grotta dei Cervi, découverte en 1970 et célèbre pour son exceptionnel ensemble de peintures rupestres néolithiques.",
          "en": "The place is closely linked to the Grotta dei Cervi, discovered in 1970 and famous for its exceptional collection of Neolithic rock paintings.",
          "es": "El lugar está estrechamente relacionado con la Grotta dei Cervi, descubierta en 1970 y famosa por su excepcional conjunto de pinturas rupestres neolíticas."
        },
        "myth": {
          "it": "La tradizione locale associa Porto Badisco all’approdo di Enea. È una lettura mitica e culturale del luogo, non una localizzazione storicamente dimostrata.",
          "fr": "La tradition locale associe Porto Badisco au débarquement d’Énée. Il s’agit d’une lecture mythique et culturelle du lieu, et non d’une localisation historiquement démontrée.",
          "en": "Local tradition associates Porto Badisco with Aeneas’ landing. This is a mythical and cultural interpretation of the place, not a historically proven location.",
          "es": "La tradición local asocia Porto Badisco con el desembarco de Eneas. Es una interpretación mítica y cultural del lugar, no una localización históricamente demostrada."
        },
        "highlights": {
          "it": [
            "la piccola baia",
            "Grotta dei Cervi nelle vicinanze",
            "snorkeling e mare",
            "trekking costiero"
          ],
          "fr": [
            "la petite baie",
            "la Grotta dei Cervi à proximité",
            "snorkeling et mer",
            "randonnée côtière"
          ],
          "en": [
            "the small bay",
            "nearby Grotta dei Cervi",
            "snorkelling and sea",
            "coastal hiking"
          ],
          "es": [
            "la pequeña cala",
            "la cercana Grotta dei Cervi",
            "snorkel y mar",
            "senderismo costero"
          ]
        }
      },
      "cervi": {
        "poiId": "cervi",
        "confidence": "medium-high",
        "themes": [
          "prehistory",
          "archaeology",
          "rock-art"
        ],
        "sourceIds": [
          "visit-cervi"
        ],
        "summary": {
          "it": "La Grotta dei Cervi di Porto Badisco è uno dei più importanti complessi di arte rupestre preistorica del Salento, con pitture neolitiche di animali, figure umane e motivi geometrici.",
          "fr": "La Grotta dei Cervi de Porto Badisco est l’un des ensembles d’art rupestre préhistorique les plus importants du Salento, avec des peintures néolithiques d’animaux, de figures humaines et de motifs géométriques.",
          "en": "The Grotta dei Cervi at Porto Badisco is one of Salento’s most important prehistoric rock-art complexes, with Neolithic paintings of animals, human figures and geometric motifs.",
          "es": "La Grotta dei Cervi de Porto Badisco es uno de los conjuntos de arte rupestre prehistórico más importantes del Salento, con pinturas neolíticas de animales, figuras humanas y motivos geométricos."
        },
        "history": {
          "it": "La grotta fu scoperta il 1º febbraio 1970 da speleologi del Gruppo Speleologico Salentino di Maglie. Il nome deriva dalle raffigurazioni di cervi e scene di caccia presenti sulle pareti.",
          "fr": "La grotte fut découverte le 1er février 1970 par des spéléologues du Gruppo Speleologico Salentino de Maglie. Son nom vient des représentations de cerfs et de scènes de chasse sur ses parois.",
          "en": "The cave was discovered on 1 February 1970 by speleologists from the Gruppo Speleologico Salentino of Maglie. Its name comes from depictions of deer and hunting scenes on the walls.",
          "es": "La cueva fue descubierta el 1 de febrero de 1970 por espeleólogos del Gruppo Speleologico Salentino de Maglie. Su nombre procede de las representaciones de ciervos y escenas de caza de sus paredes."
        },
        "practical": {
          "it": "L’accesso è fortemente controllato per proteggere le pitture: non va trattato come una normale grotta turistica. Le condizioni di visita devono essere verificate con fonti autorizzate.",
          "fr": "L’accès est fortement contrôlé afin de protéger les peintures : ce n’est pas une grotte touristique ordinaire. Les conditions de visite doivent être vérifiées auprès de sources autorisées.",
          "en": "Access is tightly controlled to protect the paintings; this is not an ordinary tourist cave. Visiting conditions should be checked with authorised sources.",
          "es": "El acceso está muy controlado para proteger las pinturas; no es una cueva turística ordinaria. Las condiciones de visita deben verificarse con fuentes autorizadas."
        },
        "highlights": {
          "it": [
            "pitture neolitiche",
            "figure di cervi",
            "scene di caccia",
            "simboli e motivi geometrici"
          ],
          "fr": [
            "peintures néolithiques",
            "figures de cerfs",
            "scènes de chasse",
            "symboles et motifs géométriques"
          ],
          "en": [
            "Neolithic paintings",
            "deer figures",
            "hunting scenes",
            "symbols and geometric motifs"
          ],
          "es": [
            "pinturas neolíticas",
            "figuras de ciervos",
            "escenas de caza",
            "símbolos y motivos geométricos"
          ]
        }
      },
      "zinzulusa": {
        "poiId": "zinzulusa",
        "confidence": "medium-high",
        "themes": [
          "geology",
          "cave",
          "nature"
        ],
        "sourceIds": [
          "visit-zinzulusa"
        ],
        "summary": {
          "it": "La Grotta Zinzulusa, presso Castro, è una cavità carsica della costa adriatica salentina, nota per le concrezioni che pendono dalla volta e per gli ambienti sotterranei ricchi d’acqua.",
          "fr": "La Grotta Zinzulusa, près de Castro, est une cavité karstique de la côte adriatique du Salento, connue pour ses concrétions suspendues et ses espaces souterrains riches en eau.",
          "en": "Grotta Zinzulusa, near Castro, is a karst cave on Salento’s Adriatic coast, known for its hanging formations and water-rich underground chambers.",
          "es": "La Grotta Zinzulusa, cerca de Castro, es una cueva kárstica de la costa adriática del Salento, conocida por sus formaciones colgantes y sus espacios subterráneos ricos en agua."
        },
        "history": {
          "it": "Conosciuta localmente da secoli, fu documentata nel 1793 e aperta al pubblico nel 1957 dopo studi ed esplorazioni.",
          "fr": "Connue localement depuis des siècles, elle fut documentée en 1793 et ouverte au public en 1957 après des études et des explorations.",
          "en": "Known locally for centuries, it was documented in 1793 and opened to the public in 1957 after study and exploration.",
          "es": "Conocida localmente desde hace siglos, fue documentada en 1793 y abierta al público en 1957 tras estudios y exploraciones."
        },
        "why": {
          "it": "Il nome deriva da «zinzuli», parola salentina che significa «stracci»: le stalattiti ricordano infatti panni appesi.",
          "fr": "Son nom vient de « zinzuli », mot salentin signifiant « chiffons » : les stalactites évoquent des tissus suspendus.",
          "en": "Its name comes from “zinzuli”, a Salentino word meaning “rags”, because the stalactites resemble hanging cloth.",
          "es": "Su nombre procede de «zinzuli», palabra salentina que significa «trapos», porque las estalactitas recuerdan telas colgadas."
        },
        "highlights": {
          "it": [
            "Corridoio delle Meraviglie",
            "Cripta",
            "Duomo",
            "Lago Cocito",
            "concrezioni dette «zinzuli»"
          ],
          "fr": [
            "Corridor des Merveilles",
            "Crypte",
            "Dôme",
            "lac Cocito",
            "concrétions appelées « zinzuli »"
          ],
          "en": [
            "Corridor of Wonders",
            "Crypt",
            "Dome",
            "Lake Cocito",
            "formations known as “zinzuli”"
          ],
          "es": [
            "Corredor de las Maravillas",
            "Cripta",
            "Cúpula",
            "lago Cocito",
            "formaciones llamadas «zinzuli»"
          ]
        }
      },
      "cesine": {
        "poiId": "cesine",
        "confidence": "high",
        "themes": [
          "wetland",
          "biodiversity",
          "birdlife",
          "nature"
        ],
        "sourceIds": [
          "wwf-cesine"
        ],
        "summary": {
          "it": "Le Cesine è una Riserva Naturale e Oasi WWF nel territorio di Vernole, uno degli ultimi lembi delle paludi costiere che un tempo caratterizzavano il litorale salentino.",
          "fr": "Le Cesine est une réserve naturelle et oasis WWF sur le territoire de Vernole, l’un des derniers vestiges des marais côtiers qui caractérisaient autrefois le littoral du Salento.",
          "en": "Le Cesine is a nature reserve and WWF oasis in the Vernole area, one of the last remnants of the coastal wetlands that once characterised the Salento shoreline.",
          "es": "Le Cesine es una reserva natural y oasis WWF en el territorio de Vernole, uno de los últimos restos de los humedales costeros que antiguamente caracterizaban el litoral del Salento."
        },
        "nature": {
          "it": "La riserva copre circa 348 ettari e riunisce stagni temporanei, pinete di pino d’Aleppo, leccete, gariga e paludi costiere. È lungo un’importante rotta migratoria e ospita una ricchissima avifauna.",
          "fr": "La réserve couvre environ 348 hectares et réunit mares temporaires, pinèdes de pin d’Alep, chênaies vertes, garrigue et marais côtiers. Elle se trouve sur une importante route migratoire et accueille une avifaune très riche.",
          "en": "The reserve covers about 348 hectares and combines temporary ponds, Aleppo-pine woods, holm-oak woods, garrigue and coastal marshes. It lies on a major migration route and supports very rich birdlife.",
          "es": "La reserva abarca unas 348 hectáreas y reúne estanques temporales, pinares de pino carrasco, encinares, garriga y marismas costeras. Se encuentra en una importante ruta migratoria y alberga una avifauna muy rica."
        },
        "practical": {
          "it": "Secondo le regole pubblicate dal WWF, l’accesso alla riserva avviene con accompagnamento delle guide e prenotazione. Orari e modalità vanno sempre verificati prima della visita.",
          "fr": "Selon les règles publiées par le WWF, l’accès à la réserve se fait accompagné par les guides et sur réservation. Les horaires et modalités doivent toujours être vérifiés avant la visite.",
          "en": "Under the rules published by WWF, access to the reserve is with reserve guides and booking. Current times and conditions should always be checked before visiting.",
          "es": "Según las normas publicadas por WWF, el acceso a la reserva se realiza acompañado por guías y con reserva. Los horarios y condiciones deben verificarse siempre antes de la visita."
        },
        "highlights": {
          "it": [
            "zone umide costiere",
            "birdwatching",
            "orchidee spontanee",
            "pineta e macchia mediterranea"
          ],
          "fr": [
            "zones humides côtières",
            "observation des oiseaux",
            "orchidées sauvages",
            "pinède et maquis méditerranéen"
          ],
          "en": [
            "coastal wetlands",
            "birdwatching",
            "wild orchids",
            "pine woods and Mediterranean scrub"
          ],
          "es": [
            "humedales costeros",
            "observación de aves",
            "orquídeas silvestres",
            "pinar y matorral mediterráneo"
          ]
        }
      },
      "alto": {
        "poiId": "alto",
        "confidence": "high",
        "themes": [
          "nature",
          "history",
          "coastal-tower",
          "porto-selvaggio"
        ],
        "sourceIds": [
          "nardo-porto-selvaggio"
        ],
        "summary": {
          "it": "Torre dell’Alto domina il Parco Naturale di Porto Selvaggio, uno dei paesaggi costieri protetti più importanti del territorio di Nardò.",
          "fr": "Torre dell’Alto domine le parc naturel de Porto Selvaggio, l’un des paysages côtiers protégés les plus importants du territoire de Nardò.",
          "en": "Torre dell’Alto overlooks the Porto Selvaggio Natural Park, one of the most important protected coastal landscapes in the Nardò area.",
          "es": "Torre dell’Alto domina el Parque Natural de Porto Selvaggio, uno de los paisajes costeros protegidos más importantes del territorio de Nardò."
        },
        "history": {
          "it": "È una delle tre torri di vedetta della costa del parco, insieme a Torre Uluzzo e Torre Inserraglio. La rete di torri costiere fu potenziata nel Cinquecento nel quadro della difesa contro le incursioni dal mare.",
          "fr": "C’est l’une des trois tours de guet du littoral du parc, avec Torre Uluzzo et Torre Inserraglio. Le réseau de tours côtières fut renforcé au XVIe siècle dans le cadre de la défense contre les incursions maritimes.",
          "en": "It is one of the park coast’s three watchtowers, alongside Torre Uluzzo and Torre Inserraglio. The coastal-tower network was strengthened in the 16th century as part of defence against seaborne raids.",
          "es": "Es una de las tres torres de vigilancia de la costa del parque, junto con Torre Uluzzo y Torre Inserraglio. La red de torres costeras se reforzó en el siglo XVI para defenderse de incursiones marítimas."
        },
        "nature": {
          "it": "Il parco, istituito nel 1980, tutela 424 ettari e circa 7 km di costa, con pineta, aree carsiche, zone archeologiche e la vicina Palude del Capitano.",
          "fr": "Le parc, créé en 1980, protège 424 hectares et environ 7 km de côte, avec pinède, zones karstiques, secteurs archéologiques et la proche Palude del Capitano.",
          "en": "Established in 1980, the park protects 424 hectares and about 7 km of coast, including pine woods, karst areas, archaeological sites and the nearby Palude del Capitano.",
          "es": "El parque, creado en 1980, protege 424 hectáreas y unos 7 km de costa, con pinar, zonas kársticas, áreas arqueológicas y la cercana Palude del Capitano."
        },
        "highlights": {
          "it": [
            "vista sulla costa di Porto Selvaggio",
            "torre di vedetta storica",
            "sentieri nella pineta",
            "paesaggio carsico e marino"
          ],
          "fr": [
            "vue sur la côte de Porto Selvaggio",
            "tour de guet historique",
            "sentiers dans la pinède",
            "paysage karstique et marin"
          ],
          "en": [
            "views over Porto Selvaggio coast",
            "historic watchtower",
            "pine-wood trails",
            "karst and marine landscape"
          ],
          "es": [
            "vistas sobre la costa de Porto Selvaggio",
            "torre de vigilancia histórica",
            "senderos en el pinar",
            "paisaje kárstico y marino"
          ]
        }
      },
      "cerrate": {
        "poiId": "cerrate",
        "confidence": "high",
        "themes": [
          "medieval",
          "byzantine",
          "romanesque",
          "rural-history"
        ],
        "sourceIds": [
          "fai-cerrate"
        ],
        "summary": {
          "it": "Santa Maria di Cerrate è un complesso abbaziale medievale immerso nel paesaggio rurale salentino, dove si incontrano eredità bizantina, romanico pugliese e storia agricola.",
          "fr": "Santa Maria di Cerrate est un ensemble abbatial médiéval plongé dans le paysage rural du Salento, où se rencontrent héritage byzantin, art roman des Pouilles et histoire agricole.",
          "en": "Santa Maria di Cerrate is a medieval abbey complex set in the Salento countryside, where Byzantine heritage, Apulian Romanesque architecture and agricultural history meet.",
          "es": "Santa Maria di Cerrate es un complejo abacial medieval en el paisaje rural del Salento, donde se encuentran la herencia bizantina, el románico de Apulia y la historia agrícola."
        },
        "history": {
          "it": "Le origini storiche sono collocate tra la fine dell’XI e l’inizio del XII secolo, con una comunità di monaci greci di tradizione basiliana. Nei secoli il complesso fu trasformato anche in masseria.",
          "fr": "Ses origines historiques se situent entre la fin du XIe et le début du XIIe siècle, avec une communauté de moines grecs de tradition basilienne. Au fil des siècles, le complexe fut également transformé en masseria.",
          "en": "Its historical origins lie between the late 11th and early 12th centuries, with a community of Greek monks in the Basilian tradition. Over the centuries the complex was also transformed into a masseria.",
          "es": "Sus orígenes históricos se sitúan entre finales del siglo XI y comienzos del XII, con una comunidad de monjes griegos de tradición basiliana. Con los siglos el complejo también se transformó en masseria."
        },
        "myth": {
          "it": "Una leggenda lega la fondazione a Tancredi d’Altavilla e all’apparizione della Madonna durante una battuta di caccia. Il FAI distingue questa tradizione dalla ricostruzione storica del monastero.",
          "fr": "Une légende relie la fondation à Tancrède d’Hauteville et à une apparition de la Vierge pendant une chasse. Le FAI distingue cette tradition de la reconstruction historique du monastère.",
          "en": "A legend links the foundation to Tancred of Hauteville and an apparition of the Virgin during a hunt. FAI distinguishes this tradition from the historical reconstruction of the monastery.",
          "es": "Una leyenda vincula la fundación con Tancredo de Hauteville y una aparición de la Virgen durante una cacería. El FAI distingue esta tradición de la reconstrucción histórica del monasterio."
        },
        "highlights": {
          "it": [
            "chiesa romanica",
            "affreschi medievali",
            "portico duecentesco",
            "frantoi ipogei",
            "eredità del rito greco"
          ],
          "fr": [
            "église romane",
            "fresques médiévales",
            "portique du XIIIe siècle",
            "moulins à huile souterrains",
            "héritage du rite grec"
          ],
          "en": [
            "Romanesque church",
            "medieval frescoes",
            "13th-century portico",
            "underground olive presses",
            "Greek-rite heritage"
          ],
          "es": [
            "iglesia románica",
            "frescos medievales",
            "pórtico del siglo XIII",
            "almazaras subterráneas",
            "herencia del rito griego"
          ]
        }
      },
      "copertino": {
        "poiId": "copertino",
        "confidence": "high",
        "themes": [
          "renaissance",
          "fortification",
          "architecture"
        ],
        "sourceIds": [
          "mic-copertino"
        ],
        "summary": {
          "it": "Il Castello di Copertino è una grande fortezza rinascimentale costruita intorno al 1540 inglobando strutture precedenti, tra cui una torre del XIII secolo.",
          "fr": "Le château de Copertino est une grande forteresse de la Renaissance construite vers 1540 en intégrant des structures antérieures, dont une tour du XIIIe siècle.",
          "en": "Copertino Castle is a major Renaissance fortress built around 1540, incorporating earlier structures including a 13th-century tower.",
          "es": "El Castillo de Copertino es una gran fortaleza renacentista construida hacia 1540 e integrada con estructuras anteriores, entre ellas una torre del siglo XIII."
        },
        "history": {
          "it": "Il progetto rinascimentale è probabilmente legato all’architetto pugliese Evangelista Menga. Alla funzione militare si affiancò progressivamente quella residenziale, con palazzo e cappelle interne.",
          "fr": "Le projet Renaissance est probablement lié à l’architecte des Pouilles Evangelista Menga. À la fonction militaire s’ajouta progressivement une fonction résidentielle, avec palais et chapelles intérieures.",
          "en": "The Renaissance design is probably associated with Apulian architect Evangelista Menga. A residential role gradually complemented the military function, with an internal palace and chapels.",
          "es": "El proyecto renacentista se relaciona probablemente con el arquitecto de Apulia Evangelista Menga. A la función militar se añadió progresivamente una función residencial, con palacio y capillas interiores."
        },
        "highlights": {
          "it": [
            "portale monumentale rinascimentale",
            "bastioni della fortezza",
            "Cappella di San Marco",
            "affreschi di Gianserio Strafella"
          ],
          "fr": [
            "portail monumental Renaissance",
            "bastions de la forteresse",
            "chapelle Saint-Marc",
            "fresques de Gianserio Strafella"
          ],
          "en": [
            "monumental Renaissance portal",
            "fortress bastions",
            "Chapel of San Marco",
            "frescoes by Gianserio Strafella"
          ],
          "es": [
            "portal monumental renacentista",
            "bastiones de la fortaleza",
            "capilla de San Marcos",
            "frescos de Gianserio Strafella"
          ]
        },
        "practical": {
          "it": "Orari, giorni di apertura e biglietti sono dati dinamici: ARACNE deve rimandare alla fonte ufficiale del Ministero della Cultura per l’informazione aggiornata.",
          "fr": "Horaires, jours d’ouverture et tarifs sont des données dynamiques : ARACNE doit renvoyer à la source officielle du ministère italien de la Culture pour l’information à jour.",
          "en": "Opening times, days and ticket prices are dynamic data: ARACNE should refer to the official Italian Ministry of Culture source for current information.",
          "es": "Los horarios, días de apertura y precios son datos dinámicos: ARACNE debe remitir a la fuente oficial del Ministerio de Cultura italiano para la información actualizada."
        }
      },
      "galatina": {
        "poiId": "galatina",
        "confidence": "medium-high",
        "themes": [
          "medieval-art",
          "frescoes",
          "gothic",
          "religious-art"
        ],
        "sourceIds": [
          "visit-galatina"
        ],
        "summary": {
          "it": "La Basilica di Santa Caterina d’Alessandria a Galatina è uno dei grandi scrigni d’arte medievale del Salento, celebre soprattutto per il vasto ciclo di affreschi dell’interno.",
          "fr": "La basilique Santa Caterina d’Alessandria à Galatina est l’un des grands trésors d’art médiéval du Salento, célèbre surtout pour son vaste cycle de fresques intérieures.",
          "en": "The Basilica of Santa Caterina d’Alessandria in Galatina is one of Salento’s great medieval-art treasures, especially famous for its extensive interior fresco cycle.",
          "es": "La Basílica de Santa Caterina d’Alessandria en Galatina es uno de los grandes tesoros de arte medieval del Salento, famosa sobre todo por su extenso ciclo de frescos interiores."
        },
        "history": {
          "it": "L’edificio riunisce elementi romanici, gotici, normanni e bizantini. Nel Quattrocento Maria d’Enghien promosse la decorazione pittorica dell’interno, affidata ad artisti legati all’ambiente napoletano.",
          "fr": "L’édifice réunit des éléments romans, gothiques, normands et byzantins. Au XVe siècle, Maria d’Enghien favorisa la décoration picturale intérieure, confiée à des artistes liés au milieu napolitain.",
          "en": "The building combines Romanesque, Gothic, Norman and Byzantine elements. In the 15th century Maria d’Enghien promoted the interior painted decoration, carried out by artists connected with Naples.",
          "es": "El edificio combina elementos románicos, góticos, normandos y bizantinos. En el siglo XV, Maria d’Enghien impulsó la decoración pictórica del interior, realizada por artistas vinculados al ambiente napolitano."
        },
        "highlights": {
          "it": [
            "ciclo di affreschi medievali",
            "facciata romanica",
            "rosone e portale scolpito",
            "angeli musicanti e strumenti medievali"
          ],
          "fr": [
            "cycle de fresques médiévales",
            "façade romane",
            "rosace et portail sculpté",
            "anges musiciens et instruments médiévaux"
          ],
          "en": [
            "medieval fresco cycle",
            "Romanesque façade",
            "rose window and carved portal",
            "musical angels and medieval instruments"
          ],
          "es": [
            "ciclo de frescos medievales",
            "fachada románica",
            "rosetón y portal esculpido",
            "ángeles músicos e instrumentos medievales"
          ]
        }
      }
    },
    "territories": {
      "lecce": {
        "id": "lecce",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "lecce"
          ],
          "fr": [
            "lecce"
          ],
          "en": [
            "lecce"
          ],
          "es": [
            "lecce"
          ]
        },
        "sourceIds": [
          "italia-lecce-city"
        ],
        "poiIds": [
          "lecce",
          "rudiae",
          "cerrate"
        ],
        "themes": [
          "baroque",
          "roman",
          "architecture",
          "food",
          "city"
        ],
        "summary": {
          "it": "Lecce è il principale centro culturale del Salento, celebre per il barocco leccese scolpito nella pietra locale dal colore caldo e per una storia urbana che conserva anche importanti tracce romane.",
          "fr": "Lecce est le principal centre culturel du Salento, célèbre pour le baroque leccese sculpté dans la pierre locale aux tons chauds et pour une histoire urbaine qui conserve aussi d’importants vestiges romains.",
          "en": "Lecce is Salento’s main cultural centre, celebrated for Lecce Baroque carved in the warm-toned local stone and for an urban history that also preserves important Roman remains.",
          "es": "Lecce es el principal centro cultural del Salento, célebre por el barroco leccese esculpido en la piedra local de tonos cálidos y por una historia urbana que conserva importantes restos romanos."
        },
        "history": {
          "it": "La città conserva testimonianze dell’età romana e conobbe una straordinaria stagione artistica tra Cinquecento e Seicento, quando il barocco leccese divenne il linguaggio dominante di chiese, palazzi e piazze.",
          "fr": "La ville conserve des témoignages de l’époque romaine et connut une remarquable saison artistique entre les XVIe et XVIIe siècles, lorsque le baroque leccese devint le langage dominant des églises, palais et places.",
          "en": "The city preserves evidence from Roman times and experienced an exceptional artistic period between the 16th and 17th centuries, when Lecce Baroque became the dominant language of churches, palaces and squares.",
          "es": "La ciudad conserva testimonios de época romana y vivió una extraordinaria etapa artística entre los siglos XVI y XVII, cuando el barroco leccese se convirtió en el lenguaje dominante de iglesias, palacios y plazas."
        },
        "highlights": {
          "it": [
            "Piazza Duomo e il Duomo",
            "Basilica di Santa Croce",
            "anfiteatro romano",
            "Porta Rudiae",
            "vicoli e palazzi del centro barocco"
          ],
          "fr": [
            "Piazza Duomo et la cathédrale",
            "Basilique Santa Croce",
            "amphithéâtre romain",
            "Porta Rudiae",
            "ruelles et palais du centre baroque"
          ],
          "en": [
            "Piazza Duomo and the cathedral",
            "Basilica of Santa Croce",
            "Roman amphitheatre",
            "Porta Rudiae",
            "lanes and palaces of the Baroque centre"
          ],
          "es": [
            "Piazza Duomo y la catedral",
            "Basílica de Santa Croce",
            "anfiteatro romano",
            "Porta Rudiae",
            "calles y palacios del centro barroco"
          ]
        }
      },
      "otranto": {
        "id": "otranto",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "otranto"
          ],
          "fr": [
            "otranto"
          ],
          "en": [
            "otranto"
          ],
          "es": [
            "otranto"
          ]
        },
        "sourceIds": [
          "italia-otranto-city"
        ],
        "poiIds": [
          "otranto",
          "bauxite",
          "palascia",
          "santemiliano",
          "badisco",
          "cervi",
          "turchi",
          "mulino",
          "alimini"
        ],
        "themes": [
          "adriatic",
          "history",
          "martyrs",
          "castle",
          "coast"
        ],
        "summary": {
          "it": "Otranto è una città adriatica costruita su uno sperone roccioso, dove mare, fortificazioni e memoria storica si intrecciano in modo particolarmente forte.",
          "fr": "Otranto est une ville adriatique installée sur un éperon rocheux, où la mer, les fortifications et la mémoire historique sont étroitement liées.",
          "en": "Otranto is an Adriatic town set on a rocky spur, where the sea, fortifications and historical memory are especially closely intertwined.",
          "es": "Otranto es una ciudad adriática situada sobre un espolón rocoso, donde el mar, las fortificaciones y la memoria histórica están estrechamente unidos."
        },
        "history": {
          "it": "L’episodio più traumatico della storia cittadina fu l’assedio ottomano del 1480 e la successiva uccisione degli Ottocento Martiri, la cui memoria è custodita nella Cattedrale. La ricostruzione difensiva successiva segnò profondamente il Castello aragonese.",
          "fr": "L’épisode le plus traumatique de l’histoire de la ville fut le siège ottoman de 1480 et la mort des huit cents Martyrs, dont la mémoire est conservée dans la cathédrale. La reconstruction défensive qui suivit marqua profondément le château aragonais.",
          "en": "The most traumatic episode in the town’s history was the Ottoman siege of 1480 and the killing of the Eight Hundred Martyrs, whose memory is preserved in the cathedral. The defensive rebuilding that followed strongly shaped the Aragonese Castle.",
          "es": "El episodio más traumático de la historia de la ciudad fue el asedio otomano de 1480 y la muerte de los Ochocientos Mártires, cuya memoria se conserva en la catedral. La reconstrucción defensiva posterior marcó profundamente el Castillo Aragonés."
        },
        "nature": {
          "it": "Il territorio di Otranto alterna centro storico, costa rocciosa, baie, laghi costieri e paesaggi mediterranei: tra i luoghi collegati figurano Punta Palascia, Baia dei Turchi, Alimini e Porto Badisco.",
          "fr": "Le territoire d’Otranto alterne centre historique, côte rocheuse, baies, lacs côtiers et paysages méditerranéens : Punta Palascia, Baia dei Turchi, Alimini et Porto Badisco en font partie.",
          "en": "Otranto’s territory combines the historic centre, rocky coastline, bays, coastal lakes and Mediterranean landscapes, including Punta Palascia, Baia dei Turchi, Alimini and Porto Badisco.",
          "es": "El territorio de Otranto combina centro histórico, costa rocosa, bahías, lagos costeros y paisajes mediterráneos, entre ellos Punta Palascia, Baia dei Turchi, Alimini y Porto Badisco."
        },
        "highlights": {
          "it": [
            "Cattedrale e memoria degli Ottocento Martiri",
            "Castello aragonese",
            "centro storico affacciato sull’Adriatico",
            "Punta Palascia",
            "Baia dei Turchi e Alimini"
          ],
          "fr": [
            "cathédrale et mémoire des Huit Cents Martyrs",
            "château aragonais",
            "centre historique sur l’Adriatique",
            "Punta Palascia",
            "Baia dei Turchi et Alimini"
          ],
          "en": [
            "cathedral and memory of the Eight Hundred Martyrs",
            "Aragonese Castle",
            "historic centre overlooking the Adriatic",
            "Punta Palascia",
            "Baia dei Turchi and Alimini"
          ],
          "es": [
            "catedral y memoria de los Ochocientos Mártires",
            "Castillo Aragonés",
            "centro histórico sobre el Adriático",
            "Punta Palascia",
            "Baia dei Turchi y Alimini"
          ]
        }
      },
      "gallipoli": {
        "id": "gallipoli",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "gallipoli"
          ],
          "fr": [
            "gallipoli"
          ],
          "en": [
            "gallipoli"
          ],
          "es": [
            "gallipoli"
          ]
        },
        "sourceIds": [
          "italia-gallipoli-city"
        ],
        "poiIds": [
          "santandrea_gallipoli",
          "montagna",
          "suina"
        ],
        "themes": [
          "ionian",
          "old-town",
          "beaches",
          "baroque",
          "nightlife"
        ],
        "summary": {
          "it": "Gallipoli unisce due anime: il centro storico su un’isola collegata alla terraferma da un ponte e una lunga costa ionica famosa per spiagge e vita balneare.",
          "fr": "Gallipoli réunit deux âmes : un centre historique situé sur une île reliée au continent par un pont et une longue côte ionienne célèbre pour ses plages et sa vie balnéaire.",
          "en": "Gallipoli combines two identities: a historic centre on an island linked to the mainland by a bridge, and a long Ionian coastline famous for beaches and seaside life.",
          "es": "Gallipoli combina dos almas: un centro histórico situado en una isla unida al continente por un puente y una larga costa jónica famosa por sus playas y vida balnearia."
        },
        "history": {
          "it": "Il cuore antico è protetto da fortificazioni e dominato dal Castello, mentre il tessuto urbano conserva numerose chiese barocche. Il ponte collega la città vecchia al borgo moderno.",
          "fr": "Le cœur ancien est protégé par des fortifications et dominé par le château, tandis que le tissu urbain conserve de nombreuses églises baroques. Le pont relie la vieille ville au quartier moderne.",
          "en": "The old heart is protected by fortifications and dominated by the castle, while the urban fabric preserves numerous Baroque churches. The bridge links the old town to the modern district.",
          "es": "El corazón antiguo está protegido por fortificaciones y dominado por el castillo, mientras que el tejido urbano conserva numerosas iglesias barrocas. El puente conecta la ciudad vieja con el barrio moderno."
        },
        "highlights": {
          "it": [
            "Castello di Gallipoli",
            "Cattedrale di Sant’Agata",
            "Santa Maria della Purità",
            "borgo antico e porto",
            "Punta della Suina e costa ionica"
          ],
          "fr": [
            "château de Gallipoli",
            "cathédrale Sant’Agata",
            "Santa Maria della Purità",
            "vieille ville et port",
            "Punta della Suina et côte ionienne"
          ],
          "en": [
            "Gallipoli Castle",
            "Cathedral of Sant’Agata",
            "Santa Maria della Purità",
            "old town and harbour",
            "Punta della Suina and the Ionian coast"
          ],
          "es": [
            "Castillo de Gallipoli",
            "Catedral de Sant’Agata",
            "Santa Maria della Purità",
            "casco antiguo y puerto",
            "Punta della Suina y costa jónica"
          ]
        }
      },
      "nardo": {
        "id": "nardo",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "nardo"
          ],
          "fr": [
            "nardo"
          ],
          "en": [
            "nardo"
          ],
          "es": [
            "nardo"
          ]
        },
        "sourceIds": [
          "italia-nardo-city"
        ],
        "poiIds": [
          "fiume",
          "alto",
          "cavallo",
          "uluzzo",
          "capitano",
          "frascone",
          "santamaria",
          "santacaterina"
        ],
        "themes": [
          "baroque",
          "ionian",
          "porto-selvaggio",
          "watchtowers",
          "nature"
        ],
        "summary": {
          "it": "Nardò lega un centro storico barocco a un vasto territorio ionico che comprende marine, masserie, torri costiere e il Parco di Porto Selvaggio e Palude del Capitano.",
          "fr": "Nardò relie un centre historique baroque à un vaste territoire ionien comprenant stations balnéaires, masserie, tours côtières et le parc de Porto Selvaggio et Palude del Capitano.",
          "en": "Nardò links a Baroque historic centre with a broad Ionian territory of seaside settlements, masserie, coastal towers and the Porto Selvaggio–Palude del Capitano park.",
          "es": "Nardò une un centro histórico barroco con un amplio territorio jónico de núcleos costeros, masserie, torres litorales y el parque de Porto Selvaggio y Palude del Capitano."
        },
        "nature": {
          "it": "La costa comprende aree protette, pinete, falesie e zone umide carsiche. Porto Selvaggio e Palude del Capitano costituiscono il grande cuore naturale del territorio.",
          "fr": "La côte comprend des espaces protégés, pinèdes, falaises et zones humides karstiques. Porto Selvaggio et Palude del Capitano forment le grand cœur naturel du territoire.",
          "en": "The coast includes protected areas, pine woods, cliffs and karst wetlands. Porto Selvaggio and Palude del Capitano form the territory’s major natural core.",
          "es": "La costa incluye zonas protegidas, pinares, acantilados y humedales kársticos. Porto Selvaggio y Palude del Capitano forman el gran núcleo natural del territorio."
        },
        "highlights": {
          "it": [
            "centro storico barocco",
            "Piazza Salandra",
            "Porto Selvaggio",
            "Torre dell’Alto e Torre Uluzzo",
            "Santa Maria al Bagno e Santa Caterina"
          ],
          "fr": [
            "centre historique baroque",
            "Piazza Salandra",
            "Porto Selvaggio",
            "Torre dell’Alto et Torre Uluzzo",
            "Santa Maria al Bagno et Santa Caterina"
          ],
          "en": [
            "Baroque historic centre",
            "Piazza Salandra",
            "Porto Selvaggio",
            "Torre dell’Alto and Torre Uluzzo",
            "Santa Maria al Bagno and Santa Caterina"
          ],
          "es": [
            "centro histórico barroco",
            "Piazza Salandra",
            "Porto Selvaggio",
            "Torre dell’Alto y Torre Uluzzo",
            "Santa Maria al Bagno y Santa Caterina"
          ]
        }
      },
      "castro": {
        "id": "castro",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "castro"
          ],
          "fr": [
            "castro"
          ],
          "en": [
            "castro"
          ],
          "es": [
            "castro"
          ]
        },
        "sourceIds": [
          "italia-castro-city",
          "visit-zinzulusa"
        ],
        "poiIds": [
          "castro",
          "zinzulusa"
        ],
        "themes": [
          "adriatic",
          "archaeology",
          "minerva",
          "castle",
          "caves"
        ],
        "summary": {
          "it": "Castro è un borgo arroccato sulla costa adriatica, erede dell’antica Castrum Minervae e fortemente legato al mare, all’archeologia e al mito di Minerva.",
          "fr": "Castro est un village perché sur la côte adriatique, héritier de l’antique Castrum Minervae et profondément lié à la mer, à l’archéologie et au mythe de Minerve.",
          "en": "Castro is a cliff-top Adriatic village, heir to ancient Castrum Minervae and strongly connected with the sea, archaeology and the myth of Minerva.",
          "es": "Castro es un pueblo encaramado sobre la costa adriática, heredero de la antigua Castrum Minervae y muy ligado al mar, la arqueología y el mito de Minerva."
        },
        "history": {
          "it": "Gli scavi archeologici hanno riportato alla luce elementi del santuario dedicato a Minerva, tra cui reperti collegati a una grande statua della dea. Il Castello ospita il Museo Archeologico Antonio Lazzari.",
          "fr": "Les fouilles archéologiques ont mis au jour des éléments du sanctuaire consacré à Minerve, dont des vestiges associés à une grande statue de la déesse. Le château abrite le musée archéologique Antonio Lazzari.",
          "en": "Archaeological excavations have revealed elements of the sanctuary dedicated to Minerva, including finds linked to a large statue of the goddess. The castle houses the Antonio Lazzari Archaeological Museum.",
          "es": "Las excavaciones arqueológicas han sacado a la luz elementos del santuario dedicado a Minerva, incluidos hallazgos relacionados con una gran estatua de la diosa. El castillo alberga el Museo Arqueológico Antonio Lazzari."
        },
        "myth": {
          "it": "La tradizione collega Castro, l’antica Castrum Minervae, al viaggio di Enea. Il legame è culturale e letterario; ARACNE lo presenta come tradizione, distinguendolo dai dati archeologici.",
          "fr": "La tradition relie Castro, l’ancienne Castrum Minervae, au voyage d’Énée. Ce lien est culturel et littéraire ; ARACNE le présente comme une tradition distincte des données archéologiques.",
          "en": "Tradition links Castro, ancient Castrum Minervae, with Aeneas’ journey. The connection is cultural and literary; ARACNE presents it as tradition, distinct from archaeological evidence.",
          "es": "La tradición relaciona Castro, la antigua Castrum Minervae, con el viaje de Eneas. El vínculo es cultural y literario; ARACNE lo presenta como tradición separada de la evidencia arqueológica."
        },
        "highlights": {
          "it": [
            "Castello aragonese e museo archeologico",
            "area del Tempio di Minerva",
            "borgo alto",
            "Castro Marina",
            "Grotta Zinzulusa"
          ],
          "fr": [
            "château aragonais et musée archéologique",
            "zone du temple de Minerve",
            "village haut",
            "Castro Marina",
            "Grotta Zinzulusa"
          ],
          "en": [
            "Aragonese castle and archaeological museum",
            "Temple of Minerva area",
            "upper village",
            "Castro Marina",
            "Grotta Zinzulusa"
          ],
          "es": [
            "castillo aragonés y museo arqueológico",
            "zona del templo de Minerva",
            "pueblo alto",
            "Castro Marina",
            "Grotta Zinzulusa"
          ]
        }
      },
      "galatina": {
        "id": "galatina",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "galatina"
          ],
          "fr": [
            "galatina"
          ],
          "en": [
            "galatina"
          ],
          "es": [
            "galatina"
          ]
        },
        "sourceIds": [
          "italia-galatina-city"
        ],
        "poiIds": [
          "galatina"
        ],
        "themes": [
          "medieval",
          "frescoes",
          "baroque",
          "food"
        ],
        "summary": {
          "it": "Galatina è una città d’arte dell’entroterra salentino, nota soprattutto per la Basilica di Santa Caterina d’Alessandria, per il centro storico e per la tradizione del pasticciotto.",
          "fr": "Galatina est une ville d’art de l’intérieur du Salento, connue surtout pour la basilique Santa Caterina d’Alessandria, son centre historique et la tradition du pasticciotto.",
          "en": "Galatina is an inland Salento art town, known above all for the Basilica of Santa Caterina d’Alessandria, its historic centre and the pasticciotto tradition.",
          "es": "Galatina es una ciudad de arte del interior del Salento, conocida sobre todo por la Basílica de Santa Caterina d’Alessandria, su centro histórico y la tradición del pasticciotto."
        },
        "history": {
          "it": "Tra XIV e XV secolo Galatina conobbe una fase di grande sviluppo. La Basilica di Santa Caterina, edificata nel 1384, custodisce uno dei più importanti cicli di affreschi medievali del Mezzogiorno.",
          "fr": "Entre les XIVe et XVe siècles, Galatina connut une période de grand développement. La basilique Santa Caterina, édifiée en 1384, conserve l’un des ensembles de fresques médiévales les plus importants du Mezzogiorno.",
          "en": "Between the 14th and 15th centuries Galatina experienced major development. The Basilica of Santa Caterina, built in 1384, preserves one of southern Italy’s most important medieval fresco cycles.",
          "es": "Entre los siglos XIV y XV Galatina vivió una etapa de gran desarrollo. La Basílica de Santa Caterina, construida en 1384, conserva uno de los ciclos de frescos medievales más importantes del sur de Italia."
        },
        "highlights": {
          "it": [
            "Basilica di Santa Caterina d’Alessandria",
            "ciclo di affreschi quattrocenteschi",
            "Chiesa Madre dei Santi Pietro e Paolo",
            "palazzi e balconi del centro",
            "tradizione del pasticciotto"
          ],
          "fr": [
            "Basilique Santa Caterina d’Alessandria",
            "cycle de fresques du XVe siècle",
            "église mère Saints Pierre et Paul",
            "palais et balcons du centre",
            "tradition du pasticciotto"
          ],
          "en": [
            "Basilica of Santa Caterina d’Alessandria",
            "15th-century fresco cycle",
            "Mother Church of Saints Peter and Paul",
            "historic palaces and balconies",
            "pasticciotto tradition"
          ],
          "es": [
            "Basílica de Santa Caterina d’Alessandria",
            "ciclo de frescos del siglo XV",
            "iglesia madre de San Pedro y San Pablo",
            "palacios y balcones históricos",
            "tradición del pasticciotto"
          ]
        }
      },
      "copertino": {
        "id": "copertino",
        "type": "city",
        "confidence": "medium-high",
        "aliases": {
          "it": [
            "copertino"
          ],
          "fr": [
            "copertino"
          ],
          "en": [
            "copertino"
          ],
          "es": [
            "copertino"
          ]
        },
        "sourceIds": [
          "visit-copertino-city",
          "mic-copertino"
        ],
        "poiIds": [
          "copertino",
          "grottella"
        ],
        "themes": [
          "renaissance",
          "saint-joseph",
          "castle",
          "religious"
        ],
        "summary": {
          "it": "Copertino, nell’entroterra salentino a ovest di Lecce, è conosciuta soprattutto per il grande castello rinascimentale e per San Giuseppe da Copertino, nato qui nel 1603.",
          "fr": "Copertino, dans l’intérieur du Salento à l’ouest de Lecce, est surtout connue pour son grand château Renaissance et pour saint Joseph de Copertino, né ici en 1603.",
          "en": "Copertino, in inland Salento west of Lecce, is best known for its major Renaissance castle and for Saint Joseph of Copertino, born here in 1603.",
          "es": "Copertino, en el interior del Salento al oeste de Lecce, es conocida sobre todo por su gran castillo renacentista y por San José de Copertino, nacido aquí en 1603."
        },
        "highlights": {
          "it": [
            "Castello di Copertino",
            "Santuario di San Giuseppe",
            "Basilica di Santa Maria ad Nives",
            "Monastero di Santa Chiara",
            "porte e piazze del centro"
          ],
          "fr": [
            "château de Copertino",
            "sanctuaire Saint-Joseph",
            "basilique Santa Maria ad Nives",
            "monastère Santa Chiara",
            "portes et places du centre"
          ],
          "en": [
            "Copertino Castle",
            "Sanctuary of Saint Joseph",
            "Basilica of Santa Maria ad Nives",
            "Monastery of Santa Chiara",
            "historic gates and squares"
          ],
          "es": [
            "Castillo de Copertino",
            "Santuario de San José",
            "Basílica de Santa Maria ad Nives",
            "Monasterio de Santa Chiara",
            "puertas y plazas históricas"
          ]
        }
      },
      "manduria": {
        "id": "manduria",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "manduria"
          ],
          "fr": [
            "manduria"
          ],
          "en": [
            "manduria"
          ],
          "es": [
            "manduria"
          ]
        },
        "sourceIds": [
          "italia-manduria-city"
        ],
        "poiIds": [
          "monaci"
        ],
        "themes": [
          "messapian",
          "archaeology",
          "primitivo",
          "wine",
          "ionian"
        ],
        "summary": {
          "it": "Manduria unisce una fortissima identità messapica alla cultura del vino Primitivo e a un territorio che si estende verso la costa ionica.",
          "fr": "Manduria associe une identité messapienne très forte à la culture du vin Primitivo et à un territoire qui s’étend vers la côte ionienne.",
          "en": "Manduria combines a strong Messapian identity with the culture of Primitivo wine and a territory extending toward the Ionian coast.",
          "es": "Manduria combina una fuerte identidad mesapia con la cultura del vino Primitivo y un territorio que se extiende hacia la costa jónica."
        },
        "history": {
          "it": "Le mura megalitiche, la vasta necropoli e il Fonte Pliniano testimoniano l’importanza dell’antica Manduria messapica. La città fu poi rifondata nel Medioevo con il nome di Casalnuovo e recuperò il nome Manduria nel 1789.",
          "fr": "Les murailles mégalithiques, la vaste nécropole et la Fonte Pliniano témoignent de l’importance de l’ancienne Manduria messapienne. La ville fut ensuite refondée au Moyen Âge sous le nom de Casalnuovo avant de reprendre le nom Manduria en 1789.",
          "en": "The megalithic walls, extensive necropolis and Fonte Pliniano testify to the importance of ancient Messapian Manduria. The town was later refounded in the Middle Ages as Casalnuovo and recovered the name Manduria in 1789.",
          "es": "Las murallas megalíticas, la extensa necrópolis y la Fonte Pliniano testimonian la importancia de la antigua Manduria mesapia. La ciudad fue refundada en la Edad Media como Casalnuovo y recuperó el nombre Manduria en 1789."
        },
        "highlights": {
          "it": [
            "Parco Archeologico delle Mura Messapiche",
            "Fonte Pliniano",
            "necropoli messapica",
            "Museo della Civiltà del Vino Primitivo",
            "Salina dei Monaci e Torre Colimena"
          ],
          "fr": [
            "parc archéologique des murailles messapiennes",
            "Fonte Pliniano",
            "nécropole messapienne",
            "musée de la civilisation du vin Primitivo",
            "Salina dei Monaci et Torre Colimena"
          ],
          "en": [
            "Messapian Walls Archaeological Park",
            "Fonte Pliniano",
            "Messapian necropolis",
            "Museum of Primitivo Wine Culture",
            "Salina dei Monaci and Torre Colimena"
          ],
          "es": [
            "Parque Arqueológico de las Murallas Mesapias",
            "Fonte Pliniano",
            "necrópolis mesapia",
            "Museo de la Civilización del Vino Primitivo",
            "Salina dei Monaci y Torre Colimena"
          ]
        }
      },
      "ostuni": {
        "id": "ostuni",
        "type": "city",
        "confidence": "high",
        "aliases": {
          "it": [
            "ostuni",
            "citta bianca"
          ],
          "fr": [
            "ostuni",
            "ville blanche"
          ],
          "en": [
            "ostuni",
            "white city"
          ],
          "es": [
            "ostuni",
            "ciudad blanca"
          ]
        },
        "sourceIds": [
          "italia-ostuni-city"
        ],
        "poiIds": [],
        "themes": [
          "white-city",
          "valle-ditria",
          "olive-groves",
          "cathedral",
          "adriatic"
        ],
        "summary": {
          "it": "Ostuni, la «Città Bianca», domina dall’ultimo gradino delle Murge un paesaggio di uliveti ed è una delle porte meridionali della Valle d’Itria.",
          "fr": "Ostuni, la « Ville Blanche », domine depuis les derniers reliefs des Murge un paysage d’oliveraies et constitue l’une des portes méridionales de la vallée d’Itria.",
          "en": "Ostuni, the “White City”, overlooks a landscape of olive groves from the last foothills of the Murge and forms one of the southern gateways to the Itria Valley.",
          "es": "Ostuni, la «Ciudad Blanca», domina desde las últimas estribaciones de las Murge un paisaje de olivares y constituye una de las puertas meridionales del Valle de Itria."
        },
        "history": {
          "it": "Il centro antico, detto «La Terra», è un labirinto di case imbiancate, vicoli e scalinate. Nella parte alta spicca la Cattedrale tardo-quattrocentesca, caratterizzata da forme gotiche.",
          "fr": "Le centre ancien, appelé « La Terra », est un labyrinthe de maisons blanchies à la chaux, ruelles et escaliers. Dans la partie haute se distingue la cathédrale de la fin du XVe siècle, aux formes gothiques.",
          "en": "The old centre, known as “La Terra”, is a maze of whitewashed houses, lanes and stairways. At the top stands the late-15th-century cathedral, distinguished by Gothic forms.",
          "es": "El centro antiguo, llamado «La Terra», es un laberinto de casas encaladas, callejuelas y escaleras. En la parte alta destaca la catedral de finales del siglo XV, de formas góticas."
        },
        "nature": {
          "it": "Intorno alla città si estende la Piana degli Ulivi; la costa adriatica e le marine di Ostuni si trovano a meno di dieci chilometri dal centro.",
          "fr": "Autour de la ville s’étend la plaine des oliviers ; la côte adriatique et les stations balnéaires d’Ostuni se trouvent à moins de dix kilomètres du centre.",
          "en": "The Plain of Olive Trees extends around the town, while Ostuni’s Adriatic coast and seaside settlements lie less than ten kilometres from the centre.",
          "es": "Alrededor de la ciudad se extiende la llanura de los olivos, mientras que la costa adriática y los núcleos costeros de Ostuni se encuentran a menos de diez kilómetros del centro."
        },
        "highlights": {
          "it": [
            "centro storico bianco «La Terra»",
            "Cattedrale",
            "vicoli, archi e scalinate",
            "Piana degli Ulivi",
            "costa e marine di Ostuni"
          ],
          "fr": [
            "centre historique blanc « La Terra »",
            "cathédrale",
            "ruelles, arches et escaliers",
            "plaine des oliviers",
            "côte et stations balnéaires d’Ostuni"
          ],
          "en": [
            "white historic centre “La Terra”",
            "cathedral",
            "lanes, arches and stairways",
            "Plain of Olive Trees",
            "Ostuni coast and seaside settlements"
          ],
          "es": [
            "centro histórico blanco «La Terra»",
            "catedral",
            "callejuelas, arcos y escaleras",
            "llanura de los olivos",
            "costa y núcleos costeros de Ostuni"
          ]
        }
      }
    }
  };

  const normalize = value => String(value||"")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9\s]/g," ")
    .replace(/\s+/g," ")
    .trim();

  const api = {
    version: DATA.version,
    updated: DATA.updated,
    policy: DATA.policy,
    entries: DATA.entries,
    sources: DATA.sources,

    get(id) {
      return DATA.entries[id] || null;
    },

    getTerritory(id) {
      return DATA.territories?.[id] || null;
    },

    territoryForPoi(poiId) {
      for (const [id,territory] of Object.entries(DATA.territories||{})) {
        if ((territory.poiIds||[]).includes(poiId)) return {id,...territory};
      }
      return null;
    },

    territoriesForPoi(poiId) {
      return Object.entries(DATA.territories||{})
        .filter(([,territory])=>(territory.poiIds||[]).includes(poiId))
        .map(([id,territory])=>({id,...territory}));
    },

    findTerritories(query, language="it") {
      const q=normalize(query);
      if(!q)return [];
      const out=[];
      for(const [id,territory] of Object.entries(DATA.territories||{})) {
        const aliases=[
          id,
          territory.labels?.[language],
          ...(territory.aliases?.[language]||territory.aliases?.it||[])
        ].filter(Boolean).map(normalize);

        let score=0;
        let matchedAlias=null;
        for(const alias of aliases){
          if(!alias)continue;
          if(q===alias){score=Math.max(score,100);matchedAlias=alias;continue;}
          if((" "+q+" ").includes(" "+alias+" ")){
            const s=40+Math.min(alias.length,30);
            if(s>score){score=s;matchedAlias=alias;}
          }
        }
        if(score>0)out.push({id,entry:territory,score,matchedAlias});
      }
      return out.sort((a,b)=>b.score-a.score);
    },

    territorySourcesFor(id) {
      const territory=DATA.territories?.[id];
      if(!territory)return [];
      return (territory.sourceIds||[])
        .map(sourceId=>({id:sourceId,...DATA.sources[sourceId]}))
        .filter(item=>item.url);
    },

    poisForTerritory(id) {
      return [...(DATA.territories?.[id]?.poiIds||[])];
    },

    has(id) {
      return !!DATA.entries[id];
    },

    sourcesFor(id) {
      const entry=DATA.entries[id];
      if(!entry)return [];
      return (entry.sourceIds||[]).map(sourceId=>({id:sourceId,...DATA.sources[sourceId]})).filter(item=>item.url);
    },

    search(query) {
      const q=normalize(query);
      if(!q)return [];
      return Object.entries(DATA.entries)
        .map(([id,entry])=>{
          const haystack=normalize([id,entry.poiId,(entry.themes||[]).join(" "),Object.values(entry.summary||{}).join(" ")].join(" "));
          let score=0;
          for(const token of q.split(" ").filter(Boolean)){
            if(haystack.includes(token))score+=1;
          }
          return {id,entry,score};
        })
        .filter(item=>item.score>0)
        .sort((a,b)=>b.score-a.score);
    },

    stats() {
      return {
        version:DATA.version,
        updated:DATA.updated,
        entries:Object.keys(DATA.entries).length,
        territories:Object.keys(DATA.territories||{}).length,
        sources:Object.keys(DATA.sources).length
      };
    }
  };

  window.AracneKnowledgeBase = api;
})();
