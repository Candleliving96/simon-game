var mode;
var modeSelected = false;
$("button").on("click", function() {
    mode = $(this).attr("id");
    modeSelected = true;
    console.log("mode is " + mode);
    $(".mode-container").hide();

    $("h1").text("Level 0");
    setTimeout(nextSequence, 1000);

    /*for keydown
    $("h1").text("Press any key to start")
    var gameStarted = false;
    $(document).on("keydown", function() {
        if (gameStarted === false) {
            $("h1").text("Level 0");
            setTimeout(nextSequence, 1000);
            gameStarted = true;
        }
    })
    */
})

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    //update level
    level ++;
    $("h1").text("Level " + level);

    //pick random sequence
    var randomNumber = Math.floor((Math.random() * 4)); 
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("length of gamePattern is " + gamePattern.length);

    //animate flash and play sound
    if (mode === "easy") {
        for (let i = 0; i < gamePattern.length; i++) {
            setTimeout(function() {
                console.log("should be playing " + gamePattern[i]);
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[i]);
            }, 800 * i);
        }
    }
    else if (mode === "hard") {
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }    
}

$(".btn").on("click", function() {
    if (modeSelected === true) {
        //get color of button that was clicked
        var clickedColor = $(this).attr("id");
        userClickedPattern.push(clickedColor);

        //animate color and play sound for the button that was clicked
        animatePress(clickedColor);
        playSound(clickedColor);
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    //add "pressed" class
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() { //remove after 100 ms
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log("game pattern is " + gamePattern);
    console.log("user clicked pattern is " + userClickedPattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else {
        console.log("wrong");
        //play "wrong" Audio
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();

        //flash "game over" screen
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        //change h1
        $("h1").text("Game Over! Score: " + (gamePattern.length - 1));

        //start over
        startOver();
    }
}

function startOver() {
    $(".mode-container").show();
    modeSelected = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}