

var john = {
    name: 'john',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

};

Person.prototype.calculateAge= function(){
    return (2019-this.yearOfBirth);
};

person1 = new Person("john",1990,"teacher");
person2 = new Person("gill", 1982, "engineer");
console.log(person1);
console.log(person2);
console.log(person1.calculateAge());
console.log(person2.calculateAge());

var course = {
    title : "JavaScript Essential",
instructor : "Rashpal",
level : 1,
published : true,
views : 100,
updateViews: function() {
    return ++course.views;
}
};
console.log(course);
course.updateViews();

//Object create
var personProto = {
    calculateAge: function(){
        return (2019-this.yearOfBirth);
    }
};
var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';
var jane = Object.create(personProto,
    {
        name: { value: 'Jane'},
        yearOfBirth: { value: 1969},
        job: { value: 'designer'}
    });

//passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];

var age = arrayCalc(years, calculateAge);
function arrayCalc(arr, fn){
    var newArray = [];
    for(var i = 0; i<arr.length;i++){
        newArray.push(fn(arr[i]));
    }
    return newArray;
}

function calculateAge(el){
    console.log("called for: " + el);
    return 2016-el;
}

console.log(age);

//functions returning functions

function interviewQuestion(job){
    if(job === "designer"){
        return function(name){
            console.log(name + ', can you explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log('what subject do you teach, ' + name + '?');

        }
    }
        else {
            return function(name){
                console.log('Hello ' +name+ ', what do you do?');
            }
        }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('Jane');


//Closures
//Inner function always has access to outer variables even after call has returned
function retirement(retirementAge){
    var a = ' years left until retirement';

    return function(yearOfBirth){
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

retirement(66)(1982);





























