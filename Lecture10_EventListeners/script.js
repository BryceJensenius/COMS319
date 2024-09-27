function clickHandler(){
    alert("Button Clicked, JS called: ");
}

function increase(){
    let paragraph = document.getElementById("paragraph");
    paragraph.setAttribute("style", "font-size:30px");
}

function decrease(){
    let paragraph = document.getElementById("paragraph");
    paragraph.setAttribute("style", "font-size:20px; color: #f39c12;");
}


let d = document.getElementById("eventElement");
d.addEventListener("doubleclick", myAlert);
d.addEventListener("mouseover", overButton);
d.addEventListener("mouseout", outButton);

window.addEventListener("keydown", (event) => {
    let div = document.getElementById("windowload");
    div.innerText = `Key Pressed: ${event.key}`;
});

function displayKey(){

}

function myAlert(){
    alert("called my Alert through an event listener.")
}

function overButton(){
    let d = document.getElementById("eventElement");
    d.setAttribute("style", "font-size:20px; color: #f39c12;");
}
function outButton(){
    let d = document.getElementById("eventElement");
    d.setAttribute("style", "font-size:10px");
}