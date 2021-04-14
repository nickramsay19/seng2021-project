import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/home'
import DrinksPage from '../Drinks/drinks'
import IngredientsPage from '../Ingredients/ingredients'
import ShoppingList from '../Shopping_List/shopping_list';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:      null,
            isLoaded:   false,
            drinks: [],
            betterDrinks: [],
            drinkDetails: [],
            ingredients: [],
        };
    }

    componentDidMount() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
            .then(res=>res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        drinks: result.drinks,
                    });
                    console.log(this.state.drinks)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
            .then(
                () => {
                    Promise.all(
                        this.state.drinks.slice(0,100).map(
                            drink => fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+drink.idDrink)
                                .then(res=>res.json())
                                .then(res=> {
                                    this.state.betterDrinks.push(res.drinks);
                                    console.log(this.state.betterDrinks.length - 1)
                                    console.log(this.state.betterDrinks[this.state.betterDrinks.length - 1][0].strDrink)
                                })
                        )
                    ).then(
                        () => {
                            
                            // this.state.ingredients.push
                        }
                    )
                }
                
            )

    }
    render() { 
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path="/shopping-list"><ShoppingList/></Route>
                    <Route path="/drinks"><DrinksPage/></Route>
                    <Route path="/ingredients"><IngredientsPage/></Route>
                </Switch>              
            </Router>
        );
    }
}
 
export default Main;

/**
 * ListAllCocktails   = https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
 * LookupCocktailByID = https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178323
 * LookupIngreByName  = https://www.thecocktaildb.com/api/json/v1/1/search.php?i=Sugar%20Syrup
 * 1. fetch cocktails [thumbnail, name, id] (used in drinks page)
 * 2. extract ingredients out of called drinks (circumvents 100 item limit)
 * 3. filter to unique
 * 4. pass ingredients into Ingredients page.
 * https://stackoverflow.com/questions/43569519/react-ajax-multiple-nested-fetch-get
 * drinks [
 *  {
 *      strDrink: 
 *      idDrink:
 *  }
 * ]
 * 
 * 
 * ingredients [
 * 
 * ]
 * Pseudo functions to timeout if promise takes too long
 * https://stackoverflow.com/questions/48577702/setting-a-timeout-for-each-promise-within-a-promise-all
Promise.delay = function(t, val) {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null, val), t);
    });
}

Promise.raceAll = function(promises, timeoutTime, timeoutVal) {
    return Promise.all(promises.map(p => {
        return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])
    }));
}
 */

