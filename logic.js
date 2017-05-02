$(document).ready(function() {

    "use strict";

    var gameBox = $('#game-container');
    var up = $('#up');
    var down = $('#down');
    var left = $('#left');
    var right = $('#right');
    var startGame = $('#start-game');
    var input = $('.box');
    var i=0; //TODO I think this is causing randomGenerate to have issues.

    var options = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------
    //TODO: QUESTIONS/PROBLEMS TO SOLVE:
    //TODO: 'Enter' key functionality.
    //TODO: (last priority): Change 'start game' animation to CSS.


    //calls the specified functions when the "Start Game" button is clicked.
    startGame.click(function() {

        animateGame();

        //Adds functionality for arrows to work after Start button is clicked.
        // matchMaker();

        //Begins generating randomly.
        randomGenerate();

    });

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

    //Function that randomly generates a sequence from array 'options' and put the results into the array named 'generatedSequence'.
    function randomGenerate () {
        i=0;
        var random = options[Math.floor(Math.random() * options.length)];
        generatedSequence.push(random);
        console.log(generatedSequence);

    }

    //----------------------------------------------------------------------------------------------------------------

        window.addEventListener("keydown", function (event) {


            switch (event.key) {
                case "ArrowUp": {
                    event.preventDefault();
                    up.removeClass('blink');
                    setTimeout(function () {
                        up.addClass('blink');
                    }, 1);
                }
                    break;
                case "ArrowDown": {
                    event.preventDefault();
                    down.removeClass('blink');
                    setTimeout(function () {
                        down.addClass('blink');
                    }, 1);
                }
                    break;
                case "ArrowLeft": {
                    left.removeClass('blink');
                    setTimeout(function () {
                        left.addClass('blink');
                    }, 1);
                }
                    break;
                case "ArrowRight": {
                    right.removeClass('blink');
                    setTimeout(function () {
                        right.addClass('blink');
                    }, 1);
                }
                    break;
            }

            if (event.key === "Enter") {
                // console.log('Enter key worked');
                animateGame();

                //Begins generating randomly.
                randomGenerate();

            }

            match();
        });

    //----------------------------------------------------------------------------

    //Create a function to read user's input and match it to array "generatedSequence".
    function match() {
        if (event.key === generatedSequence[i]) {
            i++;
            if (i === generatedSequence.length) {
                console.log("Win round");
                iterator();
                randomGenerate();
            } else {
                console.log("Round not complete yet");
            }
        } else {
            console.log("Game Over");
            i=0;
        }
    }

    function iterator() {
        generatedSequence.forEach(function(e, i) {
            switch (e) {
                case "ArrowUp": {
                    console.log('up');
                    up.fadeIn(100).fadeOut(100).fadeIn(100);
                } break;
                case "ArrowDown": {
                    console.log('down');
                    down.fadeIn(100).fadeOut(100).fadeIn(100);
                } break;
                case "ArrowLeft": {
                    console.log('left');
                    left.fadeIn(100).fadeOut(100).fadeIn(100);
                } break;
                case "ArrowRight": {
                   console.log('right');
                    right.fadeIn(100).fadeOut(100).fadeIn(100);
                }
            }
        });
    }

    //----------------------------------------------------------------------------------------------------------------


});
