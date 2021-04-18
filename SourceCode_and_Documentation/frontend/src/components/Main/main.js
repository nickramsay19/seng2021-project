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
    constructor(props) {
        super(props);
        this.state = {
            drinkItems : [],
            ingItems : [],
            drinksLoaded : false,
            ingLoaded : false,
            error : false,
        }
    }

    componentDidMount() {
        this.fetchDrinks()
        this.fetchIngredients()
    }

    fetchDrinks = () => {
        fetch("http://localhost:5050/api/cocktails_details")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        drinksLoaded: true,
                        drinkItems: result.drinks,
                });
                },
                
                (error) => {
                    this.setState({
                        drinksLoaded: true,
                        error
                });
                }
            )
    }

    fetchIngredients = () => {
        fetch("http://127.0.0.1:5050/api/ingredients_details")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ingLoaded: true,
                        ingItems: result.ingredients,
                });
                },
                
                (error) => {
                    this.setState({
                        ingLoaded: true,
                        error
                });
                }
            )
    }

    // this method will be called on userSession updates
    userSessionUpdate = () => {
        this.forceUpdate();
    }

    render() { 
        
        // create a userSession and pass an update method
        let userSession = createUserSession(this.userSessionUpdate);
        // let database = setupDatabase();
        // setTimeout(()=>{console.log(database.getIngredients())},2000)
        return (
            <Router>
                <Navbar userSession={userSession}/>
                <Switch>
                    <Route exact path="/"><Home items={this.state.drinkItems}/></Route>
                    <Route path="/shopping-list"><ShoppingList/></Route>
                    <Route path="/drinks"><Drinks items={this.state.drinkItems} isLoaded={this.state.drinksLoaded}/></Route>
                    <Route path="/ingredients"><Ingredients items={this.state.ingItems} isLoaded={this.state.ingLoaded}/></Route>
                    <Route path="/login"><Login userSession={userSession}/></Route>
                    <Route path="/register"><Register userSession={userSession}/></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;