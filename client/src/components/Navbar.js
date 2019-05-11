import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
      <div className="container">
        <a className="navbar-brand" href="/">
          <span className="font-weight-bold mx-2">vCation</span>
          <i className="material-icons mx-2">scatter_plot</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="navdrawer"
          data-target="#navdrawerDefault"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse flex-row-reverse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              {props.role === 1 ? (
                <Link to="/admin" className="nav-link" >
                  Panel
                </Link>
              ) : null}
            </li>
            <li>
              {props.isAuthenticated ? (
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => {
                    props.logout();
                  }}
                >
                  Logout
                </Link>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
