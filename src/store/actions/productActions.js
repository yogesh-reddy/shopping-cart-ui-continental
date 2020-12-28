import Constants from "../../tyep";

export const fetchProducts = () => async(dispatch)=>{

    if(localStorage.getItem("products")===null) {
        const res = await fetch("https://ancient-hollows-51395.herokuapp.com/v1/catalog/listproducts")
        const data = await res.json();
        localStorage.setItem("products", JSON.stringify(data));
        dispatch({
            type :Constants.FETCH_PRODUCTS,
            payload: data,
        })
    }  else {
       let data= JSON.parse(localStorage.getItem("products"))
        dispatch({
            type :Constants.FETCH_PRODUCTS,
            payload: data,
        })

    }


}
