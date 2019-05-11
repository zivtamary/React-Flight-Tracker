import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, clearErrors } from "../store/actions/authActions";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidUpdate() {
    const { user, isAuthenticated } = this.props.auth;
    if (user && isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.props.clearErrors();
    const { user, isAuthenticated } = this.props.auth;
    if (user && isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    const user = {
      username,
      password,
    };

    this.props.login(user, this.props.history);
  };

  render() {
    return (
      <div className="bg-light-1">
        <div className="login d-flex justify-content-center">
          <div className="container">
            <div className="row mx-3 my-3 ">
              <div className="col-12 col-md-8 col-lg-6 text-center mx-auto bg-light rounded-bottom shadow-sm">
              <h2 className="typography-title mt-4">
                vCation <i className="material-icons">scatter_plot</i>
                </h2>
                <h1 className="typography-display-1">Login Area</h1>
                {this.props.error ? (
                  <div className="alert alert-dark" role="alert">
                    {this.props.error}
                  </div>
                ) : null}
                <form className="py-5" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="floating-label">
                        <label htmlFor="username">Username </label>
                        <input
                          aria-describedby="usernameHelp"
                          className="form-control"
                          id="username"
                          onChange={this.handleChange}
                          value={this.state.username}
                          placeholder=""
                          type="text"
                          autoComplete="off"
                          required
                        />
                      </div>
                      <span className="input-group-icon" id="usernameHelp">
                        <i className="material-icons">account_circle</i>
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <div className="floating-label">
                        <label htmlFor="password">Password</label>
                        <input
                          aria-describedby="passwordHelp"
                          className="form-control"
                          id="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          placeholder="**********"
                          type="password"
                          required
                        />
                      </div>
                      <span className="input-group-icon" id="passwordHelp">
                        <i className="material-icons">lock</i>
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-secondary">
                    Submit
                  </button>
                </form>
                <Link className="font-weight-bold" to="/register">Don't have an account?</Link>
                <small className="d-block">
                  You can sign up anytime. It's free, and always will be.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.auth.authMessage,
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
