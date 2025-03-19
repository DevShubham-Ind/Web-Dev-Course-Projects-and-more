$(".enrollform").hide();

var enrolledName;
var age;
var height;
var first = true;

$("#enrollbtn").on("click", function(){
    if(first){
        $(".enrollform").fadeOut().slideDown().fadeIn();
        $("#enrollbtn").text("Submit");
        $("#enrollbtn").css("margin-top","15px");
        
        enrolledName = $("#nameDiv input").val();
        age = $("#ageDiv input").val();
        height = $("#heightDiv input").val();
        
    }
    else{
        // alert("Check once is everything is correct\n Name  : " + enrolledName + "\n Age     : " + age + "\n Height : " + height + "\n");
        $(".enrollform").fadeIn().slideUp();
        $("#enrollbtn").before("<p class='enroll_success'> Enrolled successfully !!!</p>");
        // alert("after changes done");
        $(".enrollform").hide();
    }

first = false;
    
});

// Enter logic
// $("#nameInput, #ageInput, #heightInput").keydown(function(event) {
//     // Check if the key pressed is Enter (key code 13)
//     if (event.keyCode === 13) {
//         console.log("Enter key pressed");
//         console.log(event);
        
//     }
// });

// $("#nameInput").on("keydown",function(event){
//     console.log(event.key);
// });

$(".enrollform").on('visibilitychange', function () {
    if($(this).is(":visible")) {
        document.getElementById('nameInput').addEventListener('keypress', logKeyPress);
        document.getElementById('ageInput').addEventListener('keypress', logKeyPress);
        document.getElementById('heightInput').addEventListener('keypress', logKeyPress);

        function logKeyPress(event) {
            console.log('Key pressed: ' + event.key);
        }
    }
    else{
        document.getElementById('nameInput').removeEventListener('keypress', logKeyPress);
        document.getElementById('ageInput').removeEventListener('keypress', logKeyPress);
        document.getElementById('heightInput').removeEventListener('keypress', logKeyPress);

        console.log("enroll form div is now hidden");
    }
});