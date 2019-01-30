import React, { Component } from "react";
import "./App.css";
import "react-router";
import {BrowserRouter, Route} from "react-router-dom";
import {Home, Login, Dashboard, Logout} from "./dashboard.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <div id = "top">
            <h1>User Dashboard</h1>
          </div>
          <div>
            <Route exact path = "/" component = {Home} />
            <Route path = "/login" component = {Login} />
            <Route path = "/dashboard" component = {Dashboard} />
            <Route path = "/logout" component = {Logout} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
