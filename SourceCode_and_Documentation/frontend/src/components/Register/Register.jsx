import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Register extends Component {

    username = "";
    password = "";

    state = { 
        username: "",
        password: "",
        userSession: this.props.userSession,
        redirect: null
    }

    register = () => {
        let username = this.state.username;
        let password = this.state.password;

        let loginSuccessful = this.state.userSession.logIn(username, password);

        // redirect to home page if login successful
        if (loginSuccessful) {
            let state = this.state;
            state.redirect = true;
            this.setState(state);
        }
    }

    handleUsernameChange = (event) => {
        //this.setState({username: event.target.value, password: this.state.password});
        this.username = event.targe.value;
    }

    handlePasswordChange = (event) => {
        this.setState({username: this.state.username, password: event.target.value});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <header>
                    <h1>Register</h1>
                </header>
                    
                <form>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.register}>Register</button>
                </form>
            </div>
        )
    }
}