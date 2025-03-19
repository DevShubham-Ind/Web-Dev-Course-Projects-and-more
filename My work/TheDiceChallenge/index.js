// Game Main functioning in ground div HTML
var button = document.getElementById("reloadbtn");
var winner;
var losser;
var trialNo = 1;
var compWins=0;
var youWins=0;

button.addEventListener('click', 
function reload() {

    if(trialNo > 10){
        for(var i=0; i<10; i++){
            document.querySelector(".comp" + (i+1)).innerHTML = "";
            document.querySelector(".you" + (i+1)).innerHTML = "";
        }
             
        document.getElementById("reloadbtn").innerHTML = "Start Game";

        alert("10 Trails complete \nDo you want to restart the game?");
        trialNo =10;
        document.querySelector(".trialNoDisplay").innerHTML = "Trail No : " + trialNo;

        compWins = 0;
        youWins = 0;
        document.querySelector(".compTotal").innerHTML = compWins;
        document.querySelector(".youTotal").innerHTML = youWins;

        document.querySelector(".compTotal").style.color = "yellow";
        document.querySelector(".youTotal").style.color = "yellow";

        return 0;
    }
    
    // result image to default empty
    if(trialNo == 1) {
    document.querySelector(".player1result").src = "";
    document.querySelector(".player2result").src = "";
    document.getElementById("reloadbtn").innerHTML = "Start Game";
    }

    //else {
        var rand1 = Math.floor(Math.random() * 5)+1;
        var rand2 = Math.floor(Math.random() * 5)+1;
        document.querySelector(".player1panel img").src = getFace(rand1);
        document.querySelector(".player2panel img").src = getFace(rand2);


        setTimeout(function(){
            console.log("taking time delay to display result img.");
        }, 200);

    
        if(rand1>rand2) {
            document.querySelector(".player_result").innerHTML = "Computer is winnerrr";
            document.querySelector(".player1result").src = "./win.png";
            document.querySelector(".player2result").src = "./lose.png";
            winner = "comp";
            losser = "you";
            compWins++;
        }
        else if(rand1<rand2) {
            document.querySelector(".player_result").innerHTML = "You are winnerrr";
            document.querySelector(".player1result").src = "./lose.png";
            document.querySelector(".player2result").src = "./win.png";
            winner = "you";
            losser = "comp";
            youWins++;
        }
        else{
            document.querySelector(".player_result").innerHTML = "---------- Drow ----------";
            document.querySelector(".player1result").src = "./tie.jpg";
            document.querySelector(".player2result").src = "./tie.jpg";
            winner = "null";
            losser = "null";
            return 0;
            alert("running after return 0");
        }

        trialNo = round(winner, losser, trialNo);
        

        //alert("modifing trial no on screen");
        document.querySelector(".trialNoDisplay").innerHTML = "Trail left : " + (11 - trialNo);
    //}
});

function getFace(num) {
    switch (num){
        case 1: {return "./face1.png";}
        case 2: {return "./face2.png";}
        case 3: {return "./face3.png";}
        case 4: {return "./face4.png";}
        case 5: {return "./face5.png";}
        case 6: {return "./face6.png";}
    }
}


//Score Board
function round(winner, losser, trialNumber) {
    // if(trailNo < 10) {
    //alert("reach to filling position");
    console.log("trial number is " + trialNumber);
    document.querySelector("." + winner + trialNumber).innerHTML = "Win";
    document.querySelector("." + losser + trialNumber).innerHTML = "Loss";
    //alert("info filled");
    trialNumber += 1;

    if(trialNumber == 11){
        document.getElementById("reloadbtn").innerHTML = "Restart Game";
    }
    else{
        document.getElementById("reloadbtn").innerHTML = "Play Again";

    }
    console.log("trial number after increment " + trialNumber);

    //For total wins
    // if(winner == "comp"){
    document.querySelector(".compTotal").innerHTML = compWins;
    // }
    // else{
    document.querySelector(".youTotal").innerHTML = youWins;
    // }

    totalcolor();

    if(trialNumber <11){
        
        for(var i=1; i<=10; i++){
        setTimeout(function(index){
        document.querySelector(".statusBar").style.width = ((trialNumber-2)*10) + 1 + "%";
        }(i), i * 1000);
        }
        
    }
    else{
        document.querySelector(".statusBar").style.width = "10%";
    }

    return trialNumber;
    
}

function totalcolor(){
//total number colour change for more fun while playing 
if(compWins > youWins){
    document.querySelector(".compTotal").style.color = "greenyellow";
    document.querySelector(".youTotal").style.color = "red";
}
else if(youWins > compWins){
    document.querySelector(".compTotal").style.color = "red";
    document.querySelector(".youTotal").style.color = "greenyellow";
}
else{
    document.querySelector(".compTotal").style.color = "yellow";
    document.querySelector(".youTotal").style.color = "yellow";
}

return 0;
}
