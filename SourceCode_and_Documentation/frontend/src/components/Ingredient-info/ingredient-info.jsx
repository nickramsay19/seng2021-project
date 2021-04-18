import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../Item-info/item-info.css'
class IngredientInfo extends Component {
    render() {
        const { match } = this.props;
        const { ingredientID } = match.params;
        var ingredient = this.props.ingredients.find((i) => {
            if (i.ingredient === ingredientID) {
                return true
            }
        })
        if (typeof ingredient === 'undefined' ) {
            ingredient = {
                ingredient : '',
                description : '', 
                used_in : []
            }
        }
        return(
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {ingredient.ingredient || ingredientID}
                    </h1>
                    <Link to="/ingredients"><p className="btn btn-outline-primary">To Ingredients Page</p></Link>
                </div>
                
                <div className="item-row">
                    <img className="item-image" alt={ingredientID} src={`http://www.thecocktaildb.com/images/ingredients/${ingredientID}.png`}></img>
                    <div className="item-ingredients">
                        <small className="text-muted">Used in:</small>
                        <div className="drinks-list">
                            {ingredient.used_in.length ? ingredient.used_in.map((item)=> 
                                <Link to={`/drinks/${item.name}`}className="btn btn-shortened btn-outline-primary">{item.name}</Link>
                            ): <small>Error: could not find '{ingredientID}'' in fetched ingredients.</small>
                            }
                            {}
                        </div>
                    </div>
                </div>
                <div className="item-instructions">
                        <h2 className="item-header">
                            Description
                        </h2>
                        <div className="item-ingredient-list">
                            {ingredient.description || "No description provided"}
                        </div>
                    </div>
                 
            </div>
        )
    }
}
const IngredientInfoRouter = withRouter(IngredientInfo)
export default IngredientInfoRouter