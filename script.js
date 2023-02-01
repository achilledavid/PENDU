let tab;
let word;
let fail;
let lives;
let scs;
let guess;
let res;

function getWord() {
    tab = [];
    guess = [];
    fail = false;
    scs = false;
    lives = 10;
    res = 0;
    document.querySelector('.words').innerHTML = "";
    document.querySelector('.lives span').innerHTML = lives;
    document.querySelector('.false').innerHTML = '';

    try {
        fetch("https://random-word-api.herokuapp.com/word?lang=en")
            .then(response => response.json())
            .then(data => {
                word = data[0]
                for (let i = 0; i < data[0].length; i++) {
                    document.querySelector('.words').innerHTML += "<p class='word-" + i + "'>_</p>";
                }
                sliceWord();
            });
    } catch (error) {
        console.log(error);
    }
}

function sliceWord() {
    for (let i = 0; i < word.length; i++) {
        tab[i] = word[i];
        guess[i] = null;
    }
    console.log(word);
}

function getLetter() {
    letter = document.querySelector('.letter').value;
    scs = false;
    fail = false;

    if (letter != undefined && letter != null && letter != "" && letter.length === 1) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i] === letter) {
                scs = true;
                document.querySelector('p.word-' + i).innerHTML = tab[i];
                guess[i] = tab[i];
            }
            else {
                fail = true;
            }
        }
    } else {
        alert('please enter a letter');
    }

    if (fail === true && scs === false) {
        failed();
    }

    res = 0;

    for (let i = 0; i < word.length; i++) {
        if (guess[i] === tab[i]) {
            res++;
        }
        if (res === word.length) {
            alert('you won');
            window.location.reload();
        }
    }
}

function failed() {
    lives--;
    document.querySelector('.lives span').innerHTML = lives;
    document.querySelector('.false').innerHTML += '<p>' + letter + '</p>';

    if (lives === 0) {
        alert('you lost, the word was ' + word);
        window.location.reload();
    }
}

document.onmousemove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    document.querySelector('.cur').style.left = x + "px";
    document.querySelector('.cur').style.top = y + "px";
}

