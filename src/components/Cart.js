import React from 'react';
import {addToCart, removeFromCart,reduceItemsFromCart} from "../store/actions/cartActions";
import {createOrder,clearOrder} from "../store/actions/orderActions"
import { connect } from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import formatCurrency from "../util";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showCheckout:false,
            email : "",
            address : "",
            name: ""
        }
    }
    handleInput= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    createOrder = (e)=>{
        e.preventDefault();
        const order ={
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItems: this.props.cartItems,
            tot_amnt: (this.props.cartItems.reduce((total,item)=>total+item.discount_price*item.count,0)*.02)+
                this.props.cartItems.reduce((total,item)=>total+item.discount_price*item.count,0)
            //TODO add totoal
        }
        console.log(order)
        this.props.createOrder(order)
    }
    closeModal = () => {
        this.props.clearOrder();
    };
    render() {
        const {cartItems,order} =this.props;
        return(
            <div>
                {cartItems.length === 0 ?
                    <div className="no-cart-header">Cart Item is Empty</div>
                    :
                    <div className="cart cart-header">
                        You have {cartItems.length} in the cart{" "}
                    </div>
                }
                {order && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>Order {order.id}</h2>
                                <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{order.email}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li>
                                        <div>Date:</div>
                                        <div>{order.date}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{order.tot_amnt}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>
                                            {order.cartItems.map((x) => (
                                                <div>
                                                    {x.count} {" x "} {x.item_name}
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>
                )}
                { cartItems.length !== 0 &&
                <div >
                        <div className="cart-page">
                            <div id="one">
                                <table className="checkout-table">
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Sub Total</th>
                                    </tr>
                                    {cartItems.map(item =>(
                                        <tr>
                                            <td>
                                                <div  className="cart-info">
                                                    <img src={item.thumb} alt=""/>
                                                    <div>
                                                        <p>{item.item_name}</p>
                                                        <small>{formatCurrency(item.discount_price)}</small>
                                                        <a href  onClick={() => this.props.removeFromCart(item)}> remove</a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="small-cart-button"  onClick={() => this.props.reduceItemsFromCart(item)}>-</button>
                                                <span className="cart-itm-count">&nbsp;&nbsp;{item.count}&nbsp; &nbsp;</span>
                                                <button className="small-cart-button"  onClick={() => this.props.addToCart(item)}>+</button>
                                            </td>
                                            <td>
                                                {formatCurrency(item.discount_price*item.count)}
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <div id="two">
                                <div className="total-price">
                                    <table>
                                        <tr>
                                            <td>Sub Total</td>
                                            <td>{formatCurrency(cartItems.reduce((total,item)=>total+item.discount_price*item.count,0))}</td>
                                        </tr>
                                        <tr>
                                            <td>Taxes</td>
                                            <td>{formatCurrency(cartItems.reduce((total,item)=>total+item.discount_price*item.count,0)*.02)}</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>{formatCurrency((cartItems.reduce((total,item)=>total+item.discount_price*item.count,0)*.02)+
                                            cartItems.reduce((total,item)=>total+item.discount_price*item.count,0))}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td> <button className="checkout-btn" onClick={()=>this.setState({showCheckout:true})}>Proceed</button></td>
                                        </tr>
                                    </table>
                                </div>
                                <div>

                                </div>
                                <div>
                                    {this.state.showCheckout && (
                                            <div className="cart">
                                                <form onSubmit={this.createOrder}>
                                                    <ul className="form-container">
                                                        <li>
                                                            <label>Email</label>
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                required
                                                                onChange={this.handleInput}
                                                            ></input>
                                                        </li>
                                                        <li>
                                                            <label>Name</label>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                required
                                                                onChange={this.handleInput}
                                                            ></input>
                                                        </li>
                                                        <li>
                                                            <label>Address</label>
                                                            <input
                                                                name="address"
                                                                type="text"
                                                                required
                                                                onChange={this.handleInput}
                                                            ></input>
                                                        </li>
                                                        <li>
                                                            <select name="payment_method" id="payment_method">
                                                                <option value="">-Select Payment Method-</option>
                                                                <option value="Cash">Cash on Delivery</option>
                                                                <option value="UPI">UPI</option>
                                                                <option value="Net Banking">Net Banking</option>
                                                                <option value="Debit Card">Debit Card</option>
                                                                <option value="Credit Card">Credit Card</option>
                                                                <option value="Paypal">Paypal</option>
                                                            </select>
                                                        </li>
                                                        <li>
                                                            <button className="button primary" type="submit">
                                                                Checkout
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect((state)=>({
    cartItems: state.cart.cartItems,
    order: state.order.order
}),{addToCart,removeFromCart,reduceItemsFromCart,clearOrder,createOrder})(Cart)
