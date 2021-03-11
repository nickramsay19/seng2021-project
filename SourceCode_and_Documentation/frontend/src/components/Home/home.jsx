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
                    <h3>Search bar</h3>
                
                <Searchbar />
                <Card />   
            </div>
        )
    }
}