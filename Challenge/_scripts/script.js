


function Question(question, answers, correct){
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.displayQuestion = function(){
    console.log(this.question);
    //console.log(this.answers);
    for(var i=0;i<this.answers.length;i++){
        console.log(i + ": " + this.answers[i]);
    }
}

Question.prototype.checkAnswer = function(ans, callback){
    var sc;
    if(ans === this.correct){
        console.log("Correct answer!!");
        sc = callback(true);
    } else{
        console.log("Wrong answer!");
        sc = callback(false);
    }
    this.displayScore(sc);
}

Question.prototype.displayScore = function(score){
    console.log("your current score is: " + score);
    console.log("--------------------------");
}

var q1 = new Question('Is Javscript coolest programming language in the world',
    ['yes','no'], 0);
var q2 = new Question('what is the name of this course\'s teacher?' ,
    ['John','Michael','Jonas'],2);
var q3= new Question('what does best describe coding?',
    ['boring','hard','fun','tedious'],2);

var questions = [q1,q2,q3];

function score(){
    var sc = 0;
    return function(correct){
        if(correct){
            sc++;
        }
        return sc;
    }
}

var keepScore = score();


function nextQuestion(){
    var n = Math.floor(Math.random()*questions.length);

    questions[n].displayQuestion();
    var answer = (prompt('Please select the correct answer.'));
    console.log(answer);
    if(answer !== 'exit'){
        questions[n].checkAnswer(parseInt(answer), keepScore);
        nextQuestion();
    }
}
nextQuestion();