'use strict';
const themes=[
 {id:'carbohidratos',name:'Carbohidratos',title:'Cuidado con la lava',icon:'♨',color:'#bd3c24',pale:'#fff0e7',steps:'Cruza la ruta',motif:'●'},
 {id:'lipidos',name:'Lípidos',title:'Ruta de la membrana',icon:'◉',color:'#087f80',pale:'#e6f6f5',steps:'Explora la membrana',motif:'◉'},
 {id:'proteinas',name:'Proteínas',title:'Pliega la proteína',icon:'〰',color:'#7645b8',pale:'#f1eafa',steps:'Recorre la cadena',motif:'◆'},
 {id:'nucleotidos',name:'Nucleótidos',title:'Arma el nucleótido',icon:'⬡',color:'#2264ac',pale:'#e9f2ff',steps:'Reúne las piezas',motif:'⬡'},
 {id:'acidos-nucleicos',name:'Ácidos nucleicos',title:'Reconstruye la doble hélice',icon:'≋',color:'#ad3570',pale:'#fcebf3',steps:'Completa el recorrido',motif:'≋'},
 {id:'vitaminas',name:'Vitaminas',title:'Laboratorio de vitaminas',icon:'✦',color:'#796000',pale:'#fff7d3',steps:'Visita las estaciones',motif:'▣'}
];
// Escenas vectoriales decorativas: no son modelos de procesos moleculares.
const adventures = {
  carbohidratos: {ready:'¡Prepárate para saltar!',hint:'Cada acierto te lleva al otro lado.',win:'¡Muy bien! ¡Superaste la lava!',lose:'¡Uy, salió lava!',help:'Tu explorador está a salvo. Lee la pista y continúa.'},
  lipidos: {ready:'¡Vamos por la ruta de la membrana!',hint:'Una respuesta correcta, un nuevo tramo.',win:'¡Genial! ¡Cruzaste la ruta!',lose:'¡Ups, una ola de burbujas!',help:'Seguimos a flote. La explicación te dará una pista.'},
  proteinas: {ready:'¡Una cadena por explorar!',hint:'Descubre sus pliegues con cada acierto.',win:'¡Muy bien! ¡Un pliegue conseguido!',lose:'¡Ups, un enredo en el camino!',help:'Vamos paso a paso. Lee la explicación y sigue explorando.'},
  nucleotidos: {ready:'¡A reunir las piezas!',hint:'Base, pentosa y fosfato te esperan.',win:'¡Súper! ¡Las piezas encajan!',lose:'¡Uy, se movieron las piezas!',help:'No pasa nada. Revisa la pista para el siguiente reto.'},
  'acidos-nucleicos': {ready:'¡En marcha, equipo ADN!',hint:'Descubre la doble hélice con cada acierto.',win:'¡Fantástico! ¡Otro tramo de hélice!',lose:'¡Ups, un tramo suelto!',help:'La aventura continúa. La explicación te ayudará.'},
  vitaminas: {ready:'¡Bienvenido al laboratorio!',hint:'Enciende la alegría con cada descubrimiento.',win:'¡Muy bien! ¡El laboratorio brilla!',lose:'¡Puf! Una nube de sorpresa.',help:'Todo está a salvo. Lee la explicación y sigue aprendiendo.'}
};
let motionAllowed = true;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function mascot() {
  return `<g class="mascot-shadow"><ellipse cx="0" cy="4" rx="29" ry="6" fill="#163946" opacity=".17"/></g>
  <g class="traveller"><g class="mascot">
    <path class="arm arm-left" d="M-22-40Q-38-39-40-24" fill="none" stroke="#16867c" stroke-width="12" stroke-linecap="round"/>
    <path class="arm arm-right" d="M22-40Q38-39 40-24" fill="none" stroke="#16867c" stroke-width="12" stroke-linecap="round"/>
    <path d="M-13-16V-3M13-16V-3" stroke="#254657" stroke-width="12" stroke-linecap="round"/>
    <path d="M-22 0h14M8 0h14" stroke="#ffc65c" stroke-width="11" stroke-linecap="round"/>
    <rect x="-25" y="-52" width="50" height="38" rx="15" fill="#24bba4" stroke="#176a66" stroke-width="2.5"/>
    <rect x="-14" y="-43" width="28" height="19" rx="7" fill="#e4fff4"/>
    <path d="M-5-33h10M0-38v10" stroke="#24897b" stroke-width="3" stroke-linecap="round"/>
    <path d="M0-75v-10" stroke="#225362" stroke-width="3"/><circle cx="0" cy="-88" r="5" fill="#ffca60"/>
    <rect x="-29" y="-77" width="58" height="38" rx="17" fill="#e6fff6" stroke="#225362" stroke-width="3"/>
    <circle cx="-12" cy="-60" r="4.5" fill="#173947"/><circle cx="12" cy="-60" r="4.5" fill="#173947"/>
    <circle cx="-13" cy="-61" r="1.5" fill="white"/><circle cx="11" cy="-61" r="1.5" fill="white"/>
    <ellipse cx="-20" cy="-53" rx="4" ry="2" fill="#f6a39b"/><ellipse cx="20" cy="-53" rx="4" ry="2" fill="#f6a39b"/>
    <path class="smile" d="M-5-51Q0-46 5-51" fill="none" stroke="#245260" stroke-width="2.5" stroke-linecap="round"/>
    <path class="surprise" d="M-3-50a3 3 0 1 0 6 0a3 3 0 1 0-6 0" fill="#245260"/>
  </g></g>`;
}
function confetti() {
  return `<g class="celebration">${Array.from({length:14},(_,i)=>`<g class="confetti" style="--delay:${(i%5)*.08}s" transform="translate(${40+i*40} ${25+(i%3)*13})"><path d="M-4 0h8M0-4v8" stroke="${['#ef8050','#27a795','#8d69df','#e7b52f'][i%4]}" stroke-width="3" stroke-linecap="round"/></g>`).join('')}</g>`;
}
function lavaScene(){return `
  <rect width="600" height="190" fill="#fff0e0"/><circle cx="510" cy="44" r="22" fill="#ffcc78"/>
  <path d="M0 113L69 38l57 72 55-33 67 56 74-46 81 39 77-57 120 61v60H0" fill="#f1c9ad"/>
  <path d="M0 152Q53 133 100 151T200 151T300 151T400 151T500 151T600 151V190H0" fill="#ec6840"/>
  <path class="lava-ripple" d="M0 170Q50 156 100 170T200 170T300 170T400 170T500 170T600 170" fill="none" stroke="#ffcc55" stroke-width="8"/>
  <g class="lava-burst"><path d="M280 162c-29-20-15-47-4-62-2 23 11 24 10 6 21 19 47 44 17 56" fill="#f57827"/><path d="M285 161q-14-17 4-36 0 17 10 16 12 17-14 20" fill="#ffda64"/><circle cx="272" cy="88" r="5" fill="#ffad41"/><circle cx="316" cy="112" r="4" fill="#f67a29"/></g>
  <path d="M48 149l20-16h74l20 16-14 23H65zM426 149l20-16h75l21 16-14 23h-91z" fill="#68667b" stroke="#4c5065" stroke-width="3"/>
  <path d="M70 141h63M449 141h61" stroke="#b4aab2" stroke-width="5" stroke-linecap="round"/>
  <g transform="translate(108 135)">${mascot()}</g><g class="finish-flag" transform="translate(550 87)"><path d="M0 0v50" stroke="#6e5964" stroke-width="4"/><path d="M1 0h26l-9 12 9 12H1" fill="#33ab82"/><path d="m7 12 4 4 9-10" stroke="white" stroke-width="3" fill="none"/></g>`;}
