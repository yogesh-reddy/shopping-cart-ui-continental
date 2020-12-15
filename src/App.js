import './App.css';
import Items from "./components/items"
import {Switch, Route} from 'react-router-dom';
import HeaderComponent from "./components/HeaderComponent";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import React from 'react';
import store from './store/store'
import {Provider} from "react-redux"


class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div className="container">
                    <HeaderComponent/>
                    <Switch>
                        <Route exact path="/" component={Items}/>
                        <Route  path="/cart" component={Cart}/>
                        <Route  path="/orders" component={Orders}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;
