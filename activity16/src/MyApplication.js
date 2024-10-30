import React, { useState } from "react";
import Payment from "./myPayment";
import Summary from "./mySummary";
import "bootstrap/dist/css/bootstrap.css";

function App(){
    const [dataF, setDataF] = useState({}); // Start as empty object
    const [viewer, setViewer] = useState(0); // 0 means show payment screen, 1 means show summary screen
    return (<div>
        {viewer === 0 && <Payment dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>} {/* Pass hooks into components to set and use values */}
        {viewer === 1 && <Summary dataF={dataF} setDataF={setDataF} viewer={viewer} setViewer={setViewer}/>}
    </div>);
}

export default App;