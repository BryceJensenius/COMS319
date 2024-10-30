import React, { useState, useEffect } from "react";

const Shop = () => {
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
    const fetchData = async () => {
        const someResponse = await fetch("./products.json");
            const data = await someResponse.json();
            // update State Variable
            setCatalog(data);
            console.log(data);
        };
        fetchData();
    },[]);

    useEffect(()=>{
        const total = () => {
            let totalAmount = 0;
            for (let i=0; i<cart.length; i++){
                totalAmount += cart[i].price;
            }
            setCartTotal(totalAmount);
            console.log(totalAmount);
        };
        total();
    },[cart]);

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    // removing, including fixing removing only one item from cart
    const removeFromCart = (el) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === el.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
        }
    };

    const cartItems = cart.map((el, index) => (
        <div key={index}>
            <img class="img-fluid" src={el.image} width={50} />
            {el.title}
            ${el.price}
        </div>
    ));

    const listItems = catalog.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={100} />
            {el.title}
            {el.category}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}> - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
        </div>

    ))

    return (
        <div> 
            {listItems} 
            <div>Items in Cart :</div>
            <div>{cartItems}</div>
            <div>Order total to pay: ${cartTotal}</div>
        </div>

    );
}

export default Shop;
