// Bryce Jensenius
// brycejen@iastate.edu
// 11/15/24

const b = document.getElementById("my_form");

function showAllRobots() {
    // Read the DB with movies :
    fetch("http://localhost:8081/robot")
    .then(response => response.json())
    .then(myRobots => {
    console.log(myRobots);
    loadRobots(myRobots)})
    .catch(err => console.log("error:" + err));
}
showAllRobots();
function showONeRobot() {
    // Fetch the value from the input field
    let id = document.getElementById("robotId").value;
  
      fetch(`http://localhost:8081/robot/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        if (response.status != 200) {
          return response.json().then((errData) => {
            throw new Error(
              `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
            );
          });
        }
        return response.json();
      })
      .then((myFavoriteRobot) => {
        displayCRUDRobot(myFavoriteRobot,"col2","Robot displayed");
      })
      .catch((error) => {
        alert("Error showing robot:" + error.message); // Display alert if there's an error
      });
  } // end of function
function showOneRobot() {
    // Value from the input field
    let id = document.getElementById("robotId").value;
    // Fetch the value from the input field
    fetch(`http://localhost:8081/robot/${id}`)
    .then((response) => {
        if (response.status != 200) {
            return response.json().then((errData) => {
                throw new Error(
                    `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
                );
            });
        }
        return response.json();
    })
    .then(myFavoriteRobot => {loadOneRobot(myFavoriteRobot)})
    .catch((error) => {
        alert("Error showing robot:" + error.message); // Display alert if there's an error
    });
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

function addANewRobot() {
    fetch("http://localhost:8081/robot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 21,
        name: "Robot Abraham",
        price: 100.9,
        description: "I robot is one example of an image for my exercise",
        imageUrl: "https://robohash.org/Abraham",
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          return response.json().then((errData) => {
            throw new Error(
              `POST response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
            );
          });
        }
        return response.json();
      })
      .then(myFavoriteRobot => {loadOneRobot(myFavoriteRobot)})
      .catch((error) => {
        alert("Error adding robot:" + error.message); // Display alert if there's an error
      });

      function loadOneRobot(myFavoriteRobot) {
        var CardMovie = document.getElementById("col3");
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
  } // end addANewRobot

function loadRobots(myRobots) {
    console.log(myRobots);
    var CardMovie = document.getElementById("col2");
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
function deleteOneRobot() {
    // Fetch the value from the input field
    const id = document.getElementById("deleteId").value;
    console.log("Deleting robot with ID:", id);

    fetch(`http://localhost:8081/robot/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(
                        `DELETE response was not ok:\nStatus: ${response.status}.\nError: ${errData.message}`
                    );
                });
            }
            return response.json();
        })
        .then(deletedRobot => {
            displayCRUDRobot(deletedRobot, "col4", "Robot Deleted");
        })
        .catch(error => {
            // Display alert if there's an error
            alert("Error deleting robot: " + error.message);
        });
}


function updateOneRobot() {
    // Fetch the value from the input field
    let id = document.getElementById("updateId").value;
    console.log(id);
    fetch(`http://localhost:8081/robot/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                "name": "Robot Abraham ALDACO-GASTELUM",
                "price": 100.90,
                "description": "I robot is one example of an image for my exercise",
                "imageUrl": "https://robohash.org/Abraham"
            }
        )
    })
    .then((response) => {
        if (response.status != 200) {
            return response.json().then((errData) => {
                throw new Error(
                    `UPDATE response was not ok :\n Status:${response.status}. \n Error: ${errData.error}`
                );
            });
        }
        return response.json();
    })
    .then(updateThisRobot => {displayCRUDRobot(updateThisRobot,"col5","Robot Updated");})
    .catch((error) => {
        // Display alert if there's an error
        alert("Error UPDATING robot:" + error.message);
    });
}

// Replace image and text per every one in HTML
function displayCRUDRobot(robot,divcol,message) {
    console.log(message);
    console.log(robot);
  
    var CardRobot = document.getElementById(divcol);
      let id = robot.id;
      let name = robot.name;
      let price = robot.price;
      let description = robot.description;
      let imageUrl = robot.imageUrl;
  
      let AddCardRobot = document.createElement("div");
      AddCardRobot.classList.add(divcol); // Add Bootstrap class to the column
      AddCardRobot.innerHTML = `
              <div class="card shadow-sm">
                  <h1>${message} ${id}</h1>
                  <img src=${imageUrl} class="card-img-top" alt="..."></img>
                  <div class="card-body">
                      <p class="card-text"> <strong>${description}</strong></p>
                      <p class="card-text"> <strong>${name}</strong>, $${price}</p>
                  </div>
              </div>
          `;
      CardRobot.appendChild(AddCardRobot);
  } // end of function