function lipidScene(){return `
  <rect width="600" height="190" fill="#e1f6f4"/><path d="M0 109Q90 80 170 104t180 0t250 2V190H0" fill="#bde9df"/>
  <path d="M0 157Q100 141 200 157t200 0t200 0v33H0" fill="#73cfc5"/>
  ${Array.from({length:17},(_,i)=>{const x=14+i*35;return `<g opacity=".65"><path d="M${x-4} 32v16m8-16v16M${x-4} 70V54m8 16V54" stroke="#72a7a0" stroke-width="3"/><circle cx="${x}" cy="26" r="9" fill="#46b7ae"/><circle cx="${x}" cy="76" r="9" fill="#46b7ae"/></g>`;}).join('')}
  <g class="bubble-storm">${Array.from({length:7},(_,i)=>`<circle class="bubble" style="--delay:${i*.07}s" cx="${220+i*24}" cy="${132-(i%3)*19}" r="${8+i%3*3}" fill="#f2fffb" stroke="#43a5a1" stroke-width="2"/>`).join('')}</g>
  <path d="M52 149q58-17 113 0l-9 12H60zM422 149q58-17 113 0l-9 12h-96z" fill="#24968d"/>
  <g transform="translate(108 143)">${mascot()}</g><path d="m545 127 8 15 17 3-12 11 2 17-15-8-15 8 2-17-12-11 17-3z" fill="#f5be51"/>`;}
