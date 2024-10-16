let randonNumber = parseInt((Math.random()*100)+1);

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultPress');
const lowOrHi = document.querySelector('.lowOrHi');

const p = document.createElement('p');

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function(e){
      e.preventDefault();
      const guess =  parseInt(userInput.value);
      validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');
    }else if(guess<1){
        alert('Please enter a number greater than 1!');
    }else if(guess>100){
        alert('Please enter a number less than 100!');
    }else{
        previousGuesses.push(guess);

        if(numGuesses ===11){
            displayGuesses(guess);
            displayMessages('Game Over! Correct Number was $(randomNumber)');
            endGame();
        } else{
            displayGuesses(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess === randonNumber){
        displayMessages('Your guess is correct');
        endGame();
    }else if(guess<randonNumber){
       displayMessages('Too low! Try again.')
    }
    else if(guess>randonNumber){
        displayMessages('Too high! Try again.')
    }
}

function displayGuesses(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMessages(messaage){
    lowOrHi.innerHTML = `<h1>${messaage}</h1>`
}
function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame">Start new Game </h1>`

    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click',function(){
        randonNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p); 
        playGame = true;
    });
}
