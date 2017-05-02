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
    var options = ["up", "down", "left", "right"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------
    //TODO: Iterator will not animate second consecutive animation on same element
    //TODO: Complete 'game over' functionality: 'restart' button appears and resets everything.
    //TODO: Change start button when clicked on.
    //TODO: Add difficulty functionality and slider - easy, medium and hard
    //TODO: Add sounds and (maybe) music.
    //TODO: Work on 'enter' key functionality.

    //calls the specified functions when the "Start Game" button is clicked.
    startGame.click(function() {

        if (startGame.html('TRY AGAIN')) {
            i=0;
            startGame.html('Start Game');
        }

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
        if (input.height === '0') {
            input.animate({
            height: "toggle",
            width: "toggle"
        })}
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
            console.log(generatedSequence[i]);
            $('#' + generatedSequence[i]).addClass('wrong');
            gameBox.addClass('wrong');
            startGame.html('TRY AGAIN');
            roundCounter.html('');
            roundCountText.html('GAME OVER');
            i=0;
        }
    }

    function iterator() {

        //sets its counter to zero inside the function
        var count = 0;

                        //sets Interval at which to execute iterator
        var intervalId = setInterval(function() {

            // if the variable 'count' is equal to the length of the array 'generatedSequence'
            if (count === generatedSequence.length) {

                //clears the interval (stops the function 'iterator')
                clearInterval(intervalId);
            }

            //Removes classes 'correct' and 'blink' from anything with class 'box', in order to animate it again. (and not animate blink again).
            $('.box').removeClass('blink');
            $('.box').removeClass('correct');

            //adds the class 'correct' to the array "generatedSequence"'s current index which is at position: 'count'.
            $('#' + generatedSequence[count]).addClass('correct');

            //adds one to the position of count
            count++;
        }, 500);
    }

    //a function whos parameter's first letter will be replaced (with slice) and capitalized.
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //----------------------------------------------------------------------------------------------------------------


});
