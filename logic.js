$(document).ready(function() {

    "use strict";

    var gameBox = $('#game-container');
    var up = $('#up');
    var down = $('#down');
    var left = $('#left');
    var right = $('#right');
    var startGame = $('#start-game');
    var tryAgain = $('#try-again');
    var input = $('.box');
    var playButton = $('#play');
    var stopButton = $('#stop');
    var audio = new Audio('audio/Spellbound.mp3');
    var i=0;
    var roundCounter = $('#round-count');
    var roundCountText = $('#round-count-text');
    var options = ["up", "down", "left", "right"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------
    //TODO: Change how the generator is activated (as opposed to being activated by start button).
    //TODO: Iterator will not animate second consecutive animation on same element
    //TODO: Complete 'game over' functionality: 'restart' button appears and resets everything.
    //TODO: Change start button when clicked on.
    //TODO: Add difficulty functionality and slider - easy, medium and hard
    //TODO: Add sounds and (maybe) music.
    //TODO: Work on 'enter' key functionality.

    $('#nav-bar-content').hover(function() {
        $('#nav-bar-content').animate({
            right: "0px"
        })
    });

    $('#nav-bar-content').mouseleave(function() {
        $('#nav-bar-content').animate({
            right: "-175px"
        })
    });

    //calls the specified functions when the "Start Game" button is clicked.
    startGame.click(function() {
        roundCounter.html('1');

        startGame.html('Now Playing');

        //Begins generating randomly.
        randomGenerate();

    });

    tryAgain.click(function() {
        tryAgain.attr('id', 'start-game');
        startGame.html('Now Playing');
    });

    playButton.click(function() {
        audio.play();
    });

    stopButton.click(function() {
        audio.pause();
    });

    function enter() {
        if (event.key === "Enter") {
            // console.log('Enter key worked');

            //Begins generating randomly.
            randomGenerate();
        }
    }

    //Function that randomly generates a sequence from array 'options' and put the results into the array named 'generatedSequence'.
    function randomGenerate () {
        //start the count at 0 again
        i=0;
        var random = options[Math.floor(Math.random() * options.length)];
        generatedSequence.push(random);
        console.log(generatedSequence);
        iterator();
    }

    //----------------------------------------------------------------------------------------------------------------

        //This just adds the ability for the browser to listen for key presses and sets the behavior for them.
        window.addEventListener("keydown", function (event) {

            if(event.key === "Enter"){
                startGame.click();
            }

            switch (event.key) {
                case "ArrowUp": {
                    up.removeClass('blink');
                    setTimeout(function () {
                        up.addClass('blink');
                    }, 1);
                }
                    break;
                case "ArrowDown": {
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

        //if the pressed-key's event starts with 'Arrow' and either "Up", "Down", "Left", or "Right"
        if (event.key === 'Arrow' + capitalizeFirstLetter(generatedSequence[i])) {

            //increase i by 1
            i++;

            //if the value of i is equal to the length of the array 'generatedSequence'
            if (i === generatedSequence.length) {
                console.log("Win round");
                roundCounter.html(i+1);
                iterator();
                randomGenerate();
            } else {
                console.log("Round not complete yet");
            }
        } else {
            gameOver();
        }
    }

    //Adds functionality to animate gameboard initially.
    function gameOver() {
        $('#' + generatedSequence[i]).addClass('wrong');
        gameBox.addClass('wrong');
        generatedSequence = [];
        startGame.attr('id', 'try-again');
        startGame.html('TRY AGAIN');
        roundCounter.html('');
        roundCountText.html('GAME OVER');
        setTimeout(function() {
            breakGame();
        }, 1000);
    }

    //Function that animates the game Board when game Over.
    function breakGame() {
        up.addClass('broken-up');
        down.addClass('broken-down');
        left.addClass('broken-left');
        right.addClass('broken-right');
    }

    //This function repeats back the sequence that has been randomly generated and put inside the array 'generatedSequence'.
    function iterator() {

        //sets its counter to zero inside the function
        var count = 0;

                         //sets Interval at which to execute iterator
        var intervalId = setInterval(function() {

            // if the variable 'count' is equal to the length of the array 'generatedSequence' (once it has reached the end of the array)
            if (count === generatedSequence.length) {

                //clears the interval (stops the function 'iterator')
                clearInterval(intervalId);
            }

            //Removes class 'blink' from anything with class 'box', in order to animate it again. (and not animate blink again).
            $('.box').removeClass('blink');

            //adds the class 'repeat' to the array "generatedSequence"'s current index which is at position: 'count'.
            // $('#' + generatedSequence[count]).addClass('repeat');
            $('#' + generatedSequence[count]).addClass('repeat');

            //sets a delay on removing the class 'repeat' so it will animate before removing.
            setTimeout(function() {
                $('.box').removeClass('repeat');
            }, 500);
            //adds one to the position of count
            count++;
        }, 800);
    }

    //a function whos parameter's first letter will be replaced (with slice) and capitalized.
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

//----------------------------------------------------------------------------------------------------------------

});
