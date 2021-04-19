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

        this.state = {
            ingredients: []
        };

        
    }

    componentDidMount() {
        this.getIngredients();
    }

    // return ingredients with duplicates removed
    getUniqueIngredients = () => {

        console.log('b4 removal dups')
        console.log(this.state.ingredients)

        // convert ingredients array to state, then array to remove duplicates
        let removeDuplicates = [... new Set(this.state.ingredients)];
        console.log('remove dups');
        console.log(removeDuplicates);
        return removeDuplicates;
    }

    getIngredients = () => {
        this.props.userSession.getShoppingList().then(res => {
            // set state
            this.setState({
                ingredients: res.data
            });

            console.log('after set')
            console.log(this.state.ingredients);
        })
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

    removeIngredient = ingredient => {
        this.props.userSession.removeFromShoppingList(ingredient).then(res => {
            this.getIngredients();
        })
    }
 
    render() {
        return (
            <ul className="list-group list-group-flush">
                {   
                    this.getUniqueIngredients().map((ingredient, index) =>   
                    
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            <span>{ingredient} <small className="text-muted">x { this.getIngredientCount(ingredient) }</small></span>
                            
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