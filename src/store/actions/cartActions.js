import Constants from "../../tyep";
import axios from "axios";

export const fetchInitialCart = () => async (dispatch) => {
    const res = await fetch("https://go-cont.herokuapp.com/v1/catalog/listcart/1")
    const data = await res.json();
    dispatch({
        type: Constants.FETCH_CART_DETAILS,
        payload: data,
    })
}

export const addToCart = (item) => (dispatch, getState) => {

    const cartItems = getState().cart.cartItems.slice();
    let inCart = false
    cartItems.forEach((cartitem) => {
        if (cartitem.item_id === item.item_id) {
            inCart = true;
            cartitem.count++;
            item.count=cartitem.count;
        }
    });

    if (!inCart) {
        cartItems.push({...item, count: 1});
        item.count=1;
        axios.post("https://go-cont.herokuapp.com/v1/catalog/insertcartitem/1", item).then((response) => {

        });
    } else {
        axios.put("https://go-cont.herokuapp.com/v1/catalog/updatecart/1", item).then((response) => {
        });
    }
    dispatch({
        type: Constants.ADD_TO_CART,
        payload: {cartItems},
    });
    //axios call lo update the data
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};


export const removeFromCart = (item) => (dispatch, getState) => {

     const cartItems = getState().cart.cartItems.slice().filter((cartitem) => cartitem.item_id !== item.item_id);
    // const config = {
    //     data: item,
    // }
    // axios.delete("https://go-cont.herokuapp.com/v1/catalog/deletecartitem/1", item).then((response) => {
    // });
    // for( var i = 0; i < cartItems.length; i++){
    //
    //     if ( cartItems[i].item_id === item.item_id) {
    //         cartItems.splice(i, 1);
    //         i--;
    //     }
    // }
    const config = {
        data: item,
    }
    axios.delete("https://go-cont.herokuapp.com/v1/catalog/deletecartitem/1", config).then((response) => {
    });
    dispatch({type: Constants.REMOVE_FROM_CART, payload: {cartItems}});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const reduceItemsFromCart = (item) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice()
    cartItems.forEach((cartitem) => {
        if (cartitem.item_id === item.item_id) {
            cartitem.count--;
            item.count = cartitem.count
        }
    });
    if(item.count===0){
        for( var i = 0; i < cartItems.length; i++){

            if ( cartItems[i].item_id === item.item_id) {
                cartItems.splice(i, 1);
                i--;
            }
        }
        const config = {
            data: item,
        }
        axios.delete("https://go-cont.herokuapp.com/v1/catalog/deletecartitem/1", config).then((response) => {
        });
    }else{
    axios.put("https://go-cont.herokuapp.com/v1/catalog/updatecart/1", item).then((response) => {
    });}
    dispatch({type: Constants.REDUCE_FROM_CART, payload: {cartItems}});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

