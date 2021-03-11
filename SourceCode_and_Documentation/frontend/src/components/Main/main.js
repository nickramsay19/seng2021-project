import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Drinks from '../Drinks/drinks'
import Ingredients from '../Ingredients/ingredients'
import Shopping_List from '../Shopping_List/shopping_list';

class Main extends Component {
    state = {  }
    render() { 
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/shopping-list"><Shopping_List/></Route>
                    <Route path="/drinks"><Drinks/></Route>
                    <Route path="/ingredients"><Ingredients/></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;