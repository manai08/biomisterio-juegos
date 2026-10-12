const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.createContext(context);
for(const f of ['questions.js','game-engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+f,'utf8'),context);
const bank=context.window.BIO_QUESTIONS,Game=context.window.BioGame,ids=[...new Set(bank.map(q=>q.theme))];Game.validate(bank,ids);
const counts={carbohidratos:16,lipidos:15,proteinas:10,nucleotidos:10,'acidos-nucleicos':10,vitaminas:10};
assert.equal(bank.length,71);for(const [id,count] of Object.entries(counts))assert.equal(bank.filter(q=>q.theme===id).length,count);
let runs=0;
for(const id of ids){const qs=bank.filter(q=>q.theme===id);for(const mode of ['all','none','mixed']){const g=new Game(qs);assert.equal(g.next(),false);let correctCount=0;for(let i=0;i<qs.length;i++){const q=g.current,correct=mode==='all'||(mode==='mixed'&&i%2===0);if(correct)correctCount++;const key=correct?q.correct:q.options.find(o=>o.key!==q.correct).key;assert.equal(g.answer('Z'),false);assert.equal(g.answer(key),true);const score=g.score;assert.equal(g.answer(q.correct),false);assert.equal(g.score,score);assert.equal(g.next(),true);}assert.equal(g.finished,true);assert.equal(g.score,Math.round(10000*correctCount/qs.length)/100);assert.equal(g.answer('A'),false);assert.equal(g.next(),false);g.reset();assert.equal(g.score,0);assert.equal(g.answers.length,0);assert.equal(g.index,0);assert.equal(g.selected,null);assert.equal(g.finished,false);runs++;}}
for(const q of bank){const reordered={...q,options:[...q.options].reverse()};const g=new Game([reordered]);assert.equal(g.answer(q.correct),true);assert.equal(g.score,100);}
assert.deepEqual(Array.from(bank.filter(q=>q.theme==='carbohidratos').slice(10),q=>q.correct),['B','C','D','A','B','C']);
assert.deepEqual(Array.from(bank.filter(q=>q.theme==='lipidos').slice(10),q=>q.correct),['C','D','C','D','C']);
let feedback=0;for(const q of bank.filter(q=>q.optionFeedback)){assert.equal(Object.keys(q.optionFeedback).length,4);for(const o of q.options){assert.ok(q.optionFeedback[o.key]);const g=new Game([q]);g.answer(o.key);assert.equal(g.correctCount,o.key===q.correct?1:0);feedback++;}}
assert.equal(feedback,48);
assert.throws(()=>Game.validate(bank.slice(1),ids));assert.throws(()=>Game.validate(bank.map((q,i)=>i?q:{...q,correct:'Z'}),ids));
const original=JSON.parse(fs.readFileSync(__dirname+'/original-bank.json','utf8'));
for(const q of original)if(q.id!=='LÍP-04')assert.deepEqual(JSON.parse(JSON.stringify(bank.find(x=>x.id===q.id))),q,q.id);
const approval=JSON.parse(fs.readFileSync(__dirname+'/lipidos-aprobados.json','utf8'));
const old=original.find(x=>x.id==='LÍP-04'),updated=bank.find(x=>x.id==='LÍP-04');
for(const k of ['question','id','theme','correct','tag'])assert.equal(updated[k],old[k]);
for(const key of ['A','C','D'])assert.deepEqual(JSON.parse(JSON.stringify(updated.options.find(x=>x.key===key))),old.options.find(x=>x.key===key));
assert.equal(updated.options.find(x=>x.key==='B').text,approval.correction.optionB);assert.equal(updated.feedback,approval.correction.feedback);assert.deepEqual(JSON.parse(JSON.stringify(updated.optionFeedback)),approval.correction.optionFeedback);
for(const approved of approval.adds){const q=bank.find(x=>x.id===approved.id);assert.equal(q.question,approved.question);assert.equal(q.correct,approved.correct);for(let i=0;i<4;i++){assert.equal(q.options[i].key,'ABCD'[i]);assert.equal(q.options[i].text,approved.options[i]);assert.equal(q.optionFeedback['ABCD'[i]],approved.feedback[i]);}}
console.log('PASS: 71 preguntas, 18 partidas, puntuación proporcional (mixta de lípidos 53,33), bloqueo, reinicio, 71 claves estables, 48 feedback y rechazo de banco inválido.');
console.log('PASS: 59 preguntas originales idénticas; LÍP-04 solo cambios aprobados; cinco incorporaciones idénticas al texto aprobado; orden A/B/C/D fijo.');
