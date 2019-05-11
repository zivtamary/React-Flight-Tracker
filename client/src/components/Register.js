import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, clearErrors } from "../store/actions/authActions";

class Register extends Component {
  state = {
    name: "",
    lastName: "",
    username: "",
    password: "",
  };

  componentDidUpdate() {
    const { user, isAuthenticated } = this.props.auth
    console.log(user, isAuthenticated)
    if (user && isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    this.props.clearErrors();
    const { user, isAuthenticated } = this.props.auth
    console.log(user, isAuthenticated)
    if (user && isAuthenticated) {
      this.props.history.push('/')
    }
  }


  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props
    const { name, lastName, username, password } = this.state;
    const user = { name, lastName, username, password };

    this.props.register(user,history);

    this.setState({
      name: '',
      lastName: '',
      username: '',
      password: ''
    })
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
                <h1 className="typography-display-1">Registration</h1>
              <small>
              By registering you are agreeing to our{" "}
                <span className="text-secondary font-weight-bold">
                 conditions & terms
                </span>{" "}
              </small>
              {this.props.error ? (
                <div class="alert alert-dark" role="alert">
                {this.props.error}
                </div>
              ) : null}
              <form className="py-5" onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <div class="input-group">
                    <div class="floating-label">
                      <label for="username">First name</label>
                      <input
                        aria-describedby="nameHelp"
                        class="form-control"
                        id="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        placeholder=""
                          type="text"
                          required
                      />
                    </div>
                    <span class="input-group-icon" id="nameHelp">

                    </span>
                  </div>
                </div>

                <div class="form-group">
                  <div class="input-group">
                    <div class="floating-label">
                      <label for="lastName">Last name</label>
                      <input
                        aria-describedby="lastNameHelp"
                        class="form-control"
                        id="lastName"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder=""
                        type="text"
                        required
                      />
                    </div>
                    <span class="input-group-icon" id="lastNameHelp">

                    </span>
                  </div>
                  </div>
                  
                <div class="form-group">
                  <div class="input-group">
                    <div class="floating-label">
                      <label for="username">Username</label>
                      <input
                        aria-describedby="usernameHelp"
                        class="form-control"
                        id="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder=""
                        type="text"
                        required
                      />
                    </div>
                    <span class="input-group-icon" id="usernameHelp">

                    </span>
                  </div>
                  </div>
                  
                <div class="form-group">
                  <div class="input-group">
                    <div class="floating-label">
                      <label for="password">Password</label>
                      <input
                        aria-describedby="passwordHelp"
                        class="form-control"
                        id="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="**********"
                        type="password"
                        required
                      />
                    </div>
                    <span class="input-group-icon" id="passwordHelp">

                    </span>
                  </div>
                </div>

                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </form>
              <Link to="/login">Already have an account?</Link>
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

export default connect(mapStateToProps, { register, clearErrors })(Register);
