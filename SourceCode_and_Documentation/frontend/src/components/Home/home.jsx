import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar'

export default class Home extends Component {
    render() {
        return (
            <header>
                Main Page

                <h1>Search bar</h1>
                <Searchbar />
            </header>
        )
    }
}