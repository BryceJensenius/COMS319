// Bryce Jensenius
// brycejen@iastate.edu
// 11/11/24

const b = document.getElementById("my_form");

function fetchData() {
    // Read the DB with movies :
    fetch("http://localhost:8081/listMovies")
    .then(response => response.json())
    .then(myMovies => {
    console.log(myMovies);
    loadMovies(myMovies)})
    .catch(err => console.log("error:" + err));
}
fetchData();

function showOneMovie() {
    // Value from the input field
    let id = document.getElementById("movieId").value;
    // Fetch the value from the input field
    fetch(`http://localhost:8081/${id}`)
    .then(response => response.json())
    .then(myFavoriteMovie => {loadOneMovie(myFavoriteMovie)});
    // Replace image and text per every one in HTML
    function loadOneMovie(myFavoriteMovie) {
        var CardMovie = document.getElementById("col");
        let title = myFavoriteMovie.title;
        let year = myFavoriteMovie.year;
        let url = myFavoriteMovie.url;

        CardMovie.innerHTML = `
        <div class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="..."></img>
        <div class="card-body">
        <p class="card-text"> <strong>${title}</strong>, ${year}</p>
        </div>
        </div>
        `;
    } // end of function
} // end of function


function loadMovies(myMovies) {
    console.log(myMovies);
    var CardMovie = document.getElementById("col");
    CardMovie.innerHTML = '';
    for (var i = 0; i < myMovies.length; i++) {
        let title = myMovies[i].title;
        let year = myMovies[i].year;
        let url = myMovies[i].url;
        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
        AddCardMovie.innerHTML = `
        <div class="card shadow-sm">
        <img src=${url} class="card-img-top" alt="..."></img>
        <div class="card-body">
        <p class="card-text"> <strong>${title}</strong>, ${year}</p>
        </div>
        </div>
        `;
        CardMovie.appendChild(AddCardMovie);
    }
}