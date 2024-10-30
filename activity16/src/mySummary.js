import "bootstrap/dist/css/bootstrap.css";

function Summary({dataF, setDataF, viewer, setViewer}){ // Input data from App
    function updateHooks(){
        setViewer(0); // Set to 0 so the payment screen is shown again
        setDataF({}); // Reset The data since you finished
    };

    // Show the users information inputted in
    return (
        <div>
            <h1>Payment summary:</h1>
            <h3>{dataF.fullName}</h3>
            <p>{dataF.email}</p>
            <p>{dataF.creditCard}</p>
            <p>{dataF.address}</p>
            <p>{dataF.city},{dataF.state} {dataF.zip} </p>
            <button onClick={updateHooks} className="btn btn-secondary">Submit</button> {/* Go back to payment screen and clear data */}
        </div>);
    };

export default Summary;