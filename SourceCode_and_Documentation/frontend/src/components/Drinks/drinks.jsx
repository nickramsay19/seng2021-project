import React, { Component } from 'react';
import Item from '../Item/item'

export default class Home extends Component {
    render() {
        return (
            <div class="container">
                <header>
                    <h1>Drinks Page</h1>
                </header>
                <Item />
            </div>
        )
    }
}