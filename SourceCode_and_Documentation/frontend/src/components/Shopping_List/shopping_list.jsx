import React, { Component } from 'react';
import IngredientsList from './IngredientsList';
import { Link } from 'react-router-dom';

import './ShoppingList.css';

export default class Shopping_List extends Component {

    conditionalIngredientsList = () => {
        if (this.props.userSession.getIsLoggedIn()) {
            return <IngredientsList userSession={this.props.userSession}/>
        } else {
            return <p>Please <Link to="/login">log in</Link> to use the shopping list feature. Or your can register <Link to="/register">here.</Link></p>
        }
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Shopping List</h1>
                    <this.conditionalIngredientsList />

                </header>
            </div>
        )
    }
}