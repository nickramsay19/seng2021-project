import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import stringSimilarity from 'string-similarity';
import { Cocktails } from '../Drinks/Cocktails'
import './Searchbar.css';


class Searchbar extends Component {
    state = { 
        search_results: []
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
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Margarita" onChange={e => this.onSearchQueryChange(e.target.value)} /> 
                    <button class="btn btn-outline-secondary" type="button">Search</button>
                </div>
                
                <ul class="list-group">
                    { 
                        this.state.search_results.map(result => 
                        <li class="list-group-item" key={result.name}>
                            <Link to={"drinks/" + result.id }>{result.name}</Link>
                        </li>) }
                </ul>

            </div>
        )
    }
}

export default Searchbar