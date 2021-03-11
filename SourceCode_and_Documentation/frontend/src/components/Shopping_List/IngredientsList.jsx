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
        let new_ingredients = this.state.ingredients;

        // remove single occurence of ingredient
        new_ingredients.splice(new_ingredients.indexOf(ingredient), 1);
        

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