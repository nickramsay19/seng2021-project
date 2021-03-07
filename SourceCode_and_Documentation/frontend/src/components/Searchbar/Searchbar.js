import React, { Component } from 'react';
import stringSimilarity from 'string-similarity';
import './Searchbar.css';
import { Cocktails } from './Cocktails'

class Searchbar extends Component {
    state = { 
        search_results: []
    }

    // updates search_results based on search bar input
    onSearchQueryChange = (query) => {

        // declare a new results array
        let results = [];
        
        // loop through each cocktail
        for(var i = 0; i < Cocktails.length; i++) {

            // perform a string similarity check between query (to lower case) and cocktail name (to lower case)
            if(stringSimilarity.compareTwoStrings(query.toLowerCase(), Cocktails[i].name.toLowerCase()) > 0.7){

                // append the cocktail to search_results
                results.push(Cocktails[i]);

                // move on to next cocktail, cocktail already added
                continue;
            }
            // loop throughingredients
            for(var j = 0; j < Cocktails[i].ingredients.length; j++){

                // perform a string similarity check between query (to lower case) and all cocktail ingredients (to lower case)
                if(stringSimilarity.compareTwoStrings(query.toLowerCase(), Cocktails[i].ingredients[j].toLowerCase()) > 0.7){

                    // append the cocktail to search_results
                    results.push(Cocktails[i]);

                    // break the for loop, cocktail already added
                    break;
                }
            }
        }
    
        // set search_results
        this.setState({
            search_results: results
        })
    }

    render() {
        return(
            <div id="searchbar">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Margarita" onChange={e => this.onSearchQueryChange(e.target.value)}/>
                </div>
                
                <ul>
                    { this.state.search_results.map((result) => <li><a href="#">{result.name}</a></li>) }
                </ul>

            </div>
        )
    }
}

export default Searchbar