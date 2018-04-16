

$(document).ready(function () {

    let numCharsTyped;
    let sentenceIndex;
    let incorrectLetterCounter;
    let correctLetterCounter;
    let sentences;
    let sentenceContent;
    let reachedEnd;
    let startTimer;
    let endTimer;

    const upperContainer = $('#keyboard-upper-container');
    const lowerContainer = $('#keyboard-lower-container');
    let shiftPressed = false;

    function initialize() {

        numCharsTyped = 0;
        sentenceIndex = 1;
        incorrectLetterCounter = 0;
        correctLetterCounter = 0;
        sentences = ['ten ate neite ate nee enet ite ate inet ent eate',
            'Too ato too nOt enot one totA not anot tOO aNot',
            'oat itain oat tain nate eate tea anne inant nean',
            'itant eate anot eat nato inate eat anot tain eat',
            'nee ene ate ite tent tiet ent ine ene ete ene ate'];
        sentenceContent = sentences[0];
        reachedEnd = false;
        startTimer = 0;
        endTimer = 0;
        highLightCharacter();


    }

    document.addEventListener("keydown", function (event) {

        if (reachedEnd) {
            return;
        }

        if (event.which == 16 && shiftPressed == false) {
            shiftPressed = true;
            shiftKey();
        }
        else if (event.which != 16) {
            let asciiKeyCode = event.key.charCodeAt(0);
            changeKeyColor(asciiKeyCode, "yellow");
        }
    });

    document.addEventListener("keyup", function (event) {

        if (reachedEnd) {
            return;
        }

        let asciiKeyCode = event.key.charCodeAt(0);
        changeKeyColor(asciiKeyCode, "#f5f5f5");
        if (event.which == 16) {
            shiftPressed = false;
            shiftKey();
        }
    });

    document.addEventListener("keypress", function (event) {

        if (reachedEnd) {
            return;
        }

        if (startTimer == 0) {
            startTimer = event.timeStamp;
        }

        let getLetter = sentenceContent.charAt(numCharsTyped);
        if (event.key == getLetter) {
            correctLetterCounter += 1;
            $('#feedback').html('<span class="glyphicon glyphicon-ok" id="border"</span>');
        } else {
            let wrongLetter = event.key;
            incorrectLetterCounter += 1;
            $('#feedback').html('<span class="glyphicon glyphicon-remove" id="border"</span>');
        }

        numCharsTyped++;

        if (sentenceContent.length == numCharsTyped && sentenceIndex < sentences.length) {

            let nextSentence = sentences[sentenceIndex];
            sentenceContent += " " + nextSentence;
            sentenceIndex++;
            $('#feedback').html('');

        } else if (sentenceContent.length == numCharsTyped && sentenceIndex == sentences.length) {

            let endDisplay = "<span class='correct'>Correct:" + correctLetterCounter + "</span> ";
            endDisplay += "<span class='incorrect'>Incorrect:" + incorrectLetterCounter + "</span>";

            $("#feedback").html(endDisplay).delay(6000).fadeOut();
        }
        highLightCharacter();

        if (numCharsTyped == sentenceContent.length) {
            reachedEnd = true;
            endTimer = event.timeStamp;

            alert("You Typed " + getWordsPerMinute() + " Words Per Minute!");

            myFunction();

            function myFunction() {
                let txt;
                let r = confirm("Do You Want To Play This Typing Game Again?");
                if (r == true) {
                    initialize();
                } else {
                    txt = "Thank You For Playing!";
                }
            }
        }
    });

    function shiftKey() {
        if (lowerContainer.is(':visible')) {
            lowerContainer.hide();
            upperContainer.show();
        } else {
            upperContainer.hide();
            lowerContainer.show();
        }
    }

    function changeKeyColor(kc, color) {
        $('#' + kc).css("background-color", color);
    }

    function highLightCharacter() {
        let highContent = sentenceContent;
        let nextLetter = sentenceContent.charAt(numCharsTyped);
        let rep = '<span class="hi">' + nextLetter + '</span>';
        highContent = highContent.substr(0, numCharsTyped) +
            rep + highContent.substr(numCharsTyped + 1);
        $('#sentence').html(highContent);
    }

    function getWordsPerMinute() {
        let timer = endTimer - startTimer;
        let min = Math.floor(timer / 60000);
        let sec = Math.floor((timer % 60000) / 1000);
        let time = min + sec / 60;
        let words = sentenceContent.split(/\s+/);
        return Math.floor(words.length / time);

    }

    initialize();
});

