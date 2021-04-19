import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    state = { 
        username: "",
        password: "",
        userSession: this.props.userSession,
        redirect: null,
        fail: false
    }

    login = () => {
        let username = this.state.username;
        let password = this.state.password;

        let loginSuccessful = this.state.userSession.logIn(username, password);
        // redirect to home page if login successful
        if (loginSuccessful) {
            let state = this.state;
            state.redirect = true;
            this.setState(state);
        } else {
            let state = this.state;
            state.fail = true;
            this.setState(state);
            console.log(this.state.fail);
        }
    }

    failDisplay = () => {
        return (<div className="alert alert-danger" role="alert">Failed to log in. </div>)
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value, password: this.state.password});
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
                    <h1>Login</h1>
                </header>
                    
                <form>
                    {this.state.fail ? this.failDisplay() : null}
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Check me out</label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.login}>Log in</button>
                </form>
            </div>
        )
    }
}