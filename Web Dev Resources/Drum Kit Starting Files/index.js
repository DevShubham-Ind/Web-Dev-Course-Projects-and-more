var noOfDrumButtons = document.querySelectorAll(".drum").length;

var sound = [];
sound[0] = "sounds/crash.mp3";
sound[1] = "sounds/tom-2.mp3";
sound[2] = "sounds/kick-bass.mp3";
sound[3] = "sounds/snare.mp3";
sound[4] = "sounds/tom-1.mp3";
sound[5] = "sounds/tom-3.mp3";
sound[6] = "sounds/tom-4.mp3";
var audio = [];

for(var i=0; i<noOfDrumButtons; i++){
document.querySelectorAll("button")[i].addEventListener("click", function () {
    var buttonInnerHtml = this.innerHTML;

    makeSound(buttonInnerHtml);

    buttonAnimation(buttonInnerHtml);
}); 

}


document.addEventListener("keypress", function (event){
    makeSound(event.key);
    buttonAnimation(event.key);
});


function makeSound(key) {
    switch(key) {
        case 'w':
            var crash = new Audio("sounds/crash.mp3");
            crash.play()
            break;
        case 'a':
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        case 's':
            var tom2 = new Audio("sounds/kick-bass.mp3");
            tom2.play();
            break;
        case 'd':
            var tom2 = new Audio("sounds/snare.mp3");
            tom2.play();
            break;
        case 'j':
            var tom2 = new Audio("sounds/tom-1.mp3");
            tom2.play();
            break;
        case 'k':
            var tom2 = new Audio("sounds/tom-3.mp3");
            tom2.play();
            break;
        case 'l':
            var tom2 = new Audio("sounds/tom-4.mp3");
            tom2.play();
            break;
        default:
            console.log("Error zala reee"); 
    }
}


function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}