import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    // `this.props.auth0` has all the same properties as the `useAuth0` hook
    console.log('profile.js this.props:', this.props)
    const { isAuthenticated, user } = this.props.auth0;
    return (
      isAuthenticated && (
      <div>
        Hello {user.name} ({user.sub})
        <pre>{'{'}
        {
          Object.keys(user).map(key => <div>{key}: {user[key]}</div>)
        }
        {'}'}</pre>
      </div>)
    );
  }
}

export default withAuth0(Profile);
