import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class IngredientInfo extends Component {
    render() {
        const { match } = this.props;
        const { ingredientID } = match.params;
        console.log(this.props.ingredients);
        var ingredient = this.props.ingredients.find((i) => {
            if (i.ingredient === ingredientID) {
                return true
            }
        })
        if (typeof ingredient === 'undefined' ) {
            ingredient = {
                ingredient : '',
                description : '', 
            }
        }
        console.log(ingredient)
        return(
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {ingredient.ingredient || "Not in database"}
                    </h1>
                    <Link to="/ingredients"><p className="btn btn-outline-primary">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <img className="item-card-image" src={`http://www.thecocktaildb.com/images/ingredients/${ingredient.ingredient}.png`}></img>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Description
                        </h2>
                        <div className="item-ingredient-list">
                            {ingredient.description || "No description provided"}
                        </div>
                    </div>
                </div>
                
                 
            </div>
        )
    }
}
const IngredientInfoRouter = withRouter(IngredientInfo)
export default IngredientInfoRouter