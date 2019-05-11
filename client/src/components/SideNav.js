import React from 'react'
import { NavLink, withRouter, Link } from "react-router-dom";
const SideNav = props => {
    return (
        <div aria-hidden="true" className="navdrawer" id="navdrawerDefault" tabIndex="-1">
                    <div className="navdrawer-content">
                      <div className="navdrawer-header">
                        <a className="navbar-brand px-0" href="/">vCation</a>
                      </div>
                      <nav className="navdrawer-nav">
                      <NavLink to="/" className="nav-link">
                Home
              </NavLink>
                      </nav>
                      <div className="navdrawer-divider"></div>
                      <p className="navdrawer-subheader">Menu</p>
                      <ul className="navdrawer-nav">
                        <li className="nav-item">
                        {props.role === 1 ? (
                <Link to="/admin" className="nav-link" >
                  Panel
                </Link>
              ) : null}
                        </li>
                        <li className="nav-item">
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

    )
}

export default withRouter(SideNav)