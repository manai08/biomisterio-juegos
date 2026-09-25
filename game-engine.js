'use strict';
window.BioGame = class {
  static validate(bank, themes) {
    if (!Array.isArray(bank) || bank.length !== 60 || new Set(bank.map(q=>q.id)).size !== 60) throw Error('Se requieren 60 preguntas únicas.');
    for (const theme of themes) if (bank.filter(q=>q.theme===theme).length!==10) throw Error('Cada tema debe tener 10 preguntas.');
    for (const q of bank) if (!themes.includes(q.theme) || !q.question?.trim() || !q.feedback?.trim() || q.options?.length!==4 || new Set(q.options.map(o=>o.key)).size!==4 || q.options.some(o=>!['A','B','C','D'].includes(o.key)||!o.text?.trim()) || !q.options.some(o=>o.key===q.correct)) throw Error('Pregunta inválida: '+q.id);
  }
  constructor(questions) { this.questions=questions; this.reset(); }
  reset() { this.index=0; this.score=0; this.answers=[]; this.selected=null; this.finished=false; }
  get current() { return this.questions[this.index]; }
  answer(key) { if(this.selected!==null || this.finished || !this.current.options.some(o=>o.key===key)) return false; this.selected=key; const correct=key===this.current.correct; if(correct)this.score+=10; this.answers.push({id:this.current.id,key,correct}); return true; }
  next() { if(this.selected===null || this.finished)return false; if(this.index===this.questions.length-1)this.finished=true; else {this.index++;this.selected=null;} return true; }
};
