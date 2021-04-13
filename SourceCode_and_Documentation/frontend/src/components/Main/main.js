import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import Drinks from '../Drinks/drinks'
import Account from '../Account/account'
import Contact from '../Contact/contact'
// import SignUp from '../Auth/register'
import Register from '../Auth/register';
import Login from '../Login/Login';

class Main extends Component {
    state = {  }
    render() { 
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/drinks" exact component={Drinks} />
                    <Route path="/account" exact component={Account} />
                    <Route path="/contact" exact component={Contact} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login}></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;