# Premier essai — Aracne Intelligence — 31 octobre 2026

## Source et périmètre
Dépôt : giuseppefani1978-cell/ilVolodAracne-, commit dfe75b586378ccb2004b159733479a520f3817b9.
Le dépôt Aracne-Apulia-trip-Planner n'est pas l'emplacement des moteurs examinés.
Corpus réellement chargé : 50 fiches, 19 territoires, 48 sources ; date déclarée 15 septembre 2026.
La base signale cinq identifiants en attente de vérification : lecce, scarra, enea, ripe, giurupi. Ce statut ne prouve pas que toutes leurs informations sont fausses.

## Expérience exécutée
Test local Node.js du parseur aracne-intent-v130.js avec la vraie base aracne-knowledge.js.
16 cas ciblés FR/IT/EN/ES : refus de parcours avec deux villes et connecteur temporel, parcours implicite positif, parcours explicite positif et recherche de faux déclenchements à l'intérieur des mots.
Le moteur d'exécution aval est remplacé par un adaptateur minimal : aucun navigateur, appel LLM, calcul de trajet ou réponse touristique complète n'est testé.

Avant : 11/16 ; après : 16/16.
Les quatre refus de parcours échouaient : la détection de séquence réintroduisait route après le traitement de la négation.
Le cas espagnol « Háblame de la fruta en Lecce y Otranto » échouait aussi : ruta était reconnu dans fruta.
Correction : conserver le refus lors de l'inférence de séquence et rechercher des expressions complètes.
Commande : node tests/weekly-intent-regression.cjs
Contrôle syntaxique : node --check aracne-intent-v130.js

## Limites et intégration
Ce score porte uniquement sur ce jeu ciblé, créé pour cette expérience, pas sur la qualité générale du RAG ni sur un jeu indépendant.
Les autres suites JSON existantes n'ont pas été exécutées comme tests de bout en bout.
Les index HTML racine et aracne-test-v130/index.html examinés chargent explicitement knowledge et intelligence mais ne référencent pas le module intent-v130 : son activation dans l'application n'est pas démontrée.
La correction est donc préparée dans une branche de travail, sans branche principale modifiée et sans déploiement.
La négation à portée de phrase reste volontairement conservatrice : les demandes mêlant refus puis nouvelle instruction affirmative devront être testées séparément.

## Suite prioritaire
Vérifier et tester le chemin de chargement réel des couches 1.3.0 avant toute activation. Puis étendre le banc aux questions quoi voir / autour / thème / contraintes, avec réponses attendues issues des fiches et sources.
Conserver ce test comme garde-fou hebdomadaire ; ne pas annoncer de gain de latence ou de qualité des réponses sans mesure.

## Décision
Premier gain mesuré sur la compréhension des intentions ; aucun gain de production revendiqué.

