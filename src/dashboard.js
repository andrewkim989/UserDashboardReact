import React, { Component } from "react";
import "./App.css";
import "react-router";
import {NavLink, Redirect} from "react-router-dom";

var users = [];
var valid = false;

class Home extends Component {
    render() {
        var toplink;
        var homemessage;

        if (valid) {
            toplink = <NavLink to = "/dashboard" className = "link">Go to Dashboard</NavLink>;
            homemessage = <h3>Welcome to the User Dashboard home page! Click on 
                        the link above to go to your dashboard!</h3>;
        }
        else {
            toplink = <NavLink to = "/login" className = "link">Login/Register</NavLink>;
            homemessage = <h3>Welcome to the User Dashboard home page! Click on 
                        the link above to get started!</h3>;
        }
        return (
            <div id = "home">
                {toplink}
                <div id = "blackline"></div>
                <div id = "homemain">
                    <h1>Home</h1>
                    {homemessage}
                </div>
            </div>
        ) 
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lName: "",
            lPassword: "",
            loginError: "",
            rName: "",
            rNameError: "",
            rPassword: "",
            rPasswordError: "",
            submit: false
        };

        this.handleLName = this.handleLName.bind(this);
        this.handleLPassword = this.handleLPassword.bind(this);
        this.handleRName = this.handleRName.bind(this);
        this.handleRPassword = this.handleRPassword.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
    }

    handleLName(event) {
        var name = event.target.value;
        this.setState({lName: name});
    }

    handleLPassword(event) {
        var pass = event.target.value;
        this.setState({lPassword: pass});
    }

    handleRName(event) {
        var name = event.target.value;
        this.setState({rName: name});

        if (name.length < 5) {
            this.setState({rNameError: "Username must be at least 5 characters long.", submit: false});
        }
        else {
            this.setState({rNameError: ""});
            if (this.state.rPassword.length > 0) {
                this.setState({submit: true});
            }
        }
    }

    handleRPassword(event) {
        var pass = event.target.value;
        this.setState({rPassword: pass});

        if (pass.length < 6) {
            this.setState({rPasswordError: "Password must be at least 6 characters long.", submit: false});
        }
        else {
            this.setState({rPasswordError: ""});
            if (this.state.rName.length > 0) {
                this.setState({submit: true});
            }
        }
    }

    loginSubmit(e) {
        e.preventDefault();

        var found = users.filter(user => {
            return user.name === this.state.lName;
        });

        var match = users.filter(user => {
            return user.name === this.state.lName && user.password === this.state.lPassword;
        });

        if (found.length === 0) {
            this.setState({lName: "", lPassword: "", loginError: "Name does not exist in our system."});
        }
        else if (match.length === 0) {
            this.setState({lName: "", lPassword: "", loginError: "Incorrect password."});
        }
        else {
            valid = true;
            this.setState({lName: "", lPassword: ""});
            this.props.history.push("/dashboard");
        }
    }

    registerSubmit(e) {
        e.preventDefault();
        var nameexist = users.filter(user => {
            return user.name === this.state.rName;
        });

        var passwordexist = users.filter(user => {
            return user.password === this.state.rPassword;
        });

        if (nameexist.length > 0) {
            this.setState({rName: "", rPassword: "", rNameError: "Username already exists.", 
            submit: false});
        }
        else if (passwordexist.length > 0) {
            this.setState({rName: "", rPassword: "", rPasswordError: "Password already exists.", 
            submit: false});
        }
        else {
            users.push({name: this.state.rName, password: this.state.rPassword});
            valid = true;
            this.setState({rName: "", rPassword: ""});
            this.props.history.push("/dashboard");
        }
    }

    render() {
        if (valid) {
            return <Redirect exact to = "/dashboard"/>
        }
        else {
            return (
                <div id = "signup">
                    <NavLink to = "/" className = "link">Home</NavLink>
                    <div id = "blackline"></div>
                    <div id = "login">
                        <form onSubmit = {this.loginSubmit}>
                            <h2>Login</h2>
    
                            <div className = "error">{this.state.loginError}</div><br></br>
                            Name: <input type = "text" value = {this.state.lName}
                            onChange = {this.handleLName}></input><br></br><br></br>
    
                            Password: <input type = "password" value = {this.state.lPassword}
                            onChange = {this.handleLPassword}></input><br></br><br></br>
    
                            <input type = "submit" className = "btn btn-success" value = "Login"></input>
                        </form>
                    </div>
                    <div id = "register">
                        <h2>Register</h2><br></br>
                        <form onSubmit = {this.registerSubmit}>
                            <div className = "error">{this.state.rNameError}</div>
                            Name: <input type = "text" value = {this.state.rName}
                            onChange = {this.handleRName}></input><br></br><br></br>
    
                            <div className = "error">{this.state.rPasswordError}</div>
                            Password: <input type = "password" value = {this.state.rPassword}
                            onChange = {this.handleRPassword}></input><br></br><br></br>
    
                            <input type = "submit" className = "btn btn-primary" value = "Register"
                            disabled = {!this.state.submit}></input>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

class Dashboard extends Component {

    render() {
        if (!valid) {
            return (
                <div id = "nope">
                    <NavLink to = "/" className = "link">Home</NavLink>
                    <div id = "blackline"></div>
                    <div id = "nopemain">
                        <h3>Oops! Sorry! You cannot see this page unless you have an account
                        on this website! Please click on the link above to return to this
                        site's home page! </h3>
                    </div>
                </div>
            )
        }
        else {
            var userlist = users.map ((user, i) => {
                return (
                    <li key = {i}>{user.name}</li>
                )
            });

            return(
                <div id = "dashboard">
                    <NavLink to = "/logout" className = "link">Logout</NavLink>
                    <div id = "blackline"></div>
                    <div id = "dashmain">
                        <h3>Welcome to the User Dashboard main page! Here are the list of users
                            below who have registered! </h3>
                        <ul>
                            {userlist}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

class Logout extends Component {
    componentWillMount () {
        valid = false;
        this.props.history.push("/");
    }

    render() {
        return null;
    }
}

export {Home, Login, Dashboard, Logout}