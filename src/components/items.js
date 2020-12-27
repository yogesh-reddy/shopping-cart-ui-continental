import React, {Component} from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import {connect} from "react-redux";
import {fetchProducts} from "../store/actions/productActions";
import {addToCart, fetchInitialCart} from "../store/actions/cartActions";
import formatCurrency from "../util";

class Items extends Component {
    constructor(props) {
        console.log("in items", props)
        super(props);
        this.state = {
            item: null,
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchInitialCart();
    }

    openModal = (item) => {
        this.setState({item});
    };
    closeModal = () => {
        this.setState({item: null});
    };

    render() {
        const {item} = this.state;
        return (
            <div>
                {!this.props.items ? (
                    <div>Loading...</div>
                ) : (
                    <ul className="products">
                        {this.props.items.map((item) => (
                            <li key={item.item_id}>
                                <div className="product">
                                    <a onClick={() => this.openModal(item)}>
                                        <img className="product-img" src={item.thumb} alt={item.item_name}></img>
                                        <p>{item.item_name}</p>
                                    </a>
                                    <div className="product-price">
                                        <span className="strike-of-text">{formatCurrency(item.actual_price)}</span>
                                        <div>{formatCurrency(item.discount_price)}</div>
                                        {/*<div className="acutal-price">{item.actual_price}</div>*/}
                                        <button
                                            onClick={() => this.props.addToCart(item)}
                                            className="button primary"
                                        >
                                            { !this.props.cartItems.some(el => el.item_id === item.item_id) ?
                                                (<div>
                                                    Add To Cart
                                                </div>):
                                                (<div>Add 1 more</div>)
                                            // ( <span>Add To Cart<span>) :(<span> Add one more to cart</span>)
                                            }
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {item && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="product-details">
                                <img src={item.thumb}></img>
                                <div className="product-details-description">
                                    <p className="product-details-item-name">
                                        <strong>{item.item_name}</strong>
                                    </p>
                                    <p className="product-details-description">{item.desc}</p>
                                    <div>
                                        MRP :<span
                                        className="product-price-strike">{formatCurrency(item.actual_price)}</span>

                                    </div>

                                    <div className="desc-product-price">
                                        <div>{formatCurrency(item.discount_price)}</div>

                                    </div>

                                    <button
                                        className="button primary"
                                        onClick={() => {
                                            this.props.addToCart(item);
                                            this.closeModal();
                                        }}
                                    >
                                        {!this.props.cartItems.some(el => el.item_id === item.item_id) ?
                                            (<div>
                                                Add To Cart
                                            </div>):
                                            (<div>In cart</div>)}
                                    </button>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        items: state.products.items,
        cartItems: state.cart.cartItems
    }),
    {
        fetchProducts,
        fetchInitialCart,
        addToCart,
    }
)(Items);
