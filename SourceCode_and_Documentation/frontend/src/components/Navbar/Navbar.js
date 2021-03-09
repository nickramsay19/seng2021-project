import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import './Navbar.css'
import { Button } from '../Button'


class Navbar extends Component {

    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Liquer</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#">Shopping List</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Drinks</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Ingredients</a>
                            </li>
                        </ul>
                        <ul class="nav justify-content-end">
                            <span class="navbar-text justify-content-end">
                                - Cognac Bandits Project
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar