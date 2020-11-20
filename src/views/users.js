import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import NotFound from '../components/not-found';


class Client extends Component {
  render() {
    return <NotFound type="clients" />
  }
}

export default withAuth0(Client);
