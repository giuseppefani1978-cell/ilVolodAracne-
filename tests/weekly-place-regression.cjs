const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {performance}=require('node:perf_hooks');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(process.env.ARACNE_INDEX || path.join(root,'index.html'),'utf8');
const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'weekly-place-cases.json'),'utf8'));
const results=[];
for(const mode of ['pwa','fallback']) {
 const ctx=vm.createContext({window:{},document:{querySelector:()=>null,getElementById:()=>null,querySelectorAll:()=>[]},console:{info(){},warn(){}},setTimeout,clearTimeout});
 vm.runInContext(html.match(/const poiData = (\[.*?\]);/s)[0]+ '\nfunction getPoi(id){return poiData.find(p=>p.id===id)}\n'+html.match(/function normalizeAssistantText\(value\)\{[^\n]+/)[0]+'\n'+html.slice(html.indexOf('const assistantAliases='),html.indexOf('function detectAssistantMode')),ctx);
 for(const file of ['aracne-knowledge.js','aracne-intelligence.js'])vm.runInContext(fs.readFileSync(file==='aracne-intelligence.js' && process.env.ARACNE_ENGINE || path.join(root,file),'utf8'),ctx);
 const engine=ctx.window.AracneIntelligence;let language='fr';
 engine.connect({getLanguage:()=>language,getVoiceLanguage:()=>language,getPlaces:()=>vm.runInContext('poiData',ctx),...(mode==='pwa'?{findPlaces:ctx.findMentionedPois}:{})});
 for(const c of cases){language=c.lang;engine.resetContext();const start=performance.now();const a=engine.analyze(c.input);const ms=performance.now()-start;const actual=a.explicitPlaces.map(p=>p.id).sort();const expected=[...c.expectedPlaces].sort();results.push({id:c.id,mode,input:c.input,expected,actual,ms,pass:JSON.stringify(actual)===JSON.stringify(expected)});}
}
console.log(JSON.stringify({passed:results.filter(r=>r.pass).length,total:results.length,metric:'Exactitude des objets explicitement reconnus, pas qualité de réponse',results},null,2));process.exitCode=results.every(r=>r.pass)?0:1;
