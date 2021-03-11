import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Drinks from '../Drinks/drinks'
import Ingredients from '../Ingredients/ingredients'
import Shopping_List from '../Auth/register';

class Main extends Component {
    state = {  }
    render() { 
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/shopping-list" exact component={Shopping_List} />
                    <Route exact path="/drinks" exact component={Drinks} />
                    <Route path="/ingredients" exact component={Ingredients} />
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;