function proteinScene(){return `
  <rect width="600" height="190" fill="#f1eafa"/><circle cx="505" cy="70" r="70" fill="#e6d9f7"/><path d="M0 172Q100 151 200 172t200 0t200 0v18H0" fill="#d7c1ef"/>
  <g class="chain-open"><path d="M223 120Q250 40 290 100t70 0t70 0t70-15" fill="none" stroke="#a780cf" stroke-width="11" stroke-linecap="round"/>${[[223,120],[253,80],[289,100],[325,122],[359,100],[395,80],[430,100],[468,118],[500,85]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="12" fill="${['#ffb36e','#9073d1','#53b5b2'][i%3]}" stroke="#fff" stroke-width="3"/>`).join('')}</g>
  <g class="chain-folded"><path d="M258 114C240 46 395 44 453 84S425 151 329 134 315 69 398 93 405 125 366 110" stroke="#956ccd" stroke-width="11" fill="none" stroke-linecap="round"/>${[[258,114],[274,78],[320,65],[365,65],[416,72],[453,84],[453,124],[408,139],[365,138],[329,134],[316,103],[348,88],[398,93],[411,118],[366,110]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="11" fill="${['#ffb36e','#9073d1','#53b5b2'][i%3]}" stroke="#fff" stroke-width="3"/>`).join('')}</g>
  <g class="oops-mark" transform="translate(513 50)"><circle r="19" fill="#fff1df"/><text y="8" text-anchor="middle" fill="#a76527" font-size="25" font-weight="bold">?</text></g>
  <g transform="translate(108 154)">${mascot()}</g>`;}
function nucleotideScene(){return `
  <rect width="600" height="190" fill="#e8f2ff"/><path d="M0 172h600v18H0" fill="#bbd7f2"/>
  <g class="assembly-lines"><path d="M318 101h41m44 0h38" stroke="#4675a1" stroke-width="5" stroke-linecap="round"/></g>
  <g class="assembly-token phosphate"><circle cx="279" cy="101" r="30" fill="#ffd785" stroke="#bd8d35" stroke-width="2"/><text x="279" y="107" text-anchor="middle" font-size="16" fill="#634920">Fosfato</text></g>
  <g class="assembly-token sugar"><path d="m388 65 36 26-14 43h-44l-14-43z" fill="#8bcdc6" stroke="#277f85" stroke-width="2"/><text x="388" y="108" text-anchor="middle" font-size="16" fill="#205760">Pentosa</text></g>
  <g class="assembly-token base"><rect x="452" y="72" width="73" height="58" rx="15" fill="#bca9e8" stroke="#785bab" stroke-width="2"/><text x="488" y="108" text-anchor="middle" font-size="16" fill="#503f7c">Base</text></g>
  <g transform="translate(108 155)">${mascot()}</g>`;}
function dnaScene(){return `
  <rect width="600" height="190" fill="#fbeaf3"/><circle cx="530" cy="35" r="75" fill="#f6d7e9"/><path d="M0 172h600v18H0" fill="#ecc4df"/>
  <g class="helix"><path d="M226 62C290 151 320 151 382 62S474-25 540 62" transform="translate(0 25)" fill="none" stroke="#b664a0" stroke-width="7"/><path d="M226 132C290 43 320 43 382 132S474 219 540 132" transform="translate(0 -25)" fill="none" stroke="#559bc0" stroke-width="7"/>
  ${Array.from({length:9},(_,i)=>{const x=240+i*33,y1=87+Math.sin(i/8*Math.PI*2)*43,y2=107-Math.sin(i/8*Math.PI*2)*43;return `<g class="base-pair" style="--delay:${i*.055}s"><path d="M${x} ${y1}V${y2}" stroke="${i%2?'#8ac2a2':'#e6ac61'}" stroke-width="9" stroke-linecap="round"/><circle cx="${x}" cy="${y1}" r="5" fill="#b664a0"/><circle cx="${x}" cy="${y2}" r="5" fill="#559bc0"/></g>`;}).join('')}
  </g><g class="dna-key" fill="#77526b" font-size="15"><text x="245" y="169">ADN · A–T / G–C</text></g><g transform="translate(108 156)">${mascot()}</g>`;}
function vitaminScene(){return `
  <rect width="600" height="190" fill="#fff5d9"/><rect x="231" y="29" width="313" height="12" rx="5" fill="#dec585"/>
  <path d="M195 162h366" stroke="#ad9060" stroke-width="10" stroke-linecap="round"/>
  ${[0,1,2].map((i)=>{const x=260+i*109;return `<g class="flask flask-${i}"><path d="M${x-12} 60v32l-27 47q-7 15 10 15h58q17 0 10-15l-27-47V60" fill="#fffdf5" stroke="#707f80" stroke-width="3"/><path class="liquid" d="M${x-23} 114l-14 25q-5 11 8 11h58q13 0 8-11l-14-25z" fill="${['#58c2ad','#9c8fd9','#f3a466'][i]}"/><path d="M${x-15} 59h30" stroke="#707f80" stroke-width="5" stroke-linecap="round"/><text x="${x}" y="137" text-anchor="middle" fill="#25494c" font-size="19" font-weight="bold">${['B','C','D'][i]}</text><circle class="lab-bubble" style="--delay:${i*.16}s" cx="${x-4}" cy="103" r="5" fill="${['#58c2ad','#9c8fd9','#f3a466'][i]}"/></g>`;}).join('')}
  <g class="lab-puff" fill="#e5bd8d" opacity=".9"><circle cx="370" cy="53" r="19"/><circle cx="394" cy="44" r="24"/><circle cx="416" cy="61" r="17"/></g>
  <g transform="translate(108 157)">${mascot()}</g>`;}

function makeAdventure(state='idle', mini=false) {
  const config=adventures[theme.id];
  const scene=el('section',`adventure theme-${theme.id} ${mini?'adventure-mini':''}`);
  scene.dataset.state=state;scene.dataset.motion=String(motionAllowed&&!reducedMotion.matches);
  const art=el('div','scene-art');
  const scenes={carbohidratos:lavaScene,lipidos:lipidScene,proteinas:proteinScene,nucleotidos:nucleotideScene,'acidos-nucleicos':dnaScene,vitaminas:vitaminScene};
  // Only developer-owned vector markup is injected; question text uses textContent.
  art.innerHTML=`<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${scenes[theme.id]()}${confetti()}</svg>`;
  scene.append(art);
  if(!mini){const message=el('div','adventure-message');message.tabIndex=-1;message.setAttribute('aria-live','polite');
    const words=state==='win'?config.win:state==='lose'?config.lose:state==='final'?'¡Expedición terminada!':config.ready;
    message.append(el('strong','',words),el('p','',state==='lose'?config.help:state==='win'?'¡Sigue así! Cada descubrimiento cuenta.':state==='final'?'¡Gracias por explorar! Siempre puedes volver a intentarlo.':config.hint));scene.append(message);
  }
  return scene;
}
function motionButton(){const control=button(motionAllowed?'Animaciones: sí':'Animaciones: no','motion-control',()=>{
  motionAllowed=!motionAllowed;document.querySelectorAll('.adventure').forEach(s=>s.dataset.motion=String(motionAllowed&&!reducedMotion.matches));control.textContent=motionAllowed?'Animaciones: sí':'Animaciones: no';control.setAttribute('aria-pressed',String(motionAllowed));
});control.setAttribute('aria-pressed',String(motionAllowed));control.title='Activar o desactivar el movimiento de las escenas';return control;}
reducedMotion.addEventListener('change',()=>document.querySelectorAll('.adventure').forEach(s=>s.dataset.motion=String(motionAllowed&&!reducedMotion.matches)));

const root=document.querySelector('#app');
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
let game,theme;
function button(text,cls,fn){const b=el('button',cls,text);b.type='button';b.onclick=fn;return b;}
function menu(message){
  document.title='BioMisterio · Desafíos de bioquímica';root.replaceChildren();root.removeAttribute('style');
  if(message)root.append(el('p','notice',message));
  const intro=el('section','intro');
  intro.append(el('p','eyebrow','SEIS TEMAS · UN NUEVO RETO'),el('h1','','La ciencia guarda misterios.\nResuelve el siguiente.'),el('p','lead','Elige una expedición. Responde 10 preguntas y descubre la explicación después de cada respuesta.'));
  root.append(intro);const grid=el('div','theme-grid');
  themes.forEach((t,i)=>{
    const a=el('a','theme-card');a.href='?tema='+t.id;a.style.setProperty('--accent',t.color);a.style.setProperty('--pale',t.pale);
    const top=el('div','card-top');top.append(el('span','theme-icon',t.icon),el('span','eyebrow','0'+(i+1)));
    theme=t;a.append(top,el('h2','',t.name),el('p','',t.title),makeAdventure('idle',true));
    const bottom=el('div','card-bottom');bottom.append(el('span','','10 preguntas · 100 puntos'),el('span','enter','Entrar ↗'));a.append(bottom);grid.append(a);
  });root.append(grid);
}
function render(focus=false, revealAnswer=false){
  root.replaceChildren();root.style.setProperty('--accent',theme.color);root.style.setProperty('--pale',theme.pale);document.title=theme.name+' · BioMisterio';
  const nav=el('div','game-nav'),back=el('a','back','← Elegir otro tema');back.href='?';nav.append(back,motionButton());root.append(nav);
  const heading=el('div','game-heading');heading.append(el('span','theme-icon',theme.icon),el('h1','',theme.title));root.append(heading);
  const stats=el('div','stats');stats.append(el('span','',game.finished?'Desafío completado':`Pregunta ${game.index+1} de 10`),el('strong','score',`${game.score} / 100 puntos`));root.append(stats);
  const progress=el('progress');progress.max=10;progress.value=game.answers.length;progress.setAttribute('aria-label','Preguntas respondidas');root.append(progress);
  const path=el('div','journey');path.setAttribute('aria-label',`${game.answers.length} preguntas respondidas de 10`);
  for(let i=0;i<10;i++){const a=game.answers[i],step=el('span','step'+(a?' done':''),a?(a.correct?'★':'●'):'○');step.setAttribute('aria-hidden','true');path.append(step);}root.append(path);
  if(game.finished){
    const panel=el('section','question-panel result');panel.append(makeAdventure('final'),el('p','eyebrow','EXPEDICIÓN COMPLETADA'),el('h2','',`${game.score} puntos`),el('p','lead',`${game.score/10} aciertos de 10 preguntas.`),el('p','','Cada explicación es una nueva pista. Puedes volver a intentarlo cuando quieras.'),button('Repetir desafío','primary',()=>{game.reset();render(true);}));
    const other=el('a','back','Elegir otro tema');other.href='?';panel.append(other);root.append(panel);if(focus){panel.tabIndex=-1;panel.focus();}return;
  }
  const q=game.current,answered=game.selected!==null,right=game.selected===q.correct;
  const panel=el('section','question-panel');panel.append(el('p','eyebrow',q.tag));const h=el('h2','question',q.question);h.tabIndex=-1;panel.append(h);
  const scene=makeAdventure(answered?(right?'win':'lose'):'idle');panel.append(scene);
  const feedback=el('div','feedback');feedback.setAttribute('role','status');
  if(answered){feedback.classList.add(right?'right':'wrong');feedback.append(el('strong','',right?'✓ ¡Correcto! +10 puntos':'✕ Esta vez no. +0 puntos'),el('p','',q.feedback));panel.append(feedback);}
  const choices=el('div','choices');
  q.options.forEach(o=>{
    const b=button('','option',()=>{if(game.answer(o.key))render(false,true);});b.disabled=answered;
    b.append(el('span','option-key',o.key),el('span','option-text',o.text));
    if(answered&&o.key===q.correct){b.classList.add('correct');b.append(el('span','answer-symbol','✓'));b.setAttribute('aria-label',o.key+'. '+o.text+' Respuesta correcta');}
    else if(answered&&o.key===game.selected){b.classList.add('incorrect');b.append(el('span','answer-symbol','✕'));b.setAttribute('aria-label',o.key+'. '+o.text+' Tu respuesta, incorrecta');}
    choices.append(b);
  });panel.append(choices);
  const next=button(game.index===9?'Ver resultado':'Siguiente →','primary',()=>{if(game.next())render(true);});next.disabled=!answered;panel.append(next);root.append(panel);
  if(revealAnswer){
    // Place the scene and explanation in view, including after long options on phones.
    const message=scene.querySelector('.adventure-message');message.focus({preventScroll:true});
    scene.scrollIntoView({block:'start',behavior:'instant'});
  }else if(focus)h.focus();
}
try{
  BioGame.validate(window.BIO_QUESTIONS,themes.map(t=>t.id));
  const id=new URLSearchParams(location.search).get('tema');theme=themes.find(t=>t.id===id);
  if(theme){game=new BioGame(BIO_QUESTIONS.filter(q=>q.theme===id));render();}
  else menu(id?'Ese tema no existe. Elige uno de los seis desafíos.':null);
}catch(error){root.replaceChildren(el('h1','','No se puede iniciar el desafío'),el('p','','El banco de preguntas no pasó la validación. Revisa questions.js antes de publicar.'));console.error(error);}
