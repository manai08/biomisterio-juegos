'use strict';
window.BioGame = class {
  static validate(bank, themes) {
    const counts = Object.fromEntries(themes.map(theme => [theme, theme === 'carbohidratos' ? 16 : theme === 'lipidos' ? 15 : theme === 'proteinas' ? 11 : 10]));
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    if (!Array.isArray(bank) || bank.length !== total || new Set(bank.map(q=>q.id)).size !== total) throw Error(`Se requieren ${total} preguntas únicas.`);
    for (const theme of themes) if (bank.filter(q=>q.theme===theme).length!==counts[theme]) throw Error(`El tema ${theme} debe tener ${counts[theme]} preguntas.`);
    for (const q of bank) if (!themes.includes(q.theme) || !q.question?.trim() || !q.feedback?.trim() || q.options?.length!==4 || new Set(q.options.map(o=>o.key)).size!==4 || q.options.some(o=>!['A','B','C','D'].includes(o.key)||!o.text?.trim()) || !q.options.some(o=>o.key===q.correct) || (q.optionFeedback && q.options.some(o=>!q.optionFeedback[o.key]?.trim())) || (q.figure && (!q.figure.src || !q.figure.description?.trim()))) throw Error('Pregunta inválida: '+q.id);
  }
  constructor(questions) { this.questions=questions; this.reset(); }
  reset() { this.index=0; this.answers=[]; this.selected=null; this.finished=false; }
  get correctCount() { return this.answers.filter(answer=>answer.correct).length; }
  get score() { return this.questions.length ? Math.round(10000*this.correctCount/this.questions.length)/100 : 0; }
  get current() { return this.questions[this.index]; }
  answer(key) { if(this.selected!==null || this.finished || !this.current.options.some(o=>o.key===key)) return false; this.selected=key; const correct=key===this.current.correct; this.answers.push({id:this.current.id,key,correct}); return true; }
  next() { if(this.selected===null || this.finished)return false; if(this.index===this.questions.length-1)this.finished=true; else {this.index++;this.selected=null;} return true; }
};

