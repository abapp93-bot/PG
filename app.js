/* Personalizza domande e immagini qui. Salva tutte le foto nella cartella assets/. */
const CONFIG = {
  intro: 'Vuoi scoprire il tuo livello di viscosità e, soprattutto, chi è la tua crush segreta? Completa entrambi i quiz: alla fine avrai tutte le risposte.',
  crushName: 'Fabrizio',
  finalMessage: 'Buon compleanno, PG! Da tutti i tuoi amici: Claudio, Fede, Priscilla, Santa, Fabri, Elisa, Kathy e Alice.',
  quizzes: {
    slime: {
      label: 'QUIZ 01 · QUANTO SEI VISCIDO?',
      questions: [
        { text:'Arrivi in vineria, che fai?', answers:[
          {label:'Raggiungi Fede e Fabri e parli con loro di politica', image:'assets/ff.png'},
          {label:'Raggiungi Elisa e Priscilla', image:'assets/ep.png'},
          {label:'Raggiungi Claudio ed Anna', image:'assets/cb.png'},
          {label:'Raggiungi la prima figa che trovi', image:'assets/goblin.png'}
        ]},
        { text:'Quali di queste frasi è sbagliata?', answers:[
          {label:'Olmo e culetti'}, {label:'Vineria e tettine'}, {label:'PG è viscoso'}, {label:'Fede e Giulia B sono comunisti'}
        ]},
        { text:'Quando sei in spiaggia cosa guardi?', answers:[
          {label:'Il mare'}, {label:'I castelli di sabbia'}, {label:'I culi'}, {label:'Non vado in spiaggia'}
        ]},
        { text:'Con chi andresti in vacanza?', answers:[
          {label:'Claudio, Fede e Santa', image:'assets/ffs.png'}, {label:'Elisa', image:'assets/ei.png'}, {label:'Bane', image:'assets/bane.png'}, {label:'Arwa', image:'assets/w.png'}
        ]},
        { text:'In questa foto, dove erano le tue mani?', questionImage:'assets/aaa.png', answers:[
          {label:'Sul culo di Anastasia'}, {label:'Sulle tue, PG'}, {label:'Sulle tette di Anastasia'}, {label:'Sul culo di Dolce Ila'}
        ]}
      ]
    },
    crush: {
      label: 'QUIZ 02 · SCOPRI LA TUA CRUSH',
      questions: [
        { text:'In chat vorresti ricevere:', answers:[
          {label:'Un messaggio da Santa'}, {label:'Un messaggio da Fede'}, {label:'Un messaggio da Fabri'}, {label:'Un messaggio da Vale'}
        ]},
        { text:'In un’uscita romantica cosa deve indossare la ragazza?', answers:[
          {label:'Vestito elegante'}, {label:'Vestito scollato'}, {label:'Nulla'}, {label:'Lingerie'}
        ]},
        { text:'Puoi scegliere con chi uscire, chi scegli?', answers:[
          {label:'Vale', image:'assets/v.png'}, {label:'Roby', image:'assets/rr.png'}, {label:'Aurora', image:'assets/a.png'}, {label:'Arwa', image:'assets/w.png'}
        ]},
        { text:'Quale cosa della tua vita vorresti cambiare?', answers:[
          {label:'Arrampicata, ma solo sui culi', image:'assets/arr.png'},
          {label:'Uscire con i tuoi amici, ma i tuoi amici sono capibara', image:'assets/capi.png'},
          {label:'Vedere un sacco di ragazze, ma hanno tutte l’aspetto del Goblin', image:'assets/goblin.png'},
          {label:'Dormire con Elisa… e Torre',image:'assets/et.png'}
        ]},
        { text:'Dove vorresti essere in questo momento?', answers:[
          {label:'Asilo nido'}, {label:'Pulmino con solo ragazze maggiorenni'}, {label:'Lago dell’Olmo'}, {label:'Montagna'}
        ]}
      ]
    }
  }
};

