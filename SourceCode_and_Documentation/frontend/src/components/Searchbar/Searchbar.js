import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import stringSimilarity from 'string-similarity';
import { Cocktails } from '../Drinks/Cocktails'
import './Searchbar.css';


class Searchbar extends Component {
    state = { 
        search_results: []
    }

    getMinifiedDrinks = () => {
        // get all items
        let items = this.props.items;
        let ingredients = this.getMinifiedIngredients();

        // get all drinks
        let drinks = [];
        for (let i = 0; i < ingredients.length; i++) {
            for (let d = 0; d < ingredients[i].used_in.length; d++) {
                // add the drink to drinks 
                drinks.push(ingredients[i].used_in[d].name);
            }
        }

        // remove duplicates and return
        return [...new Set(drinks)];
    }

    getMinifiedIngredients = () => {
        // get all items
        let items = this.props.items;

        // get all ingredients
        let ingredients = [];
        for (let i = 0; i < items.length; i++) {
            
            // get all the cocktails ingredient i is used in
            let drinks_used_in = []
            for (let d = 0; d < items[i].used_in.length; d++) {
                drinks_used_in.push(items[i].used_in[d]);
            }

            // add the ingredient to ingredients array
            ingredients.push({
                ingredient_name: items[i].ingredient,
                used_in: drinks_used_in
            });
        }

        // remove duplicates and return
        return [...new Set(ingredients)];
    }

    onSearchQueryChange2 = query => {

        // obtain a copy of drinks and ingredients
        let drinks = this.getMinifiedDrinks();
        let ingredients = this.getMinifiedIngredients();

        // declare results array to be returned
        let results = []

        // split query into separate word searches
        let query_words = query.split(" ");

        // loop through each query word
        for (let w = 0; w < query_words.length; w++) {

            // check query against ingredients
            for (let i = 0; i < ingredients.length; i++) {
                if(stringSimilarity.compareTwoStrings(query_words[w].toLowerCase(), ingredients[i].ingredient_name.toLowerCase()) > 0.7){

                    // add all cocktails made with ingredient i
                    for (let d = 0; d < ingredients[i].used_in.length; d++) {
                        results.push(ingredients[i].used_in[d].name)
                    }
                    
                    // break the for loop, ingredient has already been added
                    break;
                }
            }

            // check against cocktail name
            for (let d = 0; d < drinks.length; d++) {
                if(stringSimilarity.compareTwoStrings(query_words[w].toLowerCase(), drinks[d].toLowerCase()) > 0.7){

                    results.push(drinks[d])
                    
                    // break the for loop, ingredient has already been added
                    break;
                }
            }
        }

        console.log(results.length);

        // set search_results
        // remove duplicates by converting to a set then arr again
        this.setState({
            search_results: [...new Set(results)],
        })
        
    }

    // updates search_results based on search bar input
    onSearchQueryChange = (query) => {

        // split query into separate word searches
        let query_words = query.split(" ");

        // declare a new results array
        let results = [];
        
        // loop through each query word
        for(let i = 0; i < query_words.length; i++) {

            // loop through each cocktail
            for(let j = 0; j < Cocktails.length; j++) {

                // split cocktail into separate words
                let cocktails_words = Cocktails[j].name.split(" ")

                // loop through each word in cocktail name
                for(let k = 0; k < cocktails_words.length; k++) {

                    // perform a string similarity check between query (to lower case) and cocktail name (to lower case)
                    if(stringSimilarity.compareTwoStrings(query_words[i].toLowerCase(), cocktails_words[k].toLowerCase()) > 0.7){

                        // append the cocktail to search_results
                        results.push(Cocktails[j]);

                        // break the for loop, cocktail has already been added
                        break;
                    }
                    // loop through ingredients
                    for(let l = 0; l < Cocktails[j].ingredients.length; l++){

                        // split cocktail ingredient into separate words
                        let ingredient_words = Cocktails[j].ingredients[l].split(" ")

                        for(let m = 0; m < ingredient_words.length; m++) {
                            // perform a string similarity check between query (to lower case) and all cocktail ingredients (to lower case)
                            if(stringSimilarity.compareTwoStrings(query_words[i].toLowerCase(), ingredient_words[m].toLowerCase()) > 0.7){

                                // append the cocktail to search_results
                                results.push(Cocktails[j]);

                                // break the for loop, cocktail has already been added
                                break;
                            }
                        }
                        
                    }
                }
            }
        }

        // set search_results
        // remove duplicates by converting to a set then arr again
        this.setState({
            search_results: [...new Set(results)],
        })
    }

    render() {
        return(
            <div id="searchbar">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Margarita" onChange={e => this.onSearchQueryChange2(e.target.value)} /> 
                </div>
                
                <ul className="list-group">
                    { 
                        this.state.search_results.map(result => <li className="list-group-item" key={result}>
                            <Link to={"drinks/" + result }>{result}</Link>
                        </li>) 
                    }
                </ul>

            </div>
        )
    }
}

export default Searchbar