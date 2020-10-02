import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from './navbar';
import Landing from './landing';
import Profile from './profile';
import Footer from './footer';
import { withAuth0 } from '@auth0/auth0-react';

class App extends Component {
  constructor() {
    super();
    this.state = { auth0: this.props, apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/test")
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res }, ()=>{
        console.log("state set in client/App.callAPI: ", this.state)
      }));
  }

  componentWillMount() {
    this.callAPI();
    console.log('window.location.origin: ', window.location.origin);
  }


  render() {
    console.log('this.props: ', this.props)
    console.log('this.state: ', this.state)
    const { isAuthenticated } = this.props.auth0;
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
          <Footer showTrial={isAuthenticated} />
        </div>
      </div>
    </Router>
    );
  }
}

export default withAuth0(App);
