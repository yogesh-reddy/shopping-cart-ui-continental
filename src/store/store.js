import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";
import {productReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducers";
import {orderReducer} from "./reducers/orderReducers";

const initialState ={};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
        products: productReducer,
        cart: cartReducer,
        order: orderReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)
export default store;
