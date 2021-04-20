import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom'
 
class IngredientsList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ingredients: []
        };
    }

    componentDidMount() {
        this.getIngredients();
    }

    getIngredients = () => {
        this.props.userSession.getShoppingList().then(res => {
            // set state
            this.setState({
                ingredients: res.data
            });
        })
    }

    // return ingredients with duplicates removed
    getUniqueIngredients = () => {

        // convert ingredients array to state, then array to remove duplicates
        let removeDuplicates = [... new Set(this.state.ingredients)];
        console.log('remove dups');
        console.log(removeDuplicates);
        return removeDuplicates;
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

    noIngredientsDisplay = () => {
        console.log(this.state.ingredients);
        if (this.state?.ingredients?.length > 0) {
            return <div styles="display: none;"></div>
        } else {
            return <p>Add ingredients from the <Link to="drinks">drinks page</Link> and they will show up here.</p>
        }
    }
 
    render() {
        return (
            <div id="ingredients-list">
                <this.noIngredientsDisplay />

                <ul className="list-group list-group-flush">
                    {   
                        this.getUniqueIngredients().map((ingredient, index) =>   
                        
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                <span><Link to={ '/ingredients/' + ingredient }>{ingredient}</Link>&nbsp;<small className="text-muted">x { this.getIngredientCount(ingredient) }</small></span>
                                
                                <button className="btn btn-danger" onClick={() => this.removeIngredient(ingredient)}>
                                    Remove
                                </button>
                            </li>
                        ) 
                    }
                </ul>
            </div>
        );
    }
}
 
export default IngredientsList;