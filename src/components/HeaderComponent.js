import React from "react";
import "./header.css"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {CarFront32, ShoppingCart32} from '@carbon/icons-react';

class HeaderComponent extends React.Component {
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "./test.js";
        script.async = true;
        document.body.appendChild(script);
    }
    render() {

        return (
            <nav className="navbar">
        <span className="navbar-toggle" id="js-navbar-toggle">
            <i className="fas fa-bars"></i>
        </span>
                <a href="#" className="logo">Continental Corporation</a>
                <ul className="main-nav" id="js-menu">
                    <Link to="/" >
                    <li>
                        <a href="/" className="nav-links">Home</a>
                    </li>
                    </Link>
                    <Link to="/orders" className="cart">
                    <li>
                        <a href="/orders" className="nav-links">Orders</a>
                    </li>
                     </Link>
                    <li>
                    </li>
                    <li>
                        <a href="#" className="nav-links">Contact Us</a>
                    </li>
                    <Link to="/cart" className="cart">
                    <li>
                        <a  className="nav-links">
                             <span className="icon-header" id='lblCartCount'>
                        <ShoppingCart32 className="headericon"/>
                    </span >
                           <span>{this.props.cartItems.length}</span> </a>
                    </li>
                    </Link>
                </ul>
            </nav>
        );
    }
}
export default connect((state)=>({
    cartItems: state.cart.cartItems,
}),{})(HeaderComponent)

