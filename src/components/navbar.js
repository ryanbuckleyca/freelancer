import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import './navbar.scss';
import Logotype from './logotype';
import toggleModal from '../scripts/toggleModal'

class Navbar extends Component {

  state = {
    navClass: '',
    toggle: "Open navigation menu"
  }

  openMobileNavbar() {
    this.setState({navClass: 'opened'})
    this.setState({toggle: 'Close navigation menu.'})
  }

  closeMobileNavbar() {
    this.setState({navClass: ''})
    this.setState({toggle: 'Open navigation menu.'})
  }

  toggleMenu() {
    if (this.state.navClass === 'opened')
      this.closeMobileNavbar();
    else
      this.openMobileNavbar();
  }

  render() {
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = this.props.auth0;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    let navBar =
      <ul className="navbar-links" onClick={(e) => e.stopPropagation()}>
        <li className="navbar-item">
          <Link to="/" onClick={() => loginWithRedirect()} className="navbar-link">
            Log In / Register
          </Link>
        </li>
      </ul>

    if(user && isAuthenticated) {
    navBar =
      <ul className="navbar-links" onClick={(e) => e.stopPropagation()}>
        <li className="navbar-item">
          <a onClick={() => toggleModal()} className="navbar-link">Browse Clients</a>
        </li>
        <li className="navbar-item">
          <a onClick={() => toggleModal()} className="navbar-link">Invoices</a>
        </li>
        <li className="navbar-item">
          <Link to="/profile" onClick={() => this.closeMobileNavbar()}>
            <img src={user.picture} className="avatar" alt={user.name} />
          </Link>
        </li>
      </ul>
    }

    return (
      <header id="navbar" className={this.state.navClass}>
          <nav className="navbar-container">
            <Link to="/" className="navbar-brand">
              <Logotype height="60" />
            </Link>
            <button type="button" className="navbar-toggle" aria-label={this.state.toggle} onClick={() => this.toggleMenu()}>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <div className="navbar-menu" onClick={() => this.closeMobileNavbar()}>
              { navBar }
            </div>
          </nav>
      </header>
    );
  };
};

export default withAuth0(Navbar);
