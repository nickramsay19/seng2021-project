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
import setupDatabase from '../../setupDatabase'

class Main extends Component {

    state = {
        cocktailData: {
            getDrinks: () => { return [] },
            getIngredients: () => { return [] }
        }
    }

    // this method will be called on userSession updates
    userSessionUpdate = () => {
        this.forceUpdate();
    }

    updateCocktailData = () => {
        setupDatabase(this.updateCocktailData).then(res => {
            this.setState({cocktailData: res});
            this.forceUpdate();
        });
        
    }

    componentDidMount() {
        setupDatabase(this.updateCocktailData).then(res => {
            this.setState({cocktailData: res});
        });
    }

    someFunc = () => {
        if(this.state.cocktailData.getDrinks().length > 0) { 
            return <p>{this.state.cocktailData.getDrinks()[0].name}</p> 
        } else {
            return <p>bye</p>
        }
    }

    render() { 
        
        // create a userSession and pass an update method
        let userSession = createUserSession(this.userSessionUpdate);

        return (
            <Router>
                <Navbar userSession={userSession}/>
                <this.someFunc />
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/shopping-list"><ShoppingList/></Route>
                    <Route path="/drinks"><Drinks cocktailData={this.state.cocktailData}/></Route>
                    <Route path="/ingredients"><Ingredients/></Route>
                    <Route path="/login"><Login userSession={userSession}/></Route>
                    <Route path="/register"><Register userSession={userSession}/></Route>
                </Switch>              
            </Router>
        );

    }
}
 
export default Main;