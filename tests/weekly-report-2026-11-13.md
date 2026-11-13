# Amélioration du 13 novembre 2026

## État vérifié
Dépôt giuseppefani1978-cell/ilVolodAracne-, main 47be31086bcbbf19391e8fdef9ce2416885a6ac4. Rapport du 31 octobre relu. Aucun rapport ultérieur présent dans l'arbre distant ; aucun AGENTS.md.
Le 13 novembre, GET https://giuseppefani1978-cell.github.io/ilVolodAracne-/ et GET du script référencé : HTTP 200. Le HTML charge knowledge 1.0.0 et intelligence 1.1.9, sans intent-v130. Le SHA-256 du script servi est identique à celui du moteur de référence : baf9d3d39dc8969271fa7cd008c6132bf62b4718423a3060b58531c708c006b0. Vérification HTTP, pas exécution dans un navigateur ou sur téléphone. L'API des déploiements GitHub n'est pas accessible via le connecteur ; aucun projet Vercel trouvé pour ce dépôt.

## Défaut et changement proposé
« Que voir à Castrocaro ? » sélectionne à tort Castro dans les quatre langues. La recherche des alias dans index.html et le secours getPlaces du moteur acceptaient une sous-chaîne à l'intérieur d'un mot.
Correction : limites de mots pour noms, alias et identifiants ; conservation des noms séparés par un trait d'union. Préparation de la version 1.1.10 et de son URL de script dans la branche, sans modification de main ni déploiement de production. Aucun changement de corpus ou de données de production.

## Banc reproductible et résultats
18 questions stables FR/IT/EN/ES, chacune exécutée dans deux configurations : véritable fonction findMentionedPois extraite de la PWA, puis secours sans adaptateur. Catalogue et connaissances réels ; DOM minimal. Les attentes et leurs sources internes figurent dans weekly-place-cases.json. Ce passage mesure la reconnaissance des objets, pas l'exactitude des réponses touristiques complètes ni de leurs citations.

- Avant : 26/36, après : 34/36 ; les huit erreurs Castrocaro → Castro disparaissent.
- Deux échecs conservés : « Where can I buy ripe fruit? » sélectionne l'identifiant interne ripe dans les deux configurations. La suite renvoie volontairement un code de sortie 1 tant que ce défaut existe.
- deployment-intent.cjs : 18/18 ; weekly-intent-regression.cjs : 16/16. Ce dernier concerne toujours le module inactif.
- Médiane du temps analyze local sur cette exécution : 2,256 ms avant, 2,212 ms après. Une seule passe, ordre fixe, démarrage inclus, aucune conclusion de gain de latence. Aucun appel LLM dans ce banc ; coût monétaire et latence téléphone non mesurés.

Résultats détaillés : weekly-place-before-2026-11-13.json, weekly-place-after-2026-11-13.json, deployment-intent-2026-11-13.json, weekly-intent-2026-11-13.json.

Commandes :
```
node tests/weekly-place-regression.cjs
node tests/deployment-intent.cjs
node tests/weekly-intent-regression.cjs
node --check aracne-intelligence.js
```
Pour comparer sur le même jeu : extraire index.html et aracne-intelligence.js du commit de référence, puis lancer le premier test avec ARACNE_INDEX et ARACNE_ENGINE pointant vers ces fichiers. La base de connaissances demeure celle de main.

## Limites et priorité suivante
La correction empêche une attribution géographique erronée ; elle ne démontre pas encore une abstention finale correcte pour toute destination hors périmètre. Les contraintes sont représentées ici par des refus de parcours, pas par accessibilité, budget ou météo. Aucun nouveau contrôle de vérité des fiches ni d'actualité des sources externes.
Prochain passage : distinguer les identifiants techniques des alias touristiques (ripe, verde, alto…), puis tester execute sur réponses attendues et citations, abstention et filtres territoriaux. Conserver les deux échecs ouverts ; ne pas déployer cette branche automatiquement.
