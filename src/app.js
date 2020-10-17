import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './components/private-route';
import Modal from './components/modal';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './views/landing';
import Profile from './views/profile';
import Contract from './views/contract';
import Client from './views/client';
import Person from './views/person';
import ClientsAll from './views/clients-all';
import PrivacyPolicy from './views/privacy-policy';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  render() {
    return (
    <Router>
      <Modal />
      <div className='wrapper'>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/policy" component={PrivacyPolicy} />
          <PrivateRoute path="/invoices" component={Contract} />
          <PrivateRoute path="/clients/new" component={Person} />
          <PrivateRoute path="/clients/:id" component={Person} />
          <PrivateRoute path="/clients/" component={ClientsAll} />
        </Switch>
        <Footer showTrial={this.props.auth0.isAuthenticated} />
      </div>
    </Router>
    );
  }
}

export default withAuth0(App);
