URL = window.URL || window.webkitURL;
 
var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording
 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext; //new audio context to help us record
 
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton"); 
 
//add events to those 3 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);


function startRecording() {
    console.log("recordButton clicked"); 
    var constraints = { audio: true, video:false }
    recordButton.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false
 
 
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
 
        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
        rec = new Recorder(input,{numChannels:1})
        rec.record()
        console.log("Recording started");
 
    }).catch(function(err) {
        //enable the record button if getUserMedia() fails
        recordButton.disabled = false;
        stopButton.disabled = true;
        pauseButton.disabled = true
    });
}


function pauseRecording(){
    console.log("pauseButton clicked rec.recording=",rec.recording );
    if (rec.recording){
        //pause
        rec.stop();
        pauseButton.innerHTML="Resume";
    }else{
        //resume
        rec.record()
        pauseButton.innerHTML="Pause";
    }
}

function stopRecording() {
    console.log("stopButton clicked");
 
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
 
    pauseButton.innerHTML="Pause";
    rec.stop();
 
    gumStream.getAudioTracks()[0].stop();
    rec.exportWAV(getData);
}

function createLink(blob,text) {
 
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    var base64text = document.createElement('p');
    //add controls to the <audio> element
    au.controls = true;
    au.src = url;
 
    //link the a element to the blob
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;
    
    base64text.innerHTML=text;
    //add the new audio and a elements to the li element
//    li.appendChild(au);
    li.appendChild(link);
//    li.appendChild(base64text);
    //add the li element to the ordered list
//    document.appendChild(li);
}

function getData(audioFile, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result.split(',')
         , decodedImageData = btoa(data[1]);
        console.log(data);                    // the actual conversion of data from binary to base64 format
        createLink(audioFile,data[1]);
        apicall(data[1]);
    };
    reader.readAsDataURL(audioFile);
}


var sessionId="3be65f50329c7e42aca841b19c3fcb0d";
var projectId="anu-bknhvv";
//var access_token="ya29.GlsvBvRcx0I1Dj43PpZ91wPppkl5dEcveIMm1OaoGexWB9JMtVYhzSCTjWeo54Pf1-NNYQsU8OXYJYhffIGvw16pBd_1fcSOJbFWOscjGSCGtH_lVbLzzTqf7gxJ";
var key="AIzaSyA5E0XSqyaQsoj2IuAjDIGDbhZCKL5Atqw";

function apicall(audioBase64){
    console.log("making api call")
    if(!access_token)alert("Please first log in")
    $.ajax({
        url:"https://dialogflow.googleapis.com/v2/projects/"+projectId+"/agent/sessions/"+sessionId+":detectIntent?key="+key+"&alt=json",
        method:"POST",
//        dataType: 'jsonp',
        data:JSON.stringify({
            "inputAudio":audioBase64,
            "queryInput":{
                "audioConfig":{
                    "languageCode":"en"
                }
            },
            outputAudioConfig :{
                'audioEncoding': 'OUTPUT_AUDIO_ENCODING_LINEAR_16'
            }
        }),
        headers:{
            "Content-Type": "application/json",
            "Authorization":"Bearer "+access_token
        }
    }).done(function(data){
        console.log(data);
//        alert(data.queryResult.fulfillmentText);
        // responsiveVoice.speak(data.queryResult.fulfillmentText);
        generate(data.queryResult.fulfillmentText);
    }).fail(function(err){
        console.log(err.responseJSON);
    })
}

