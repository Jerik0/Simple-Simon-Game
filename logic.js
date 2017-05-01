$(document).ready(function() {

    var gameBox = $('#game-container');
    var up = $('#up');
    var down = $('#down');
    var left = $('#left');
    var right = $('#right');
    var startGame = $('#start-game');
    var input = $('.box');
    var interval = 1000;
    var i=0;

    var options = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------

    //Adds functionality to animate gameboard initially.
    function animateGame() {
        input.animate({
            height: "200px",
            width: "200px"
        }, 400);
        startGame.animate({
            opacity: "0"
        }, 400);
    }

    //Create a function to randomly generate a sequence and put the results into the array named "generatedSequence".
    function randomGenerate () {
        var random = options[Math.floor(Math.random() * options.length)];
            generatedSequence.push(random);

            //This will animate the element that corresponds to the element generated.
            switch (generatedSequence[i]) {
                case "ArrowUp": {
                    up.removeClass('blink');
                    setTimeout(function() {
                        up.addClass('blink');
                    }, 1);
                } break;
                case "ArrowDown": {
                    down.removeClass('blink');
                    setTimeout(function() {
                        down.addClass('blink');
                    } ,1);
                } break;
                case "ArrowLeft": {
                    left.removeClass('blink');
                    setTimeout(function() {
                        left.addClass('blink');
                    } ,1);
                } break;
                case "ArrowRight": {
                    right.removeClass('blink');
                    setTimeout(function() {
                        right.addClass('blink');
                    },1);
                } break;

            }
            i++;
    }

    //----------------------------------------------------------------------------------------------------------------

    //Create a function to read user's input and match it to array "generatedSequence".
    function matchMaker() {
        window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "ArrowUp": {
                    up.removeClass('blink');
                    setTimeout(function() {
                        up.addClass('blink');
                    }, 1);
                } break;
                case "ArrowDown": {
                    down.removeClass('blink');
                    setTimeout(function() {
                        down.addClass('blink');
                    } ,1);
                } break;
                case "ArrowLeft": {
                    left.removeClass('blink');
                    setTimeout(function() {
                        left.addClass('blink');
                    } ,1);
                } break;
                case "ArrowRight": {
                    right.removeClass('blink');
                    setTimeout(function() {
                        right.addClass('blink');
                    },1);
                } break;
            }
            if (event.key == generatedSequence[i-1]) {
                repeatIt();
            } else {
                console.log("Game Over");
            }
        })};

    //Functionality for the game to repeat it's generated numbers and wait for the user's input.
    function repeatIt() {
        // console.log(generatedSequence.length[i-1]);
        for (i=0; generatedSequence.length; i++) {
            console.log(generatedSequence[i]);
        }
        randomGenerate();
    }

    //----------------------------------------------------------------------------------------------------------------
    startGame.click(function() {

        animateGame();

        //Adds functionality for arrows to work after Start button is clicked.
        matchMaker();

        //Begins generating randomly.
        randomGenerate();

    });

    //QUESTIONS/PROBLEMS TO SOLVE
    // How to get values of keypresses to match up to generated array

});
