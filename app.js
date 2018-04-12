// Change keyboards on and highlight characters


$(document).ready(function () {

    const upperContainer = $('#keyboard-upper-container');
    const lowerContainer = $('#keyboard-lower-container');
    let shiftPressed = false;

    document.addEventListener("keydown", function (event) {
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
        let asciiKeyCode = event.key.charCodeAt(0);
        changeKeyColor(asciiKeyCode, "#f5f5f5");
        if (event.which == 16) {
            shiftPressed = false;
            shiftKey();
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
});

// sentences


let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 
'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain
 nate eate tea anne inant nean', 'itant eate anot eat nato inate eat
 anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];










