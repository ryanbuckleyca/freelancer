import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/js/src/index';
import './navbar.scss';
import Logotype from './logotype';

class Navbar extends Component {
  render() {
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = this.props.auth0;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    const navUser = isAuthenticated && (
      <ul className="navbar-nav mr-auto align-items-center">
        <li className="nav-item active">
          <Link to='/' className="nav-link">Browse Clients</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">Add Invoice</Link>
        </li>
        <li className="nav-item dropdown">
          <img
          src={user.picture}
          className="avatar dropdown-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          alt={user.name}
          aria-haspopup="true"
          aria-expanded="false" />
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <Link to="/profile" className="dropdown-item">My Profile</Link>
            <Link to="/" className="dropdown-item">My Invoices</Link>
            <Link to="/" className="dropdown-item"
               onClick={() => logout({returnTo: window.location.origin })}>
              Logout
            </Link>
          </div>
        </li>
      </ul>);
    const navVisitor =
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" onClick={() => loginWithRedirect()}>Log In / Register</Link>
        </li>
      </ul>;

    return (
      <div className={`navbar navbar-expand-sm navbar-light navbar-chequemate${ ' '+(this.props.bg || '')}`}>
        <Link to="/" className="navbar-brand">
          <Logotype height="60" />
        </Link>

        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.props.auth0.isAuthenticated ? navUser : navVisitor}
        </div>
      </div>
    );
  };
};

export default withAuth0(Navbar);
