import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar'
import Card from '../HomePage-Items/card'



export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Home Page</h1>
                </header>
                    <h3>Enter an ingredient or cocktail to get started.</h3>
                
                <Searchbar items={this.props.items} isLoaded={this.props.ingLoaded}/>
                <Card />   
            </div>
        )
    }
}