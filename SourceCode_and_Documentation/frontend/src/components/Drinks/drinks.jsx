import React, { Component } from 'react';
import Item from '../Item-card/item'
import ItemInfo from '../Item-info/item-info'

export default class Home extends Component {
    render() {
        return (
            <div class="container">
                <header>
                    <h1>Drinks Page</h1>
                </header>
                <ItemInfo/>
            </div>
        )
    }
}