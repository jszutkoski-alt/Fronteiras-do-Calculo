// Focused verification of curriculum consistency, progression and migration.
const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('node:assert/strict'),ts=require('typescript');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...rest){return resolve.call(this,request.startsWith('@/')?path.join(root,request.slice(2)):request,parent,...rest)};
require.extensions['.ts']=function(module,file){const source=fs.readFileSync(file,'utf8');module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file)};
const {stops,stopStatus,skills}=require('../content/stops.ts');
const {lessons,questionBank}=require('../content/catalog.ts');
const {initial,applyRun,createRun,migrate,masteryBySkill,buildChallenge,reviewStatus}=require('../lib/game/state.ts');
const {isCorrect,evaluate}=require('../lib/game/evaluation.ts');const katex=require('katex');
assert.equal(stops.length,22);assert.equal(Object.keys(lessons).length,22);assert.equal(questionBank.length,110);assert.equal(new Set(questionBank.map(q=>q.id)).size,110);
let formulaCount=0;
for(const stop of stops){const l=lessons[stop.id];assert(l&&l.character&&l.intro&&l.visual);assert(l.steps.length>=3&&l.example.length>=3);assert.equal(l.questions.length,5);for(const s of [...l.steps,...l.example]){assert(s.title&&s.text&&s.formula);katex.renderToString(s.formula,{throwOnError:true});formulaCount++}for(const q of l.questions){assert.equal(q.stopId,stop.id);assert(q.hint&&q.explanation&&q.solution);assert(isCorrect(q,q.answer));if(q.type==='choice'){assert(q.options[Number(q.answer)]);assert.equal(new Set(q.options).size,q.options.length)}else {assert(Number.isFinite(Number(q.answer)));assert(!isCorrect(q,''));assert(!isCorrect(q,'not a number'))}if(q.formula)katex.renderToString(q.formula,{throwOnError:true})}}
// All 22 stops unlock sequentially from a genuinely new profile.
let state=structuredClone(initial);assert.equal(stops.filter(s=>stopStatus(s,state.completed)==='available').length,1);
for(let i=0;i<stops.length;i++){const stop=stops[i];assert.equal(stopStatus(stop,state.completed),'available');for(const future of stops.slice(i+1))assert.equal(stopStatus(future,state.completed),'locked');const bank=buildChallenge(state,stop.id,'duel');assert.equal(bank.length,5);assert(new Set(bank.map(q=>q.id)).size===5);const records=bank.map(q=>({questionId:q.id,stopId:q.stopId,skill:q.skill,correct:true,firstCorrect:true,attempts:1}));state=applyRun(state,createRun(records,'duel',stop.id));assert.equal(state.completed.length,i+1)}
assert.equal(state.stars,66);assert.equal(state.history.length,22);for(const s of skills){const m=masteryBySkill(state)[s];assert.equal(m.score,100);assert.equal(m.covered,m.total)}
// Replays must preserve best stars, failed attempts cannot unlock another stop.
const fail=lessons['stop-0'].questions.map(q=>({questionId:q.id,stopId:q.stopId,skill:q.skill,correct:false,firstCorrect:false,attempts:2}));assert.equal(evaluate(fail).passed,false);const failed=applyRun(state,createRun(fail,'duel','stop-0'));assert.equal(failed.stars,66);assert.equal(failed.completed.length,22);
const partial=fail.map((r,i)=>({...r,correct:i<3,firstCorrect:i<3}));assert.equal(evaluate(partial).passed,false);partial[3].correct=true;assert.equal(evaluate(partial).passed,true);
// Legacy Mirante completion remains intact without crediting unrelated stops.
const legacy=migrate({version:1,completed:['mirante'],stars:2,history:[],lessonStep:7,mastery:80});assert.deepEqual(legacy.completed,['mirante']);assert.equal(legacy.starsByStop.mirante,2);assert.equal(legacy.lessonSteps.mirante,7);assert.equal(stopStatus(stops[0],legacy.completed),'available');assert.equal(stopStatus(stops[7],legacy.completed),'available');assert.deepEqual(migrate(legacy),legacy);
assert.deepEqual(applyRun(state,createRun(fail,'preview','stop-0')),state);
assert.equal(buildChallenge(initial,null,'training').length,0);assert.equal(buildChallenge(state,null,'training').length,5);
const old=structuredClone(state);old.history[0].date='2020-01-01T00:00:00.000Z';assert(reviewStatus(old,old.history[0].records[0].questionId,Date.parse('2030-01-01')).due);
assert(isCorrect({type:'numeric',answer:'2.1'},'2,1'));
console.log(`Verified ${stops.length} lessons, ${questionBank.length} questions, ${formulaCount} step formulas, all unlocks, mastery, replay, review and legacy migration.`);
// Every distinct explorer must render a mathematical graph with finite geometry.
require.extensions['.tsx']=function(module,file){module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file)};
require.extensions['.css']=()=>{};
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');const Explorer=require('../components/game/Explorer.tsx').default;
const modes=[...new Set(Object.values(lessons).map(l=>l.visual))].filter(v=>v!=='secant');
for(const mode of modes){const html=renderToStaticMarkup(React.createElement(Explorer,{mode}));assert(html.includes('<svg'));assert(!html.includes('katex-error'),mode);assert(!/\b(?:NaN|Infinity)\b/.test(html),mode);assert(html.includes('CADERNO DE CAMPO'),mode)}
console.log(`Verified finite SVG geometry and formula rendering for ${modes.length} new interactive explorers.`);
// All authored inline math must parse, and plain prose must stay outside TeX.
let inlineCount=0;
function verifyInline(value){if(Array.isArray(value))return value.forEach(verifyInline);if(value&&typeof value==='object')return Object.entries(value).filter(([k])=>k!=='formula').forEach(([,v])=>verifyInline(v));if(typeof value!=='string')return;assert.equal((value.match(/\$/g)||[]).length%2,0,value);for(const match of value.matchAll(/\$([^$]+)\$/g)){assert(!/\b(?:taxa|na|então|função)\b/.test(match[1]),value);katex.renderToString(match[1],{throwOnError:true,strict:'error'});inlineCount++;}}
verifyInline(lessons);
const RichText=require('../components/game/RichText.tsx').default;
const mixed=renderToStaticMarkup(React.createElement(RichText,{children:'Para $f(x)=\\frac{1}{x}$, tome $x\\ne0$.'}));assert(mixed.includes('class="katex"'));assert(mixed.startsWith('Para '));assert(!mixed.includes('$'));
console.log(`Verified ${inlineCount} inline formulas and mixed prose rendering.`);
const {characterPortraits}=require('../content/characters.ts');
for(const lesson of Object.values(lessons)){const asset=characterPortraits[lesson.character];assert(asset,lesson.character);assert(fs.existsSync(path.join(root,'public',asset)),asset)}
assert.equal(new Set(Object.values(characterPortraits)).size,21);
console.log('Verified a portrait asset for every character in all 22 stops.');
