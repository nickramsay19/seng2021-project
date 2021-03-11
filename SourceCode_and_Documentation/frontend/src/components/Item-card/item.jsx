import React, { Component } from 'react';
import './item.css'
class Item extends Component {
    render() { 
        // console.log(this.props);
        return ( 
            <div className="item-card">
                <div className="item-card-image"></div>
                <p className="item-name">
                    {this.props.children}
                </p>
            </div>
         );
    }
}

export default Item;