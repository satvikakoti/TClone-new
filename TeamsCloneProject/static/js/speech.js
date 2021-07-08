var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
var reply;
var Textbox;
var msg;
var voices;
var Content = '';

if ('speechSynthesis' in window)
{
       msg = new SpeechSynthesisUtterance();
       voices = window.speechSynthesis.getVoices();
       msg.voice = voices[1];
       msg.rate = 0.8;
       msg.pitch = 1;
}
else
{
        alert('Speech synthesis isn\'t supported.');
}

recognition.continuous = true;

recognition.onresult = function(event) {

var current = event.resultIndex;

var transcript = event.results[current][0].transcript;
//    console.log(transcript);
    var n = transcript.split(" ");
    Content = n[n.length - 1];
    Textbox = Content;
    if(Content=="yes")
    {
        var newContent = askJoinRoom();
        location.href = 'video/';
    }
    else if(Content=="no")
    {
            msg.text = 'Okay! Have a great day!';
            speechSynthesis.speak(msg);
    }
    document.getElementById('start-btn').disabled =false;
    recognition.stop();
};

recognition.onstart = function(event)
{
  recognition.stop();
}

recognition.onspeechend = function (){
  document.getElementById('start-btn').innerHTML = 'Start over again';
  document.getElementById('start-btn').disabled =false;
  recognition.stop();
  recognition.start();
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    console.log('Error!');
    recognition.stop();
  }
}

document.getElementById('start-btn').addEventListener ('click', () =>
{
            msg.text = 'Hello! Welcome to T Clone! Would you like to try out voice assistant?';
            Content=msg;
            speechSynthesis.speak(msg);

  if (Content.length) {
    Content = '';
  }
  recognition.start();
});


function askJoinRoom()
{
            msg.text = 'Alright! Let me describe about T Clone. TClone is a simple video calling application with various features that you might like. Let me join you into a room right away!';
            speechSynthesis.speak(msg);
}
