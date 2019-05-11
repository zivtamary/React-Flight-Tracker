import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Vacations from "./Vacations";
import Admin from "./Admin";

class Home extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    if (!this.props.auth.user.id && !this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.setState({
      user,
    });
  }

  logout = () => {
    if (this.props.auth.user) this.props.logout(this.props.history);
    else this.props.history.push("/login");
  };

  render() {
    if (this.props.history.location.pathname === "/") {
      return (
        <div className="bg-light-1">
          <Navbar
            role={this.props.auth.user.role}
            isAuthenticated={this.props.auth.isAuthenticated}
            logout={this.logout}
          />
          <SideNav role={this.props.auth.user.role}
            isAuthenticated={this.props.auth.isAuthenticated}
            logout={this.logout}/>
          <div className="login d-flex justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 mx-auto text-center my-5">
                  {this.state.user ? (
                    <div className="alert alert-dark mb-5" role="alert">
                      Welcome back, {this.state.user.name}
                    </div>
                  ) : null}

                  <Vacations user={this.props.auth.user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.history.location.pathname === "/admin") {
      return (
        <div className="bg-light-1">
          <Navbar
            role={this.props.auth.user.role}
            isAuthenticated={this.props.auth.isAuthenticated}
            logout={this.logout}
          />
          <SideNav role={this.props.auth.user.role}
            isAuthenticated={this.props.auth.isAuthenticated}
            logout={this.logout} />
          <div className="login d-flex justify-content-center">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 mx-auto text-center my-5">
                  {this.state.user ? (
                    <div className="alert alert-dark mb-5" role="alert">
                     <h1>Admin Panel ({this.state.user.name})</h1>
                    </div>
                  ) : null}
                </div>

                    <Admin />


              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout }
)(Home);
