var level =0;

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

var blue_audio = new Audio('./sounds/blue.mp3');
var yellow_audio = new Audio('./sounds/yellow.mp3');
var red_audio = new Audio('./sounds/red.mp3');
var green_audio = new Audio('./sounds/green.mp3');
var wrong_audio = new Audio('./sounds/wrong.mp3');

$(document).ready(function(){
    $(document).on("keypress", function(event){
        if(event.key == "a" || event.key == "A"){
            nextSequence();
        }
    })
})

function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);

    // Console log to understand working
    console.log("------------------------------------");
    console.log("Level : " + level);
    userClickPattern = [];

    var randomChoosenColor;
    var no = Math.floor(Math.random() * 4);
    // console.log("number : " + no);

    switch(no){
        case 0:
            randomChoosenColor = "red";
            break;
        case 1:
            randomChoosenColor = "blue";
            break;
        case 2:
            randomChoosenColor = "green";
            break;
        case 3:
            randomChoosenColor = "yellow";
            break;
    }

    gamePattern.push(randomChoosenColor);
    flash(randomChoosenColor);
    console.log("new color : " + randomChoosenColor);
}

function flash(ChoosenColor){
    playSound(ChoosenColor);

    // Fade out
    $("." + ChoosenColor).fadeOut(200, function() {
        // Fade in after fade-out is complete
        $(this).fadeIn(200);
    });

}

// Play Sound
function playSound(name){
    animatedPress(name);
    switch(name){
        case "red":
            red_audio.play();
            break;
        case "blue":
            blue_audio.play();
            break;
        case "green":
            green_audio.play();
            break;
        case "yellow":
            yellow_audio.play();
            break;
        case "wrong":
            wrong_audio.play();
            break;        
    }
}

// Animated Press
function animatedPress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

$(".btn").on("click", function(){
    // console.log("ID of button : " + this.id);
    var userChoosenColor = this.id;

    playSound(this.id);

    userClickPattern.push(userChoosenColor);
    console.log("User : "+ userClickPattern);

    if(!checkAnswer()){
        $("#level-title").text("Game over | Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        var incorrect = "wrong";
        playSound(incorrect);

        // Restart
        $(document).on("keypress", function(){
            setTimeout(function(){
                startOver();
            },200);
        })
    }

})

function checkAnswer(){
    var result = true;
    for(var i=0; i<userClickPattern.length; i++){
        if(gamePattern[i] != userClickPattern[i]){
            console.log("For i=" + i + " Game : " + gamePattern[i] + " User : " + userClickPattern[i]);
            console.log("check Answer : returning false ");
            return false;
        }
        else{
            console.log("For i=" + i + " Game : " + gamePattern[i] + " User : " + userClickPattern[i]);
            console.log("Pass");
        }
    }

    if(userClickPattern.length == gamePattern.length && result == true){
        setTimeout(function(){
            nextSequence();
        },500);
    }

    ;
    console.log("check Answer : returning true")
    return true;
}

function startOver(){
    gamePattern = [];
    userClickPattern = [];
    level = 0;

    nextSequence();
}