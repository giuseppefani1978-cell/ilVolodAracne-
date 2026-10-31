const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const cases = [
  ['fr-negation', 'fr', 'Pas de parcours, parle-moi de Lecce puis Otranto', false],
  ['it-negation', 'it', 'Non voglio un percorso, parlami di Lecce poi Otranto', false],
  ['en-negation', 'en', 'No route, tell me about Lecce then Otranto', false],
  ['es-negation', 'es', 'Sin ruta, háblame de Lecce luego Otranto', false],
  ['fr-sequence', 'fr', 'Lecce puis Otranto', true],
  ['it-sequence', 'it', 'Lecce poi Otranto', true],
  ['en-sequence', 'en', 'Lecce then Otranto', true],
  ['es-sequence', 'es', 'Lecce luego Otranto', true],
  ['fr-substring', 'fr', 'Parle-moi de la préparation à Lecce et Otranto', false],
  ['it-substring', 'it', 'Parlami della panna a Lecce e Gallipoli', false],
  ['en-substring', 'en', 'Tell me about craftsmanship in Lecce and Otranto', false],
  ['es-substring', 'es', 'Háblame de la fruta en Lecce y Otranto', false],
  ['fr-explicit', 'fr', 'Crée un parcours de Lecce à Otranto', true],
  ['it-explicit', 'it', 'Crea un percorso da Lecce a Otranto', true],
  ['en-explicit', 'en', 'Create a route from Lecce to Otranto', true],
  ['es-explicit', 'es', 'Crea una ruta de Lecce a Otranto', true],
];
const context = vm.createContext({window:{}, console:{info(){}}});
vm.runInContext(fs.readFileSync(path.join(root,'aracne-knowledge.js'),'utf8'), context);
// Only the parser is measured: browser UI and base execution are not exercised.
context.window.AracneIntelligence = {execute:async()=>({})};
vm.runInContext(fs.readFileSync(path.join(root,'aracne-intent-v130.js'),'utf8'), context);
const parser = context.window.AracneIntent130;
const results = cases.map(([id,language,input,expectedRoute])=>{
  const territories=parser.orderedTerritories(input,language);
  const intents=parser.detectIntents(input,language,territories).map(x=>x.name);
  return {id,language,input,expectedRoute,intents,pass:intents.includes('route')===expectedRoute};
});
console.log(JSON.stringify({scope:'intent parser with real territorial knowledge base; not end-to-end RAG',passed:results.filter(x=>x.pass).length,total:results.length,results},null,2));
process.exitCode=results.every(x=>x.pass)?0:1;
