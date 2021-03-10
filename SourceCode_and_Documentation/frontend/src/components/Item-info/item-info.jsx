import React, { Component } from 'react';
import './item-info.css';
import { Link } from 'react-router-dom';

class ItemInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="item-info-card">
                <h1 className="item-title">
                    {this.props.name}
                </h1>
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients
                        </h2>
                        <p className="item-ingredient-list">
                            {this.props.ingredients.map(item => 
                                `${item}\n`    
                            )}
                        </p>
                    </div>
                </div>
                
                <div className="item-instructions">
                    <h2 className="item-header">
                        Instructions
                    </h2>
                    <p className="item-text">
                        {this.props.instructions}
                    </p>
                </div>
                <Link to="/drinks"><p>Back</p></Link>
                <p>Add to Shopping List</p>   
            </div>
         );
    }
}
 
export default ItemInfo;