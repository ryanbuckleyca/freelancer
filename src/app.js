import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from './components/private-route';
import Modal from './components/modal';
import Alerts from './components/alerts';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './views/landing';
import Profile from './views/profile';
import Contract from './views/contract';
import ContractsAll from './views/contracts-all';
import Client from './views/client';
import ClientsAll from './views/clients-all';
import PrivacyPolicy from './views/privacy-policy';
import Users from './views/users';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Alerts />
        <Modal />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/policy" component={PrivacyPolicy} />
          <PrivateRoute path="/contracts/new" component={Contract} />
          <PrivateRoute path="/contracts/:id" component={Contract} />
          <PrivateRoute path="/contracts" component={ContractsAll} />
          <PrivateRoute path="/clients/new" component={Client} />
          <PrivateRoute path="/clients/mine" component={ClientsAll} />
          <PrivateRoute path="/clients/:id" component={Client} />
          <PrivateRoute path="/clients" component={ClientsAll} />
          <Route path="/users" component={Users} />
        </Switch>
        <Footer showTrial={this.props.auth0.isAuthenticated} />
      </div>
    );
  }
}

export default withAuth0(App);
