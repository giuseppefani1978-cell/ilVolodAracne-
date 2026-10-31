const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({window:{},document:{querySelector:()=>null,getElementById:()=>null,querySelectorAll:()=>[]},console:{info(){},warn(){}},setTimeout,clearTimeout});
for(const file of ['aracne-knowledge.js','aracne-intelligence.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const places=JSON.parse(html.match(/const poiData = (\[.*?\]);/s)[1]);
let language='fr',routeCalls=0;
const engine=context.window.AracneIntelligence;
engine.connect({getLanguage:()=>language,getVoiceLanguage:()=>language,getPlaces:()=>places,createRouteFromText:async()=>{routeCalls++;return {ok:true,selected:[]}}});
const cases=[
 ['fr','Pas de parcours, parle-moi de Lecce puis Otranto',false],
 ['it','Non voglio un percorso, parlami di Lecce poi Otranto',false],
 ['en','No route, tell me about Lecce then Otranto',false],
 ['es','Sin ruta, háblame de Lecce luego Otranto',false],
 ['es','Háblame de la fruta en Lecce y Otranto',false],
 ['fr','Crée un parcours de Lecce à Otranto',true],
 ['it','Crea un percorso da Lecce a Otranto',true],
 ['en','Create a route from Lecce to Otranto',true],
 ['es','Crea una ruta de Lecce a Otranto',true],
];
(async()=>{
const results=[];
for(const [lang,input,expected] of cases){language=lang;engine.resetContext();routeCalls=0;const analysis=engine.analyze(input);const result=await engine.execute(input);results.push({lang,input,expected,intents:analysis.intents,routeCalls,answer:result.text?.slice(0,100),pass:analysis.intents.includes('route')===expected && (expected||routeCalls===0)});}
const legacy=JSON.parse(fs.readFileSync(path.join(root,'tests/aracne-regression-cases.json'),'utf8')).staticCases;
for(const c of legacy){language=c.lang;engine.resetContext();const a=engine.analyze(c.input);results.push({lang:c.lang,input:c.input,pass:c.expect.intents.every(i=>a.intents.includes(i)) && a.durationHours===c.expect.durationHours,intents:a.intents,durationHours:a.durationHours});}
console.log(JSON.stringify({passed:results.filter(x=>x.pass).length,total:results.length,results},null,2));process.exitCode=results.every(x=>x.pass)?0:1;
})();
