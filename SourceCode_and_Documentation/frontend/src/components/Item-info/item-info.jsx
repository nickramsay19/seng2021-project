import React, { Component } from 'react';
import './item-info.css';

class ItemInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="item-info-card">
                <h1 className="item-title">
                    Item Title
                </h1>
                <div className="item-row">
                    <div className="item-image"></div>
                    <div className="item-ingredients">
                        <h2 className="item-header">
                            Ingredients
                        </h2>
                        <p className="item-ingredient-list">
                            Something to Map
                        </p>
                    </div>
                </div>
                
                <div className="item-instructions">
                    <h2 className="item-header">
                        Instructions
                    </h2>
                    <p className="item-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facilis inventore laboriosam doloribus saepe alias ab debitis adipisci natus quia cumque, iste obcaecati sequi! Aut iusto aperiam exercitationem rerum tempora!
                    </p>
                </div>
                <p></p>     
            </div>
         );
    }
}
 
export default ItemInfo;