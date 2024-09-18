/*declaring an object*/
let myCar = {
    color: "black",
    maxSpeed: 124
}
myCar.engine = "EX V6";

console.log(myCar);

myCar['maxSpeed'] = 123;
console.log(myCar.color);


/*Strings*/
let text = "qwertyuiop";
counter = {};
for(let char of text){
    if(char in counter){

    }
}

/*Functions*/
function walk(){
    console.log('walking')
}
walk();
//annonomous
let run = function(){
    console.log('running');
}

console.log(run);

function sum(a,b){
    return a + b;
}

console.log(sum(3,5));

//using arguments to get any number of parameters
function sum2(){
    let total = 0;
    for(let value of arguments){
        total += value;
    }
    return total;
}
function sum2(...args){
    let total = 0;
    for(let value of args){
        total += value;
    }
    return total;
}
let nums = [1,2,3,4,5];
console.log(nums);
console.log(...nums);

//Default values, if rate is not give, default is used
function interestAmount(principle, rate=0.05){
    return principle * (1 + rate);
}
let principle = 1000;
console.log(interestAmount(principle));

/*function inside objects*/
let person2 = {
    name: "John",
    genius: function(){
        console.log("Executing Function");
    }
}

person2.genius();
person2.genius = function(){//you can set the function like a variable
    console.log("New Function Implemented");
}
person2.genius();

/* Getters and Setters*/
let person3 = {
    first_name: "John",
    last_name: "May",
    get fullName(){
        return this.first_name + ' ' + this.last_name;
    },
    set fullName(fullName){
        let parts = fullName.split(" ");
        first_name = parts[0];
        last_name = parts[1];
    }
}

console.log(person3.fullName);
person3.fullName = 'New Name';//setter
console.log(person3.fullName);
