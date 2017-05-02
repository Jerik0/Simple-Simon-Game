$(document).ready(function() {

    "use strict";

    var gameBox = $('#game-container');
    var up = $('#up');
    var down = $('#down');
    var left = $('#left');
    var right = $('#right');
    var startGame = $('#start-game');
    var input = $('.box');
    var i=0;
    var roundCounter = $('#round-count');
    var roundCountText = $('#round-count-text');
    var options = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------
    //TODO: QUESTIONS/PROBLEMS TO SOLVE:
    //TODO: 'Enter' key functionality.
    //TODO: (last priority): Change 'start game' animation to CSS.


    //calls the specified functions when the "Start Game" button is clicked.
    startGame.click(function() {

        //Expands the Game Board. TODO: Working on this.
        animateGame();

        roundCounter.html('1');

        //Begins generating randomly.
        randomGenerate();

    });

    function enter() {
        if (event.key === "Enter") {
            // console.log('Enter key worked');
            animateGame();

            //Begins generating randomly.
            randomGenerate();
        }
    }

    //Adds functionality to animate gameboard initially.
    function animateGame() {

    }


    //Function that randomly generates a sequence from array 'options' and put the results into the array named 'generatedSequence'.
    function randomGenerate () {
        i=0;
        var random = options[Math.floor(Math.random() * options.length)];
        generatedSequence.push(random);
        console.log(generatedSequence);
        iterator();
    }

    //----------------------------------------------------------------------------------------------------------------

        //This just adds the ability for the browser to listen for key presses and sets the behavior for them.
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

            enter();

            match();
        });

    //----------------------------------------------------------------------------

    //Create a function to read user's input and match it to array "generatedSequence".
    function match() {
        if (event.key === generatedSequence[i]) {
            i++;
            if (i === generatedSequence.length) {
                console.log("Win round");
                roundCounter.html(i+1);
                iterator();
                randomGenerate();
            } else {
                console.log("Round not complete yet");
            }
        } else {
            console.log("Game Over");
            roundCounter.html('');
            roundCountText.html('');
            i=0;
        }
    }

    function iterator() {
        generatedSequence.forEach(function(e, i) {
            switch (e) {
                case "ArrowUp": {
                    console.log('up');
                    up.removeClass('correct');
                    setTimeout(function () {
                        up.addClass('correct');
                    }, 1);
                } break;
                case "ArrowDown": {
                    console.log('down');
                    down.removeClass('correct');
                    setTimeout(function () {
                        down.addClass('correct');
                    }, 1);
                } break;
                case "ArrowLeft": {
                    console.log('left');
                    left.removeClass('correct');
                    setTimeout(function () {
                        left.addClass('correct');
                    }, 1);
                } break;
                case "ArrowRight": {
                   console.log('right');
                    right.removeClass('correct');
                    setTimeout(function () {
                        right.addClass('correct');
                    }, 1);
                } break;

            }
        });
    }

    //----------------------------------------------------------------------------------------------------------------


});
