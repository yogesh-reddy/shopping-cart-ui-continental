import Constants from "../../tyep";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case Constants.CREATE_ORDER:
      return { order: action.payload };
    case Constants.CLEAR_ORDER:
      return { order: null };
    case Constants.FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};
export { orderReducer };
