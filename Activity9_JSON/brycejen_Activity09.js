// Author: Bryce Jensenius
// ISU Netid : brycejen@iastate.edu
// Date : 09 / 9 / 2024

function fetchData(){
    console.log("Beginning Fetch");
    fetch('./person.json')
    .then(function (response) { // asynchronous, don't need to wait for this
        return response.json();//fetch gives a promise for response object, we msut get the json from that
    })
    .then(function (data) { // asynchronous, don't need to wait for this
        for(let personData of data){
            console.log(personData);
            console.log(personData.firstName);
            console.log(personData["firstName"]);
            appendData(personData);
        }
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
    console.log("End fetch");
}

function appendData(data) {
    let mainContainer = document.getElementById("myData1");
    let div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
    div.innerHTML = `
        <div class="card mb-4" style="width: 100%;">
            <img src=${data.logo} class="card-img-top" alt="superhero"/>
            <div class="card-body">
                <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
                <strong>Job:</strong> ${data.job} <br>
                <strong>Roll:</strong> ${data.roll}
            </div>
        </div>`;
    mainContainer.appendChild(div);
}

fetchData();