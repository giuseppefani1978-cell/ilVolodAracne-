# Passage du 20 novembre 2026
Base cumulative : 58fdcc889d57c8872271fbc2674675b2c6ccb949 (branche du 13 novembre). Main vérifié : 47be31086bcbbf19391e8fdef9ce2416885a6ac4. Le HTML public charge toujours intelligence 1.1.9 et knowledge 1.0.0 ; intent-v130 reste inactif. Vérification HTTP du HTML seulement ce jour.

Défaut reproduit : les identifiants internes ripe, verde et alto sont reconnus dans des phrases ordinaires sans lieu. Correction ciblée : ces trois identifiants seuls ne constituent plus un alias dans le secours getPlaces ; les noms complets restent reconnus. Version proposée 1.1.11, URL correspondante préparée. Les modifications du 13 novembre sont conservées. Aucun déploiement ni modification de main.

Banc stable enrichi de sept questions (noms complets dans quatre langues et mots ambigus). 25 questions dans deux configurations : adaptateur PWA extrait du vrai HTML et secours. Même jeu avant/après : 42/50 → 50/50. Les 36 contrôles du passage précédent sont conservés, y compris ripe fruit. deployment-intent : 18/18 ; weekly-intent-regression : 16/16 (module inactif). Syntaxe Node valide. Résultats JSON datés joints.

Sources des attentes : catalogue poiData dans index.html ; aucun fait touristique externe ajouté. Cette correction est une liste conservatrice de trois collisions constatées, pas une résolution générale de toutes les ambiguïtés. Aucun test téléphone ni vérification des réponses complètes/citations. Les durées brutes analyze sont enregistrées mais aucune conclusion de performance n'est tirée ; coût monétaire non mesuré, aucun LLM appelé par le banc.

Reproduction : node tests/weekly-place-regression.cjs ; pour la référence utiliser ARACNE_ENGINE pointant sur aracne-intelligence.js du commit 58fdcc8. Puis node tests/deployment-intent.cjs et node tests/weekly-intent-regression.cjs.

Priorité suivante : étendre les contrôles à execute, abstention finale et sources effectivement rendues ; inventorier les autres identifiants ambigus avant généralisation. Aucun gain de qualité globale du RAG revendiqué.
