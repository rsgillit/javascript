var markH = 100;
var markM = 50;
var johnH = 100;
var johnM = 50;

markBMI = markM/(markH*markH);
johnBMI = johnM/(johnH*johnH);
markBMIHigher = markBMI > johnBMI;
console.log("Is mark's BMI higher ? " + markBMIHigher);
var test = 0;

if(test || test === 0){
    console.log("variable has been defined");
} else{
    console.log("variable has not been defined");
}

var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);
console.log(names);
console.log(names.length);
console.log(names[2]);
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names);
console.log(names.indexOf('Jasne'));

var bills = [124, 48, 268];
var tips = new Array(), totalBills = new Array();
bills.forEach(function(bill){
    if(bill < 50){
        tips.push(0.2*bill);
        totalBills.push(bill + 0.2*bill);
    } else if(bill>=50 && bill < 200){
        tips.push(0.15*bill);
        totalBills.push(bill + 0.15*bill);
    }else{
        tips.push(0.1*bill);
        totalBills.push(bill + 0.1*bill);
    }
});
console.log(tips);
console.log(totalBills);

var john = {
    Name: 'John',
    birthYear: 1990,
    family: ['Jane','Mark','Bob','emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function(){
        return 2019 - this.birthYear;
    }
};

console.log(john.Name);
console.log(john["family"]);
john["isMarried"] = true;
console.log(john);


var jane = new Object();
jane.Name = 'Jane';
jane.birthYear = 1969;
jane['family'] = 'great';
console.log(jane);
console.log(john.calcAge());

var rashpal = {
    name: 'Rashpal"',
    mass: 90,
    height: 2,
    calBMI: function(){
        this.BMI=this.mass/(this.height*this.height);
        return this.BMI;
    }
}

var jasjit = {
    name: 'Jasjit"',
    mass: 110,
    height: 2,
    calBMI: function(){
        this.BMI=this.mass/(this.height*this.height);
        return this.BMI;
    }
}
rashpal.calBMI();
jasjit.calBMI();
console.log(rashpal);
console.log(jasjit);

function Person(name, mass, height){
    this.name=name;
    this.mass=mass;
    this.height=height;
    this.BMI=function(){
        this.BMIq=this.mass/(this.height*this.height);
        return this.mass/(this.height*this.height);
    }
}

var rashpal1 = new Person('rashpal',90,2);
var jasjit1= new Person('jasjit',110,1);
rashpal1.BMI();
console.log(rashpal1);
console.log(jasjit1);