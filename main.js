var Prediction=""
Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

Camera=document.getElementById("camera");
Webcam.attach('#Camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("captured_image").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    })
}

Classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/kqZ690wwH/model.json',modelloaded);
function modelloaded(){
    console.log('modelloaded');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+ Prediction;
    var utterthis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}

function predict(){
    img=document.getElementById("captured_img");
    Classifier.classify(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else {console.log(results);
        document.getElementById("emotion_name").innerHTML= results[0].label;
        Prediction = results[0].label;
        if(Prediction=="Victory"){
            document.getElementById("emoji").innerHTML="&#9996"
        }
        if(Prediction=="Best"){
            document.getElementById("emoji").innerHTML="&#128077"
        }
        if(Prediction=="Amazing"){
            document.getElementById("emoji").innerHTML="&#128076"
        }
        if(Prediction=="Not_good"){
            document.getElementById("emoji").innerHTML="&#128078"
        }
        if(Prediction=="Hey"){
            document.getElementById("emoji").innerHTML="&#128400"
        }
        speak
    }
}