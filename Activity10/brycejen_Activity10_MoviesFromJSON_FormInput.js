const b = document.getElementById("my_form");

b.addEventListener("submit",(event)=>{
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    console.log("Beginning Fetch");
    fetch('./MoviesFromJSON.json')
    .then(function (response) { // asynchronous, don't need to wait for this
        return response.json();//fetch gives a promise for response object, we msut get the json from that
    })
    .then((data) => {appendData(data.movies);})
    .catch((err) => {console.log('error: ' + err)});
    console.log("End fetch");
});

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