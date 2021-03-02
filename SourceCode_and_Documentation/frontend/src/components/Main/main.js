import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Drinks from '../Drinks/drinks'
import Account from '../Account/account'
import Contact from '../Contact/contact'
import SignUp from '../Auth/register'
import Register from '../Auth/register';

class Main extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navbar />
                <Router>
                    <Switch>
                        <Route exact path="/" exact component={Home} />
                        <Route path="/drinks" exact component={Drinks} />
                        <Route path="/account" exact component={Account} />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/register" exact component={Register} />
                    </Switch>              
                </Router>
            </div>
            

        );
    }
}
 
export default Main;