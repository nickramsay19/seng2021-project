import React, { Component } from 'react';
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

        // TODO: Search for string similarity instead of exact match (case sensitive, typo sensitive, etc)
        for(var i = 0; i < Cocktails.length; i++) {
            // check if query is in the cocktail name
            if(query.includes(Cocktails[i].name)){

                // append the cocktail to search_results
                results.push(Cocktails[i]);

                // move on to next cocktail, cocktail already added
                continue;
            }
            // loop through ingredients
            // TODO: Search for string similarity instead of exact match (case sensitive, typo sensitive, etc)
            for(var j = 0; j < Cocktails[i].ingredients.length; j++){
                if(query.includes(Cocktails[i].ingredients[j])){

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
                <input type="search" onChange={e => this.onSearchQueryChange(e.target.value)}/>
                <ul>
                    { this.state.search_results.map((result) => <li>{result.name}</li>) }
                </ul>

            </div>
        )
    }
}

export default Searchbar