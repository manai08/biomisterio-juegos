const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.createContext(context);
for(const f of ['questions.js','game-engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+f,'utf8'),context);
const bank=context.window.BIO_QUESTIONS,Game=context.window.BioGame,ids=[...new Set(bank.map(q=>q.theme))];Game.validate(bank,ids);
let runs=0;
for(const id of ids){const qs=bank.filter(q=>q.theme===id);for(const mode of ['all','none','mixed']){const g=new Game(qs);assert.equal(g.next(),false);for(let i=0;i<10;i++){const q=g.current,correct=mode==='all'||(mode==='mixed'&&i%2===0);const key=correct?q.correct:q.options.find(o=>o.key!==q.correct).key;assert.equal(g.answer(key),true);const score=g.score;assert.equal(g.answer(q.correct),false);assert.equal(g.score,score);assert.equal(g.next(),true);}assert.equal(g.finished,true);assert.equal(g.score,mode==='all'?100:mode==='none'?0:50);g.reset();assert.equal(g.score,0);assert.equal(g.answers.length,0);assert.equal(g.index,0);assert.equal(g.selected,null);assert.equal(g.finished,false);runs++;}}
for(const q of bank){const reordered={...q,options:[...q.options].reverse()};const g=new Game([reordered]);assert.equal(g.answer(q.correct),true);assert.equal(g.score,10);}
assert.throws(()=>Game.validate(bank.slice(1),ids));assert.throws(()=>Game.validate(bank.map((q,i)=>i? q:{...q,correct:'Z'}),ids));
console.log(`PASS: 60 preguntas; ${runs} partidas (100, 0 y 50 puntos); bloqueo; reinicio; 60 claves tras reordenar; rechazo de banco inválido.`);

