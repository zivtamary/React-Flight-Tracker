import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Upload from "./components/Upload";
import Admin from "./components/Admin";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { auth } = this.props;
    if (auth !== null) {
      return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin" component={Admin} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/upload" component={Upload} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      )
    } else {
      return (
        null
      )
    }
  }
}

const mapStateToProps = state => ({
  auth:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(App);
