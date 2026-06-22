/* Personalizza QUIZ e CONFIG qui sotto. Per aggiungere foto: salva le immagini in assets/ e usa es. assets/quiz1-1.jpg */
const CONFIG = {
  intro: '[Scrivi qui il testo di introduzione del compleanno.]',
  crushName: '[Nome della crush]',
  quizzes: {
    slime: {
      label: 'QUIZ 01 · QUANTO SEI VISCIDO?',
      questions: [
        { text:'Quando vuoi ottenere una risposta, tu...', answers:[
          {label:'Mando un messaggio normale'}, {label:'Metto una reaction strategica'}, {label:'Scrivo “ehi sconosciuta/o 👀”', image:'assets/slime-1.jpg'}, {label:'Aspetto 3 minuti e mando un meme', image:'assets/slime-2.jpg'}
        ]},
        { text:'Il tuo superpotere nelle chat è...', answers:[
          {label:'Essere diretto/a'}, {label:'Il doppio senso non richiesto', image:'assets/slime-3.jpg'}, {label:'Rispondere dopo 0,2 secondi'}, {label:'Il “casualmente ero da queste parti”', image:'assets/slime-4.jpg'}
        ]},
        { text:'Davanti a una storia Instagram interessante...', answers:[
          {label:'Scorro oltre'}, {label:'Metto like e basta'}, {label:'Rispondo con 🔥', image:'assets/slime-5.jpg'}, {label:'Apro una conversazione epica', image:'assets/slime-6.jpg'}
        ]},
        { text:'La tua frase da maestro/a del fascino è...', answers:[
          {label:'“Come stai?”'}, {label:'“Ti ho sognato stanotte”', image:'assets/slime-7.jpg'}, {label:'“Non sono come gli altri”'}, {label:'“Dimmi tutto”', image:'assets/slime-8.jpg'}
        ]},
        { text:'Il verdetto finale sul tuo stile è...', answers:[
          {label:'Angelico'}, {label:'Sospettosamente affascinante', image:'assets/slime-9.jpg'}, {label:'Viscido ma con classe'}, {label:'Una leggenda del lubricante sociale', image:'assets/slime-10.jpg'}
        ]}
      ]
    },
    crush: {
      label: 'QUIZ 02 · SCOPRI LA TUA CRUSH',
      questions: [
        { text:'La qualità che ti conquista subito è...', answers:[
          {label:'Un sorriso incredibile', image:'assets/crush-1.jpg'}, {label:'L’ironia fulminante'}, {label:'Lo sguardo magnetico', image:'assets/crush-2.jpg'}, {label:'La gentilezza'}
        ]},
        { text:'L’appuntamento perfetto sarebbe...', answers:[
          {label:'Aperitivo con vista'}, {label:'Una serata film + snack', image:'assets/crush-3.jpg'}, {label:'Un concerto improvvisato'}, {label:'Giro notturno in città', image:'assets/crush-4.jpg'}
        ]},
        { text:'In chat vuoi ricevere...', answers:[
          {label:'Messaggi vocali infiniti'}, {label:'Un meme perfetto', image:'assets/crush-5.jpg'}, {label:'Buongiorno e buonanotte'}, {label:'Una foto sorpresa', image:'assets/crush-6.jpg'}
        ]},
        { text:'La tua debolezza segreta?', answers:[
          {label:'Chi ride alle tue battute'}, {label:'Chi ti guarda così', image:'assets/crush-7.jpg'}, {label:'Chi condivide la pizza'}, {label:'Chi propone avventure', image:'assets/crush-8.jpg'}
        ]},
        { text:'Quando arriva la tua crush tu...', answers:[
          {label:'Rimani zen'}, {label:'Dimentichi come si parla', image:'assets/crush-9.jpg'}, {label:'Fingi di non averla vista'}, {label:'Diventi inspiegabilmente simpatico/a', image:'assets/crush-10.jpg'}
        ]}
      ]
    }
  }
};

const state = JSON.parse(localStorage.getItem('pgDoubleQuiz') || '{"completed":{},"answers":{}}');
let activeQuiz = null;
let questionIndex = 0;
const $ = (id) => document.getElementById(id);
const screens = ['home','quiz','complete','final'];
function showScreen(name){ screens.forEach(s=> $('screen-'+s).classList.toggle('active',s===name)); window.scrollTo({top:0,behavior:'smooth'}); }
function save(){localStorage.setItem('pgDoubleQuiz',JSON.stringify(state));}
function updateHome(){
  $('introText').textContent = CONFIG.intro;
  $('crushName').textContent = CONFIG.crushName;
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
$('homeBtn').onclick=()=>{updateHome();showScreen('home')}; $('homeFromQuizBtn').onclick=()=>{updateHome();showScreen('home')}; $('finalHomeBtn').onclick=()=>{updateHome();showScreen('home')};
$('backQuestionBtn').onclick=()=>{if(questionIndex>0){questionIndex--;renderQuestion();}};
document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startQuiz(b.dataset.start));
$('showFinalBtn').onclick=()=>showScreen('final');
$('resetBtn').onclick=()=>{if(confirm('Vuoi azzerare i quiz?')){state.completed={};state.answers={};save();updateHome();showScreen('home')}};
updateHome();
