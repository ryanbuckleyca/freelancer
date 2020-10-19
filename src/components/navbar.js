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

    const navUser =
      <ul class="navbar-links" onClick={(e) => e.stopPropagation()}>
        <li class="navbar-item">
          <a onClick={() => toggleModal()} className="navbar-link">Browse Clients</a>
        </li>
        <li class="navbar-item">
          <a onClick={() => toggleModal()} className="navbar-link">Invoices</a>
        </li>
        <li class="navbar-item">
          <Link to="/profile" onClick={() => this.closeMobileNavbar()}>
            <img src={user.picture} className="avatar" alt={user.name} />
          </Link>
        </li>
      </ul>

    const navGuest =
      <ul class="navbar-links" onClick={(e) => e.stopPropagation()}>
        <li class="navbar-item">
          <Link to="/" onClick={() => loginWithRedirect()} className="navbar-link">
            Log In / Register
          </Link>
        </li>
      </ul>

    return (
      <header id="navbar" className={this.state.navClass}>
          <nav class="navbar-container">
            <Link to="/" className="navbar-brand">
              <Logotype height="60" />
            </Link>
            <button type="button" class="navbar-toggle" aria-label={this.state.toggle} onClick={() => this.toggleMenu()}>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="navbar-menu" onClick={() => this.closeMobileNavbar()}>
              { isAuthenticated ? navUser : navGuest }
            </div>
          </nav>
      </header>
    );
  };
};

export default withAuth0(Navbar);
