/*
    Bryce Jensenius
    brycejen@iastate.edu
    September 20th, 2024
*/
const rectangle = {
    type: "rectangle",
    _width: 5,
    _height: 10,
    get width(){
        return this._width;
    },
    set width(width){
        this._width = width;
    },
    get height(){
        return this._height;
    },
    set height(height){
        this._height = height;
    },
    area : function(){
        return this._width * this._height;
    }
};

const circle = {
    type: "circle",
    _radius: 7,
    get radius(){
        return this._radius;
    },
    set radius(radius){
        this._radius = radius;
    },
    area : function(){
        return Math.PI * this._radius * this._radius
    }
};

console.log("Input data >")
const w = prompt("Enter width: ");
const h = prompt("Enter height: ");

console.log("Set values >");
rectangle.width = w;
rectangle.height = h;

console.log("Get values >");
const rectWidth = rectangle.width;
const rectHeight = rectangle.height;
console.log("Show output >");
console.log(`The Area of ${rectangle.type} with Width ${rectWidth} and Height ${rectHeight} is ${rectangle.area()}`);

console.log("Input data >")
const r = prompt("Enter radius: ");

console.log("Set values >");
circle.radius = r;

console.log("Get values >");
const circleRad = circle.radius;
console.log("Show output >");
console.log(`The area of ${circle.type} with Radius ${circle.radius} is ${circle.area().toFixed(2)}`);