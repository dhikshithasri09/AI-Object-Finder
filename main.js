Status = " ";
objects = [];

function setup(){
    canvas = createCanvas(280,250);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(280,250);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Object";
    object_name = document.getElementById("object_status").value;
}

function modelLoaded(){
    console.log("CocoSsd model is Loaded !");
    Status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,280,250);

    if(Status != " "){

        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Object Detected";

            fill("#000000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#000000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("image_found_conformtion").innerHTML = object_name + " found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterThis);
            }

            else{
                document.getElementById("image_found_conformtion").innerHTML = object_name + " not found";
            }

        }
    }
}