import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/js/src/index';
import './index.scss';
import './components/_custom-variables.scss';
import Landing from './components/landing';
import * as serviceWorker from './serviceWorker';
import swapWords from './components/swapwords'

require('dotenv').config()

ReactDOM.render(
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}>
    <React.StrictMode>
      <Landing />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

swapWords();

