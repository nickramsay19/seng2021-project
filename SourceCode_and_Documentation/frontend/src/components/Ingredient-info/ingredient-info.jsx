import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class IngredientInfo extends Component {
    render() {
        const { match } = this.props;
        const { ingredientID } = match.params;
        console.log(this.props);
        return(
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {this.props.name || "Item Title"}
                    </h1>
                    <Link to="/ingredients"><p className="btn btn-outline-primary">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <img className="item-image" src={this.props.image}></img>
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