import Constants from "../../tyep";

export const productReducer = (state = {}, action) => {

    switch (action.type) {
        case Constants.FETCH_PRODUCTS:
            return {items: action.payload}
        default:
            return state;
    }
}
