import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './navbar';
import Landing from './landing';
import Profile from './profile';
import Footer from './footer';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  callAPI() {
    fetch("http://localhost:9000/test")
      .then(res => res.json())
      .then(res => console.log('callAPI res: ', res));
  }

  async callSecureAPI() {
    try {
      const token = await this.props.auth0.getAccessTokenSilently();
      const response = await fetch("http://localhost:9000/db", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    console.log('window.location.origin: ', window.location.origin);
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  }


  render() {
    this.callAPI();
    this.callSecureAPI();

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
          <Route path="/profile">
            <Profile />
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
