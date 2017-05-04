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
    var audio = new Audio('audio/Master Disorder.mp3');
    var repeatSound = new Audio('audio/deep.wav');
    var gameOverCounter = $('#game-over-counter');
    var seconds = 10;
    var i=0;
    var roundCounter = $('#round-count');
    var roundCountText = $('#round-count-text');
    var options = ["up", "down", "left", "right"];
    var generatedSequence = [];

    //----------------------------------------------------------------------------------------------------------------

    audio.volume = .35;

    function countDown() {
        var secondCounter = setInterval(function() {
            tryAgainClick(secondCounter);
            gameOverCounter.html(seconds--);
            if (seconds == 0) {
                clearInterval(secondCounter);
            }
        }, 1000);
    }

    //calls the specified functions when the "Start Game" button is clicked.
    function startUp() {
        startGame.click(function () {
            roundCounter.html('1');
            roundCountText.html('Round Count: ')
            input.removeClass('wrong');
            up.removeClass('broken-up');
            down.removeClass('broken-down');
            left.removeClass('broken-left');
            right.removeClass('broken-right');
            $('#game-over').animate({
                top: "-70px"
            });

            //Begins generating randomly.
            randomGenerate();

        });
    }
    startUp();

    function tryAgainClick(secondCounter) {
        tryAgain.click(function () {
            clearTimeout(secondCounter);
            startGame.show();

            $('#quarter-slot').show();
            startGame.html('Start Game');
            $('#game-over').animate({
                top: "-70px"
            });
        });
    }

    playButton.click(function() {
        audio.play();
    });

    stopButton.click(function() {
        audio.pause();
    });

    //Randomly generates a sequence from array 'options' and put the results into the array named 'generatedSequence'.
    function randomGenerate () {
        //start the count at 0 again
        i=0;
        var random = options[Math.floor(Math.random() * options.length)];
        generatedSequence.push(random);
        console.log(generatedSequence);
        iterator();
    }

    //----------------------------------------------------------------------------------------------------------------

    //Adds the ability for the browser to listen for key presses and sets the behavior for them.
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

        match();
    });

    //-----------------------------------------------------------------------------------------------------

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
        } else if (event.key === 'Enter') {

        } else {
            console.log('game over');
            gameOver();
        }
    }

    //Adds functionality to animate gameboard initially.
    function gameOver() {
        seconds = 10;

        console.log('game over');

        //adds a class to the current sequence index and the gamebox that flashes red.
        $('#' + generatedSequence[i]).addClass('wrong');
        gameBox.addClass('wrong');

        //sets the generatedSequence to empty.
        generatedSequence = [];

        //makes the start-game button and its corresponding quarter-slot disappear.
        startGame.hide();
        $('#quarter-slot').hide();

        //hides the start button after it disappears.

        //sets the round count back to nothing.

        roundCounter.html('');

        //makes the text of "round count" change to "GAME OVER".
        roundCountText.html('GAME OVER');

        //after 1 second, the game over banner will drop down to 10px from the top of the screen.
        setTimeout(function() {
            $('#game-over').animate({
                top: "10px"
            });
        }, 1000);

        countDown();

        setTimeout(function() {
            breakGame();
        }, 1000);
    }

    //Function that animates the game Board when game Over.
    function breakGame() {
        startGame.addClass('broken-start');
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

            //plays the sound of the computer repeating back.
            if(count < generatedSequence.length) {
                repeatSound.play()
            }

            // if the variable 'count' is equal to the length of the array 'generatedSequence' (once it has reached the end of the array)
            if (count === generatedSequence.length) {

                //clears the interval (stops the function 'iterator')
                clearInterval(intervalId);
            }

            //Removes class 'blink' from anything with class 'box', in order to animate it again. (and not animate blink again).
            $('.box').removeClass('blink');

            //adds the class 'repeat' to the array "generatedSequence"'s current index which is at position: 'count'.
            $('#' + generatedSequence[count]).addClass('repeat');

            //sets a delay on removing the class 'repeat' so it will animate before removing.
            setTimeout(function() {
                $('.box').removeClass('repeat');
            }, 500);
            //adds one to the position of count
            count++;
        }, 800);
    }

    //a function whose parameter's first letter will be replaced (with slice) and capitalized.
    function capitalizeFirstLetter(String) {
        return String.charAt(0).toUpperCase() + String.slice(1);
    }

//----------------------------------------------------------------------------------------------------------------

});
