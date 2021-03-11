import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
 
class IngredientsList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
    
        // get cookies
        const { cookies } = props;

        // set state
        this.state = {
            ingredients: cookies.get('ingredients') || []
        };
    }

    // return ingredients with duplicates removed
    getUniqueIngredients = () => {

        // convert ingredients array to state, then array to remove duplicates
        return [... new Set(this.state.ingredients)];
    }

    // return the amount of an ingredient in ingredients
    getIngredientCount = ingredient => {

        let count = 0;

        for(let i = 0; i < this.state.ingredients.length; i++) {
            if(this.state.ingredients[i] === ingredient) {
                count++;
            }
        }

        return count;
    }
 
    // handle ingredient removal
    removeIngredient = ingredient => {

        // get cookies
        const { cookies } = this.props;
            
        // declare new ingredients array
        let new_ingredients = [];

        // loop through each ingredient
        for(let i = 0; i < this.state.ingredients.length; i++){

            // check if the ingredient is not the one to be removed
            if(ingredient != this.state.ingredients[i]) {

                // add ingredient to new ingredients array
                new_ingredients.push(this.state.ingredients[i])
            }
        }

        // adjust ingredients in cookies
        cookies.set('ingredients', new_ingredients, { path: '/' });

        // set the component state to reflect ingredients
        this.setState({ ingredients: new_ingredients });
    }
 
    render() {
        return (
            <ul className="list-group list-group-flush">
                {   
                    this.getUniqueIngredients().map((ingredient, index) =>   
                    
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <input class="form-check-input" type="checkbox"></input>
                            <span>{ingredient} <small class="text-muted">x { this.getIngredientCount(ingredient) }</small></span>
                            
                            <button className="btn btn-danger" onClick={() => this.removeIngredient(ingredient)}>
                                Remove
                            </button>
                        </li>
                    ) 
                }
            </ul>
        );
    }
}
 
export default withCookies(IngredientsList);