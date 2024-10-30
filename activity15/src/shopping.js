import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Shop = () => {
    const [catalog, setCatalog] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
    const fetchData = async () => {
        const someResponse = await fetch("./products.json");
            const data = await someResponse.json();
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

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const listItems = catalog.map((el) => (
        <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
                <div class="col-2">
                    <img class="img-fluid" src={el.image} />
                </div>
                <div class="col">
                    <div class="row text-muted">{el.title}</div>
                    <div class="row">{el.category}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div class="col">
                    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));
    return (
        <div>
            STORE SE/ComS3190
            <div class="card">
                <div class="row">
                    <div class="col-md-8 cart">
                        <div class="title">
                            <div class="row">
                                <div class="col">
                                    <h4>
                                        <b>3190 Shopping Cart</b>
                                    </h4>
                                </div>
                                <div class="col align-self-center text-right text-muted">
                                    <h4>
                                        <b>Products selected {cart.length}</b>
                                    </h4>
                                </div>
                                <div class ="col align-self-center text-right text-muted">
                                    <h4>
                                        <b>Order total: ${cartTotal}</b>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Shop;
