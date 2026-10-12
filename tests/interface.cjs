// DOM contract tests; these do not replace browser/layout or physical-phone QA.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
class Element {
 constructor(tag){this.tag=tag;this.children=[];this.attrs={};this.dataset={};this.handlers={};this.style={setProperty(){}};this.className='';this._text='';this.classList={add:(...xs)=>{this.className+=' '+xs.join(' ');}};}
 set textContent(x){this._text=String(x);this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join('');}
 append(...nodes){for(const node of nodes){node.parent=this;this.children.push(node);}}
 replaceChildren(...nodes){this.children=[];this._text='';this.append(...nodes);}
 setAttribute(k,v){this.attrs[k]=String(v);}removeAttribute(k){delete this.attrs[k];}
 addEventListener(type,fn){this.handlers[type]=fn;}focus(){Element.focused=this;}scrollIntoView(){}
 remove(){this.parent.children=this.parent.children.filter(x=>x!==this);}showModal(){this.open=true;}close(){this.open=false;this.handlers.close?.();}
 querySelector(s){return this.querySelectorAll(s)[0]||null;}
 querySelectorAll(s){let all=[];for(const child of this.children){if(s.startsWith('.')?child.className.split(/\s+/).includes(s.slice(1)):child.tag===s)all.push(child);all.push(...child.querySelectorAll(s));}return all;}
}
function boot(theme='carbohidratos'){
 const root=new Element('main'),body=new Element('body');body.append(root);
 const document={body,createElement:t=>new Element(t),querySelector:s=>s==='#app'?root:body.querySelector(s),querySelectorAll:s=>body.querySelectorAll(s)};
 const c={document,window:{matchMedia:()=>({matches:true,addEventListener(){}})},location:{search:'?tema='+theme},URLSearchParams,console};c.window.window=c.window;vm.createContext(c);
 for(const file of ['questions.js','game-engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+file,'utf8'),c);c.BioGame=c.window.BioGame;c.BIO_QUESTIONS=c.window.BIO_QUESTIONS;vm.runInContext(fs.readFileSync(__dirname+'/../app.js','utf8'),c);
 return {root,c,run:code=>vm.runInContext(code,c)};
}
const {root,run}=boot();assert.match(root.textContent,/Pregunta 1 de 16/);assert.equal(root.querySelectorAll('.step').length,16);
for(let i=0;i<16;i++){
 assert.match(root.textContent,new RegExp(`Pregunta ${i+1} de 16`));
 const q=run('game.current');if(i>=10){for(const option of q.options){run('game.selected=null;game.answers=game.answers.slice(0,game.index);');run(`game.answer('${option.key}');render()`);assert.match(root.textContent,new RegExp(q.optionFeedback[option.key].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.equal(root.querySelectorAll('.option').every(b=>b.disabled),true);}}
 run('game.selected=null;game.answers=game.answers.slice(0,game.index);game.answer(game.current.correct);render();');assert.match(root.querySelector('.score').textContent,/100 puntos/);
 if(q.figure){const image=root.querySelector('.question-figure').querySelector('img');image.handlers.error();assert.equal(image.hidden,true);const detail=root.querySelector('details');assert.equal(detail.open,true);assert.ok(detail.textContent.includes(q.figure.description));assert.equal(run('game.questions.length'),16);}
 run('game.next();render();');
}
assert.match(root.textContent,/16 aciertos de 16 preguntas/);assert.match(root.textContent,/100 puntos/);root.querySelectorAll('button').find(x=>x.textContent==='Repetir desafío').onclick();assert.match(root.textContent,/Pregunta 1 de 16/);assert.equal(run('game.score'),0);
run('game.index=10;render();');root.querySelector('.figure-enlarge').onclick();assert.equal(run('document.body.querySelector("dialog").open'),true);run('document.body.querySelector("dialog").close();');assert.equal(run('document.body.querySelector("dialog")'),null);assert.equal(Element.focused,root.querySelector('.figure-enlarge'));
for(const id of ['lipidos','proteinas','nucleotidos','acidos-nucleicos','vitaminas']){const t=boot(id);assert.match(t.root.textContent,new RegExp('Pregunta 1 de '+(id==='lipidos'?15:10)));assert.equal(t.root.querySelectorAll('.step').length,id==='lipidos'?15:10);t.run('game.answer(game.current.correct);render();');assert.match(t.root.textContent,id==='lipidos'?/¡Correcto! \+6,67 puntos/:/¡Correcto! \+10 puntos/);}
console.log('PASS: DOM simulado: 16 pantallas, 24 feedback, bloqueo, resultado, reinicio, diálogo/cierre/foco, 5 fallos de imagen con descripción equivalente y cinco temas originales. No sustituye QA visual.');

// Approved lipid expansion: real answer-key mappings, progress, figures and specific feedback.
const lip=boot('lipidos');let lipFeedback=0;
for(let i=0;i<15;i++){
 assert.match(lip.root.textContent,new RegExp('Pregunta '+(i+1)+' de 15'));
 const q=lip.run('game.current');
 if(q.optionFeedback)for(const option of q.options){
  lip.run('game.selected=null;game.answers=game.answers.slice(0,game.index);');
  lip.run("game.answer('"+option.key+"');render();");
  assert.ok(lip.root.textContent.includes(q.optionFeedback[option.key]));assert.equal(lip.root.querySelectorAll('.option').every(b=>b.disabled),true);lipFeedback++;
 }
 lip.run('game.selected=null;game.answers=game.answers.slice(0,game.index);game.answer(game.current.correct);render();');
 if(q.figure){const image=lip.root.querySelector('.question-figure').querySelector('img');image.handlers.error();assert.equal(image.hidden,true);assert.equal(lip.root.querySelector('details').open,true);assert.equal(lip.run('game.questions.length'),15);}
 lip.run('game.next();render();');
}
assert.equal(lipFeedback,24);assert.match(lip.root.textContent,/15 aciertos de 15 preguntas/);assert.match(lip.root.textContent,/100 puntos/);
console.log('PASS: DOM de lípidos: 15 pantallas, 24 feedback, puntaje 6,67, 2 figuras con fallback y resultado de 100 puntos.');
