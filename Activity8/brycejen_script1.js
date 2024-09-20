/*
    Bryce Jensenius
    brycejen@iastate.edu
    September 20th, 2024
*/

/*
    Exercise 1
*/
let maxOfTwo = function(n1,n2){
    return (n1 > n2) ? n1 : n2;
}

let n1 = 11;
let n2 = 12;
console.log(`The max between ${n1} and ${n2} is : ${maxOfTwo(n1,n2)}`);

/*
    Exercise 2
*/
let array = [10,11,1024,125,9,201];
console.log(maxOfArray(array));

function maxOfArray(array){
    let max = array[0];
    for(let n of array){
        max = maxOfTwo(max, n);
    }
    return max
}

/*
    Exercise 3
*/
function showProperties(movie){
    console.log("\nList of Keys:");
    for(let key in movie){
        console.log(key);
    }
    console.log("\nList of Values:");
    for(let key in movie){
        console.log(movie[key]);
    }
}
const movie = {
    title : 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
};

showProperties(movie);

/*
    Exercise 4
*/
const circle = {
    radius : 2,
    area : function(){
        return Math.PI * this.radius * this.radius
    }
}

console.log(`\nThe area of the circle is : ${circle.area().toFixed(2)}`);

/*
    Exercise 7
*/
function CalculateAverageGrade(grades){
    let totalGrades = 0;
    let totalSubjects = 0;
    for(let key in grades){
        totalSubjects++;
        totalGrades += grades[key];
    }
    return totalGrades / totalSubjects;
}

const grades = {
    math: 85,
    science: 90,
    history: 75,
    literature: 88
};

console.log(`\nAverage Grade: ${CalculateAverageGrade(grades)}`);

/*
    Exercise 7
*/
function CalculateAverageGradePerStudent(studentsArray){
    let studentsAverages = {};
    for(let studentObject of studentsArray){
        let studentName = Object.keys(studentObject)[0];
        studentsAverages[studentName] = CalculateAverageGrade(studentObject[studentName]);
    }
    return studentsAverages;
}



const students = [
    {
        Fer: {
            math: 85,
            science: 90,
            history: 75,
            literature: 88
        }
    },
    {
        Alex: {
            math: 99,
            science: 97,
            history: 94,
            literature: 90
        }
    },
    {
        Mary: {
            math: 79,
            science: 72,
            history: 81,
            literature: 79
        }
    }
];

console.log(CalculateAverageGradePerStudent(students));