import Constants from "../../tyep";

export const cartReducer = (
    state = {cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]")},
    action
) => {
    console.log("ap",action.payload)
    if(action.payload==null){
        action.payload=[]
    }
    switch (action.type) {
        case Constants.FETCH_CART_DETAILS:
            return {cartItems: action.payload};
        case Constants.ADD_TO_CART:
            return {cartItems: action.payload.cartItems};
        case Constants.REMOVE_FROM_CART:
            return {cartItems: action.payload.cartItems};
        case Constants.REDUCE_FROM_CART:
            return {cartItems: action.payload.cartItems};
        default:
            return state;
    }
};
