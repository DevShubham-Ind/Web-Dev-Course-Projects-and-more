
$(document).keypress(function(event){
    
    $("h1").text(event.key);
});



// $("h1").on("mouseover", function(){
//     var beforeColor = $("h1").css("color");
//     $("h1").css("color", "orange");
//     setTimeout(function(){
//         $("h1").css("color", beforeColor);
//     },500);

// });

// $("h1").on("mouseover", function(){
//     $("h1").css("color", "purple");
// });

$(document).ready(function(){
    
    setTimeout(function(){
        $("h1").css("color", "orange");
        setTimeout(function(){
            $("h1").css("color", "white");
            setTimeout(function(){
                $("h1").css("color", "green");
            },700);
        },700);
    },700);  

});