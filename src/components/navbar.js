import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import './navbar.scss';
import Logotype from './logotype';
import toggleModal from '../scripts/toggleModal'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navClass: '',
      toggle: "Open navigation menu",
      profileClass: '',
      profileToggle: "Open navigation menu"
    }
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this)
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

  openProfileMenu() {
    this.setState({profileClass: 'opened'})
    this.setState({profileToggle: 'Close profile menu.'})
  }

  closeProfileMenu() {
    this.setState({profileClass: ''})
    this.setState({profileToggle: 'Open profile menu.'})
  }

  toggleProfileMenu() {
    if (this.state.profileClass === 'opened')
      this.closeProfileMenu();
    else
      this.openProfileMenu();
  }

  handleClick = (e) => {
    const profileMenu = document.querySelector('.profileMenu');
    if (!profileMenu.contains(e.target)) {
      this.closeProfileMenu()
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick)
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick)
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
            <Link to="/profile" onClick={() => this.toggleProfileMenu()}>
              <img src={this.props.auth0.user.picture} className="avatar" alt={user.name} />
            </Link>
            <div className={'profileMenu ' + this.state.profileClass} aria-label={this.state.profileToggle}>
              <a href="#" onClick={() => toggleModal()} className="dropdown-item">My Invoices</a>
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <a href="#" onClick={() => logout({returnTo: window.location.origin })}>LOGOUT</a>
            </div>
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
