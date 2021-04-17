import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import './Navbar.css'

class Navbar extends Component {
    state = { 
        clicked: false,
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    logOut = () => {
        this.props.userSession.logOut();
    }

    logInLogOutButton = () => {
        if(!this.props.userSession.getIsLoggedIn()){
            return <li><Link className="nav-links" to="/login">Login</Link></li>
        } else {
            return <li onClick={this.logOut}><a href="#" className="nav-links">Logout</a></li>
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

                    <this.logInLogOutButton />
                </ul>
            </nav>
        )
    }
}

export default Navbar