import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import IngredientsList from './IngredientsList';

import './ShoppingList.css';

export default class Shopping_List extends Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Shopping List</h1>
                    <CookiesProvider>
                        <IngredientsList userSession={this.props.userSession}/>
                    </CookiesProvider>
                </header>
            </div>
        )
    }
}