const state = JSON.parse(localStorage.getItem('pgDoubleQuiz') || '{"completed":{},"answers":{}}');
let activeQuiz = null;
let questionIndex = 0;
const $ = (id) => document.getElementById(id);
const screens = ['home','quiz','complete','final','gallery'];
function showScreen(name){ screens.forEach(s=> $('screen-'+s).classList.toggle('active',s===name)); window.scrollTo({top:0,behavior:'smooth'}); }
function save(){localStorage.setItem('pgDoubleQuiz',JSON.stringify(state));}
function updateHome(){
  $('introText').textContent = CONFIG.intro;
  $('crushName').textContent = CONFIG.crushName;
  $('finalMessage').textContent = CONFIG.finalMessage;
  const completeCount=Object.keys(state.completed).filter(k=>state.completed[k]).length;
  $('progressLabel').textContent=`${completeCount} / 2`;
  $('progressFill').style.width=`${completeCount*50}%`;
  $('slimeStatus').textContent=state.completed.slime?'Completato ✓':'Da iniziare';
  $('crushStatus').textContent=state.completed.crush?'Completato ✓':'Da iniziare';
}
function startQuiz(name){ activeQuiz=name; const saved=state.answers[name]||[]; questionIndex=Math.min(saved.length,CONFIG.quizzes[name].questions.length-1); renderQuestion(); showScreen('quiz'); }
function renderQuestion(){
  const quiz=CONFIG.quizzes[activeQuiz]; const question=quiz.questions[questionIndex];
  $('quizKicker').textContent=quiz.label; $('questionCounter').textContent=`Domanda ${questionIndex+1} di ${quiz.questions.length}`;
  $('questionTitle').textContent=question.text;
  $('questionImageWrap').innerHTML='';
  if(question.questionImage){
    const img=document.createElement('img'); img.src=question.questionImage; img.alt='Foto della domanda'; img.className='question-image';
    img.onerror=()=>{$('questionImageWrap').innerHTML='<div class="question-image-missing">Aggiungi '+question.questionImage+'</div>'};
    $('questionImageWrap').appendChild(img);
  }
  $('quizProgressFill').style.width=`${((questionIndex+1)/quiz.questions.length)*100}%`;
  const saved=(state.answers[activeQuiz]||[])[questionIndex];
  $('answers').innerHTML='';
  question.answers.forEach((answer,index)=>{
    const b=document.createElement('button'); b.type='button'; b.className='answer-btn'+(answer.image?' has-image':'')+(saved===index?' selected':'');
    if(answer.image){ const img=document.createElement('img'); img.className='answer-image'; img.src=answer.image; img.alt=''; img.onerror=()=>{img.style.display='none'}; b.appendChild(img); }
    const label=document.createElement('span'); label.className='answer-label'; label.textContent=answer.label; b.appendChild(label);
    b.addEventListener('click',()=>selectAnswer(index)); $('answers').appendChild(b);
  });
  $('backQuestionBtn').disabled=questionIndex===0; $('backQuestionBtn').style.opacity=questionIndex===0?.45:1;
}
function selectAnswer(answerIndex){
  state.answers[activeQuiz] ||= []; state.answers[activeQuiz][questionIndex]=answerIndex; save();
  const total=CONFIG.quizzes[activeQuiz].questions.length;
  if(questionIndex<total-1){questionIndex++;renderQuestion();}
  else {state.completed[activeQuiz]=true;save();updateHome(); if(state.completed.slime&&state.completed.crush)showScreen('complete');else showScreen('home');}
}
$('homeBtn').onclick=()=>{updateHome();showScreen('home')}; $('homeFromQuizBtn').onclick=()=>{updateHome();showScreen('home')}; $('finalHomeBtn').onclick=()=>{updateHome();showScreen('home')}; $('galleryHomeBtn').onclick=()=>{updateHome();showScreen('home')};
$('backQuestionBtn').onclick=()=>{if(questionIndex>0){questionIndex--;renderQuestion();}};
document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startQuiz(b.dataset.start));
$('showFinalBtn').onclick=()=>showScreen('final');
$('openGalleryBtn').onclick=()=>showScreen('gallery');
$('resetBtn').onclick=()=>{if(confirm('Vuoi azzerare i quiz?')){state.completed={};state.answers={};save();updateHome();showScreen('home')}};
updateHome();
