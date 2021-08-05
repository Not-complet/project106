//https://teachablemachine.withgoogle.com/models/mgzJ21o1h/
//&#9996; peace &#128076; ok  &#128077; thumbs up &#128079; applause
Webcam.set({
    width:350,
    height:300,
    img_format:"png",
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach(" #camera ");
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'/>";
    });
}
console.log("ml5 version: "+ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mgzJ21o1h/model.json", modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function Identify(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_result_1").innerHTML = results[0].label;
        document.getElementById("emotion_result_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "ok"){
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
        }
        if(results[0].label == "Applause"){
            document.getElementById("update_emoji1").innerHTML = "&#128079;";
        }
        if(results[0].label == "Thumbs up"){
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
        }
        if(results[0].label == "Peace Out"){
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
        if(results[1].label == "ok"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "Applause"){
            document.getElementById("update_emoji2").innerHTML = "&#128079;";
        }
        if(results[1].label == "Thumbs up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "Peace Out"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
    }
}