import React, { Component } from 'react';
import './item-info.css';
import { Link } from 'react-router-dom';

class ItemInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="item-info-card">
                <div className="item-top-bar">
                    <h1 className="item-title">
                        {this.props.name}
                    </h1>
                    <p className="item-button">Add to Shopping List</p>  
                    <Link to="/drinks"><p className="item-button">Back</p></Link>
                </div>
                
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients
                        </h2>
                        <div className="item-ingredient-list">
                            {this.props.ingredients.map(item => 
                                <p className="item-ingredient-highlight">{item}</p>    
                            )}
                        </div>
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
                
                 
            </div>
         );
    }
}
 
export default ItemInfo;