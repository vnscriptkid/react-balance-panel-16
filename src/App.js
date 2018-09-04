import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { userIsAuthenticated, userIsNotAuthenticated } from "./helpers/auth";
import Settings from "./components/settings/Settings";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={userIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={userIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={userIsAuthenticated(ClientDetails)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={userIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/login"
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={userIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={userIsAuthenticated(Settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
