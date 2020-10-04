import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './navbar';
import Landing from './landing';
import Profile from './profile';
import PrivacyPolicy from './privacy-policy';
import PrivateRoute from './private-route';
import Footer from './footer';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  render() {
    return (
    <Router>
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
