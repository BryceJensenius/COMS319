import React, {useState} from "react"

function ThreeViews(){

    const [oneView, setOneView] = useState(false);
    const [secondView, setSecondView] = useState(false);
    const [thirdView, setThirdView] = useState(false);
    let [controlView, setControlView] = useState(0);

    function View1(){
        return <div>
            <h1>View 1 Displayed</h1>
            <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" width={200} alt="view1"/>
        </div>
    }

    function View2(){
        return <div>
            <h1>View 2 Displayed</h1>
            <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" width={200} alt="view1"/>
        </div>
    }

    function View3(){
        return <div>
            <h1>View 3 Displayed</h1>
            <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" width={200} alt="view1"/>
        </div>
    }

    function handleControlView(){
        console.log(controlView);
        if(controlView === 0){
            setControlView(1);
        }else if(controlView === 1){
            setControlView(2);
        }else{
            setControlView(0);
        }
    }

    return (<div>
        <button onClick={handleControlView}>Views</button>
        {controlView === 0 && <View1/>}
        {controlView === 1 && <View2/>}
        {controlView === 2 && <View3/>}
    </div>)
}

export default ThreeViews