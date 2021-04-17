import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Home from '../Home/home';
import Drinks from '../Drinks/drinks';
import Ingredients from '../Ingredients/ingredients';
import ShoppingList from '../Shopping_List/shopping_list';
import Login from '../Login/Login';
import Register from '../Register/Register';


import createUserSession from '../../userSession'

class Main extends Component {

    // this method will be called on userSession updates
    userSessionUpdate = () => {
        this.forceUpdate();
    }

    render() { 
        
        // create a userSession and pass an update method
        let userSession = createUserSession(this.userSessionUpdate);

        return (
            <Router>
                <Navbar userSession={userSession}/>
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/shopping-list"><ShoppingList/></Route>
                    <Route path="/drinks"><Drinks/></Route>
                    <Route path="/ingredients"><Ingredients/></Route>
                    <Route path="/login"><Login userSession={userSession}/></Route>
                    <Route path="/register"><Register userSession={userSession}/></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;