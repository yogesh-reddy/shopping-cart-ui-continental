import Constants from "../../tyep";

export const createOrder = (order) => (dispatch) => {
  fetch("https://go-cont.herokuapp.com/v1/catalog/placeorder/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: Constants.CREATE_ORDER, payload: data });
      localStorage.clear("cartItems");
      dispatch({ type: Constants.CLEAR_CART });
    });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: Constants.CLEAR_ORDER });
    dispatch({ type: Constants.FETCH_CART_DETAILS });
};

export const fetchOrders = () => (dispatch) => {
  fetch("https://go-cont.herokuapp.com/v1/catalog/listorder/1")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: Constants.FETCH_ORDERS, payload: data });
    });
};
