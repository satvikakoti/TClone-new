var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

var Textbox = document.getElementById('textbox');
var instructions = document.getElementById('instructions');

var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

var current = event.resultIndex;

var transcript = event.results[current][0].transcript;

    Content += transcript;
    Textbox.innerHTML=Content;
          if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1];
            msg.rate = 0.8;
            msg.pitch = 1;
            msg.text = Content;
            speechSynthesis.speak(msg);
          }
          else{
               alert(' Ah man, speech synthesis isn\'t supported.');
          }

};

recognition.onstart = function() {
  document.getElementById('start-btn').disabled =false;
  instructions.innerHTML='Voice recognition is ON.';
  document.getElementById('start-btn').innerHTML = 'Stop';
  document.getElementById('start-btn').addEventListener('click',()=>{

        document.getElementById('start-btn').innerHTML = 'Start';
        instructions.innerHTML='Speech recognition ended';
        recognition.stop();
  });
}

recognition.onspeechend = function (){
  instructions.innerHTML='No activity.';
  document.getElementById('start-btn').innerHTML = 'Start over again';
  document.getElementById('start-btn').disabled =false;
//  recognition.stop();
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.innerHTML='Try again.';
  }
}

document.getElementById('start-btn').addEventListener ('click', () => {
  if (Content.length) {
    Content = ' ';
  }
   if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1];
            msg.rate = 0.8;
            msg.pitch = 1;
            msg.text = 'Hello! Welcome to T Clone!';
            speechSynthesis.speak(msg);
       }
  recognition.start();
});

Textbox.addEventListener('input', function() {
  Content = this.val();
})