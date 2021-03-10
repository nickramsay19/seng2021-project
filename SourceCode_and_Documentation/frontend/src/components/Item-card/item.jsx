import React, { Component } from 'react';
import './item.css'


class Item extends Component {
    render() { 
        return ( 
            <div className="item-card">
                <div className="item-card-image"></div>
                <p className="item-name">
                    {this.props.name}
                </p>
            </div>
         );
    }
}
 
export default Item;