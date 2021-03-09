import React, { Component } from 'react';
import './item.css'

class Item extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="item-card">
                <div className="item-image"></div>
                <p className="item-name">
                    Item Name
                </p>
            </div>
         );
    }
}
 
export default Item;