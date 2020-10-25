import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import CardFormTopSideProfile from '../components/card-form-topside-profile';
import CardFormFieldsPerson from '../components/card-form-fields-person';
import profile from '../images/profile_header.svg';
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
    .then(res => console.log('new user created: ', res))
    .catch(err => console.log('problem creating user in profile.js: ', err))
  }

  componentDidMount() {
    this.props.auth0 && callAPI(`/api/users/${this.props.auth0.user.sub}`)
      .then(res => res && this.createUser(this.props.auth0.user))
  }

  render() {
    return(
      <div className='profile'>
        <hr className='spacer' />
        <CardTitle
          img={profile}
          title='Hey there!'
          thisClass='card-md'
          text='In order for us to reach out on your behalf, we need to know how to reach you, and how to forward your most up to date information to your clients.'
        />
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
