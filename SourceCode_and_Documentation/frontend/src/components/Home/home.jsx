import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar'

export default class Home extends Component {
    render() {
        return (
            <div class="container">
                <header>
                    <h1>Main Page</h1>
                </header>
                <h3>Search bar</h3>
                <Searchbar />
            </div>
        )
    }
}