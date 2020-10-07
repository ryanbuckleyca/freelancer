import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './components/private-route';
import Modal from './components/modal';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './views/landing';
import Profile from './views/profile';
import PrivacyPolicy from './views/privacy-policy';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  render() {
    return (
    <Router>
      <Modal />
      <div className='container'>
        <div className='container my-3'>
          <Navbar />
        </div>
        <br />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/invoices">
            "coming soon"
          </Route>
          <Route path="/clients">
            "coming soon"
          </Route>
        </Switch>
        <br />
        <hr />
        <div className='container my-5'>
          <Footer showTrial={this.props.auth0.isAuthenticated} />
        </div>
      </div>
    </Router>
    );
  }
}

export default withAuth0(App);
