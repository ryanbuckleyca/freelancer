import React, {Component} from 'react';
import Logotype from './logotype';
import './navbar.scss';

class Navbar extends Component {
  navUser =
    <ul className="navbar-nav mr-auto align-items-center">
      <li className="nav-item active">
        <a href="/" className="nav-link">Browse Clients</a>
      </li>
      <li className="nav-item">
        <a href="/" className="nav-link">Add Invoice</a>
      </li>
      <li className="nav-item dropdown">
        <img
        src="https://kitt.lewagon.com/placeholder/users/ryanbuckleyca"
        className="avatar dropdown-toggle"
        id="navbarDropdown"
        data="dropdown"
        alt="user avatar"
        aria-haspopup="true"
        aria-expanded="false" />
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a href="/" className="dropdown-item">Action</a>
          <a href="/" className="dropdown-item">Another Action</a>
          <a href="/" className="dropdown-item">Logout</a>
        </div>
      </li>
    </ul>;
  navVisitor =
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a href="/login" className="nav-link">Login</a>
      </li>
    </ul>;

  // for now props is passed explicity in landing
  navContent = (props) => props.userIsLoggedIn ? this.navUser : this.navVisitor;

  render(props) {
    return (
      <div className={`navbar navbar-expand-sm navbar-light navbar-chequemate${ ' '+(this.props.bg || '')}`}>
        <a href="/" className="navbar-brand">
          <Logotype height="60" />
        </a>

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
            {this.navContent(this.props)}
        </div>
      </div>
    );
  };
};

export default Navbar;
