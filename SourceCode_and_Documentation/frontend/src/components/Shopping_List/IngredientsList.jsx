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
            ingredients: cookies.get('ingredients') || ['Tequilla', 'Lime juice', 'Triple sec']
        };
    }
 
    // handle ingredient removal
    removeIngredient = ingredient => {

        // get cookies
        const { cookies } = this.props;
            
        let new_ingredients = [];

        for(let i = 0; i < this.state.ingredients.length; i++){
            if(ingredient != this.state.ingredients[i]) {
                new_ingredients.push(this.state.ingredients[i])
            }
        }
        cookies.set('ingredients', new_ingredients, { path: '/' });
        this.setState({ ingredients: new_ingredients });
    }
 
    render() {
        return (
            <ul className="list-group list-group-flush">
                {   
                    this.state.ingredients.map((ingredient, index) =>   
                    
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <input class="form-check-input" type="checkbox"></input>
                            <span>{ingredient} <span class="badge bg-primary rounded-pill">1</span></span>
                            
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