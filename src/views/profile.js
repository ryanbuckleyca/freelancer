import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardForm from '../components/forms';
import CardFormTopSideProfile from '../components/forms/profile-topside';
import CardFormFieldsPerson from '../components/forms/person-main';
import callAPI from '../scripts/callAPI';

class Profile extends Component {

  createUser(authUser) {
    console.log('creating new user account from auth0')
    callAPI('/api/users/', 'POST', {
      auth0_id: authUser.sub,
      name: authUser.name,
      email: authUser.email,
      picture: authUser.picture
    })
    .then(res => console.log('result of create new user: ', res))
    .catch(err => console.log('problem creating user in profile.js: ', err))
  }

  async componentDidMount() {
    // Does user exist? If not, create
    const {user, getAccessTokenSilently} = this.props.auth0
    this.props.auth0 && callAPI(`/api/users/${user.sub}`)
      .then(res => !res && this.createUser(user))

    // TODO: incorporate secureAPI test into other api calls
    // TODO: figure out how to generate token from inside of callAPI
    const token = await getAccessTokenSilently()
    const tokenHeader = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    callAPI('/api/secure', 'GET', null, tokenHeader)
      .then(res => res)
      .then(data => console.log('auth path res is: ', data))
  }

  render() {
    return(
      <div className='profile'>
        <hr className='spacer' />
        <CardForm table='users' id={this.props.auth0.user.sub}>
          <CardFormTopSideProfile />
          <CardFormFieldsPerson />
        </CardForm>
        <hr className='spacer' />
      </div>
    );
  }
}

export default withAuth0(Profile);
