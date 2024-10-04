function showCardsSortedByPriceLowHigh(){
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 1))
    .catch(err => console.log("Error :"+err));
}

function showCardsSortedByPriceHighLow(){
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 2))
    .catch(err => console.log("Error :"+err));
}

function showCardsContainingDescriptionA(){
    const inputField = document.getElementById('inputField');
    inputField.style.display = 'block'; // Show the input field
}

function showCardsContainingDescriptionB(){
    fetch("./MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies, 3))
    .catch(err => console.log("Error :"+err));
}

function loadMovies(myMovies, n){
    const arrayMovies = myMovies.movies;
    console.log(arrayMovies);

    let sortedMovies = [];
    if(n === 1){
        sortedMovies = arrayMovies.sort((p1,p2) => (p1.price>p2.price) ? 1 : (p1.price<p2.price) ? -1 : 0);
    }else if(n === 2){
        sortedMovies = arrayMovies.sort(
            (p1, p2) => { return (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0 }
            );
    }else if(n === 3){
        const inputDescription = document.getElementById("descriptionInput").value;
        console.log(inputDescription + "\n\n\n");
        // Hide the input field after submission
        document.getElementById('inputField').style.display = 'none';

        for (let movie of arrayMovies){
            if (movie.description.includes(inputDescription)){
                sortedMovies.push(movie);
            }
        }
    }

    console.log("this is array movies sorted",sortedMovies);

    var CardMovie = document.getElementById("col");
    CardMovie.innerHTML = "";

    for (let i = 0; i < sortedMovies.length; i++) {
        let title = sortedMovies[i].title;
        let year = sortedMovies[i].year;
        let url = sortedMovies[i].url;
        let price = sortedMovies[i].price;
        let colorAssociation = sortedMovies[i].color;
        // construct the HTML element
        let AddCardMovie = document.createElement("div");
        AddCardMovie.addEventListener("click", function (){
            document.body.style.backgroundColor = colorAssociation;
        });
        AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
        AddCardMovie.innerHTML = `
        <div class="card shadow-sm">
            <img src=${url} class="card-img-top" alt="..."></img>
            <div class="card-body">
            <p class="card-text"> <strong>${title}</strong>, ${year}, $${price}</p>
            </div>
        </div>
        `;
        CardMovie.appendChild(AddCardMovie);
    } // end of for
}


function appendData(data) {
    const m = document.getElementById("selectedMovie");
    const inputMovieName = m.value;
    var CardMovie = document.getElementById("col");
    CardMovie.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        if (data[i].title === inputMovieName) {
            let title = data[i].title;
            let year = data[i].year;
            let url = data[i].url;
            // construct the HTML element
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
        } // end of if
    } // end of for
}

// Author: Bryce Jensenius
// ISU Netid : brycejen@iastate.edu
// Date : 10 / 02 / 2024