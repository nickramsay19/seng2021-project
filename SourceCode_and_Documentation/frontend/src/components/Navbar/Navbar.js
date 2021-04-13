import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import './Navbar.css'
//import { Button } from '../Button'


class Navbar extends Component {
    state = { 
        clicked: false,
        userSession: this.props.userSession
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    logInButton = () => {
        if(!this.state.userSession.getIsLoggedIn()){
            return <Link className="nav-links" to="/login">Login</Link>
        } else {
            return <div styles="display: none;"></div>
        }
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Liqueur<i className="fab fa-react"></i></h1> 
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}

                    <this.logInButton />
                </ul>
            </nav>
        )
    }
}

export default Navbar