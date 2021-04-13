import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Drinks from '../Drinks/drinks'
import Ingredients from '../Ingredients/ingredients'
import ShoppingList from '../Shopping_List/shopping_list';
import Login from '../Login/Login'
import createUserSession from '../../userSession'

class Main extends Component {
    state = { 
        userSession: createUserSession()
    }
    render() { 
        return (
            <Router>
                <Navbar userSession={this.state.userSession}/>
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/shopping-list"><ShoppingList/></Route>
                    <Route path="/drinks"><Drinks/></Route>
                    <Route path="/ingredients"><Ingredients/></Route>
                    <Route path="/login"><Login userSession={this.state.userSession}/></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;