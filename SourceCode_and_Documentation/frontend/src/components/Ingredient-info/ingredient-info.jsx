import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class IngredientInfo extends Component {
    render() {
        const { match } = this.props;
        const { ingredientID } = match.params;
        console.log(ingredientID);
        return(
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {ingredientID || "Item Title"}
                    </h1>
                    <Link to="/ingredients"><p className="btn btn-outline-primary">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Description
                        </h2>
                        <div className="item-ingredient-list">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam impedit quasi architecto necessitatibus officia ea consequatur. Voluptate, eos. Soluta architecto suscipit ad quae laborum odio sit iure minus accusantium sint.
                        </div>
                    </div>
                </div>
                
                 
            </div>
        )
    }
}
const IngredientInfoRouter = withRouter(IngredientInfo)
export default IngredientInfoRouter