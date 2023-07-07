//array list of the 4 color options in the game
let buttonColors = ["red", "blue", "green", "yellow"];
//create extra memory for keep track of the game pattern 
let gamePattern = [];
//create extra memory to keep track of the clicking pattern
let userClickedPattern = [];

let start = false;

let level = 0;

$(document).keypress(function() {
    if(!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

//function that triggers a handler function 
$(".pad").click(function() {

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
        }, 1000);
    }
} else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over! Press a key to restart.");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    startOver();

    }
}

//function that handles what the next sequence will be 
function nextSequence() {

    userClickedPattern = [];

    //increase level by 1 everytime nextSequence() is called 
    level++; 

    //update h1 with the change in the value of the level
    $("#level-title").text("Level " + level);

    //variable that picks a random number from 1 - 4
    let randomNumber = Math.floor(Math.random() * 4);

    //variable that randomly selects the color from the color list
    let randomChosenColor = buttonColors[randomNumber];

    //pushes that random color into the extra memory of game pattern
    gamePattern.push(randomChosenColor);

    //assigning id of the color to randomchosencolor and creating an animation
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}