import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from './app';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import './index.scss';

require('dotenv').config()

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      audience={process.env.REACT_APP_AUDIENCE}
      redirectUri={process.env.REACT_APP_REDIRECT_URI}>
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
