// Bryce Jensenius
// brycejen@iastate.edu
// 11/11/24

const b = document.getElementById("my_form");

function fetchData() {
    // Read the DB with movies :
    fetch("http://localhost:8081/robot")
    .then(response => response.json())
    .then(myRobots => {
    console.log(myRobots);
    loadRobots(myRobots)})
    .catch(err => console.log("error:" + err));
}
fetchData();

function showOneRobot() {
    // Value from the input field
    let id = document.getElementById("robotId").value;
    // Fetch the value from the input field
    fetch(`http://localhost:8081/robot/${id}`)
    .then(response => response.json())
    .then(myFavoriteRobot => {loadOneRobot(myFavoriteRobot)});
    // Replace image and text per every one in HTML
    function loadOneRobot(myFavoriteRobot) {
        var CardMovie = document.getElementById("col");
        let name = myFavoriteRobot.name;
        let price = myFavoriteRobot.price;
        let url = myFavoriteRobot.imageUrl;

        CardMovie.innerHTML = `
        <div class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="..."></img>
        <div class="card-body">
        <p class="card-text"> <strong>${name}</strong>, $${price}</p>
        </div>
        </div>
        `;
    } // end of function
} // end of function


function loadRobots(myRobots) {
    console.log(myRobots);
    var CardMovie = document.getElementById("col");
    CardMovie.innerHTML = '';
    for (var i = 0; i < myRobots.length; i++) {
        let title = myRobots[i].name;
        let price = myRobots[i].price;
        let url = myRobots[i].imageUrl;
        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
        AddCardMovie.innerHTML = `
        <div class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="..."></img>
        <div class="card-body">
        <p class="card-text"> <strong>${title}</strong>, $${price}</p>
        </div>
        </div>
        `;
        CardMovie.appendChild(AddCardMovie);
    }
}

function addRobot(){
    fetch("http://localhost:8081/robot")
    .then(response => response.json())
    .then(myRobots => {
    console.log(myRobots);
    loadRobots(myRobots)})
    .catch(err => console.log("error:" + err));
}