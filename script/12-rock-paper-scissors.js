let result = '';
let computerMove;
let score = JSON.parse(localStorage.getItem('score'));
let isAutoPlay = false;
let intervalId;

document.querySelector('.js-rock-button').
addEventListener('click',function(){
    pickRandomMove();
    pickPlayerMove('Rock');
});

document.querySelector('.js-paper-button').
addEventListener('click',function(){
    pickRandomMove();
    pickPlayerMove('Paper');
});

document.querySelector('.js-scissor-button').
addEventListener('click',function(){
    pickRandomMove();
    pickPlayerMove('Scissor');
});

document.body.addEventListener('keydown',function(event){
    if(event.key === 'p'){
        pickRandomMove();
        pickPlayerMove('Paper');
        updateScoreElement();
    }
});

document.body.addEventListener('keydown',function(event){
    if(event.key === 'r'){
        pickRandomMove();
        pickPlayerMove('Rock');
        updateScoreElement();
    }
});

document.body.addEventListener('keydown',function(event){
    if(event.key === 's'){
        pickRandomMove();
        pickPlayerMove('Scissor');
        updateScoreElement();
    }
});

if (score === null) {
    score = {
        loss: 0,
        tie: 0,
        win: 0
    };
}
function pickRandomMove() {
    let randomNumber = Math.random();
    computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }
    else if (randomNumber > 2 / 3 && randomNumber <= 1) {
        computerMove = 'Scissor';
    }
    return computerMove;
}
function pickPlayerMove(playerMove) {
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie.';
            score.tie += 1;

        }
        else if (computerMove === 'Paper') {
            result = 'You Lose.';
            score.loss += 1;
        }
        else if (computerMove === 'Scissor') {
            result = 'You win.';
            score.win += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="/images/${playerMove}-emoji.png"> <img class="move-icon" src="/images/${computerMove}-emoji.png"> Computer`;
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'Tie.';
            score.tie += 1;
        }
        else if (computerMove === 'Scissor') {
            result = 'You Lose.';
            score.loss += 1;
        }
        else if (computerMove === 'Rock') {
            result = 'You win.';
            score.win += 1;
        }
        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="/images/${playerMove}-emoji.png"> <img class="move-icon" src="/images/${computerMove}-emoji.png"> Computer`;
    }
    else if (playerMove === 'Scissor') {
        if (computerMove === 'Scissor') {
            result = 'Tie.';
            score.tie += 1;
        }
        else if (computerMove === 'Rock') {
            result = 'You Lose.';
            score.loss += 1;
        }
        else if (computerMove === 'Paper') {
            result = 'You win.';
            score.win += 1;
        }
        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.js-result').innerHTML = result;
        document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="/images/${playerMove}-emoji.png"> <img class="move-icon" src="/images/${computerMove}-emoji.png"> Computer`;
    }
}

function resetScore() {
    score.loss = 0;
    score.tie = 0;
    score.win = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`;
}

updateScoreElement();
function autoplay() {
    if (!isAutoPlay) {
        intervalId = setInterval(function () {
            const playerMove = pickRandomMove();
            pickRandomMove();
            pickPlayerMove(playerMove);
            updateScoreElement();
        }, 2000);
        isAutoPlay = true;
        document.querySelector('.auto-play-button')
        .innerHTML = 'Stop Play';
    }
    else {
        clearInterval(intervalId);
        isAutoPlay = false;
        document.querySelector('.auto-play-button')
        .innerHTML = 'Auto Play';
    }
}