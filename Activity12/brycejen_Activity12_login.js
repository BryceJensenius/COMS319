function fetchUser() {
    document.getElementById("loginuser").innerHTML = `Authenticating...`;
    return new Promise((resolve, reject) => {
        fetch("./brycejen_Activity12_login.json")
        .then((response)=>{return response.json()})
        .then((data)=>{resolve(data)})
        .catch((error)=>{
            reject(error);
        });
    });
}

function login(users, userInput, passwordInput) {
    if(userInput === users["user"] 
        && passwordInput === users["password"]){
            if(users["admin"]){
                document.getElementById("loginuser").innerHTML = "User and pass correct";
            }else{
                document.getElementById("loginuser").innerHTML = "Error: User is not an admin";
            }
    }else{
        document.getElementById("loginuser").innerHTML = "Error: User or pass incorrect";
    }
}

async function useAdmin(userInput, passwordInput) {
    await fetchUser()
    .then((users) => {
        login(users, userInput, passwordInput);
    })
    .catch((error) => {
        console.log(error);
        document.getElementById("loginuser").innerHTML = "Error: Unable to authenticate";
    })
}

document.getElementById("loginButton").addEventListener("click", (event) => {
    event.preventDefault();
    const userInput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    useAdmin(userInput, passwordInput);
});

// Author: Bryce Jensenius
// ISU Netid : brycejen@iastate.edu
// Date : 10 / 09 / 2024