/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying, previousDice, previousDiceOne, minNum;



init();

//document.querySelector('#current-' + activePlayer).textContent =   dice ;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';



document.querySelector('.btn-roll').addEventListener("click", function(){
    if(gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceOne = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOMOne = document.querySelector('.diceOne');
        diceDOMOne.style.display = 'block';
        diceDOMOne.src = 'dice-' + diceOne + '.png';
        //3. Update the round score if the roller number was not 1
        if (dice != 1 && diceOne != 1) {
            //Add score
            if(dice == 6 && previousDice == 6 && diceOne ==6 && previousDiceOne == 6){
                nextPlayer();
            } else{
                roundScore += dice;
                roundScore += diceOne;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                previousDice = dice;
                previousDiceOne = diceOne;
            }


        } else {
            //Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function(){

       //Add Current Score to Global Score
       scores[activePlayer] += roundScore;
       //update the UI
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        minNum = document.querySelector('.min-num').value;
        console.log("minNum:" + minNum);

       if(scores[activePlayer] >= minNum){
           document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
           document.querySelector('.dice').style.display = 'none';
           document.querySelector('.player-' + activePlayer + '-panel').classList.add('.winner');
           document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
           gamePlaying = false;
       } else{
           nextPlayer();
       }
       //check if player won the game


});

function nextPlayer(){
    roundScore = 0;
    previousDice=0;
    previousDiceOne =0;
    activePlayer === 0  ? activePlayer = 1: activePlayer = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display='none';
    document.querySelector('.diceOne').style.display='none';
}
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousDice = 0;
    previousDiceOne = 0;
    gamePlaying = true;
    minNum = 0;
    var x = document.querySelector('#score-0').textContent;
    console.log(x);


    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceOne').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-' + 0).textContent = 'Player 1';
    document.getElementById('name-' + 1).textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


}
document.querySelector('.btn-new').addEventListener('click',init);