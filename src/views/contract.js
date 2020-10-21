import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import CardFormTopSideProfile from '../components/card-form-topside-profile';
import CardFormFieldsPerson from '../components/card-form-fields-contract';
import contracts from '../images/finance_analytics_.svg';
import callAPI from '../scripts/callAPI';

class Contract extends Component {
  state = { auth_id: null }

  usersClients() {
    callAPI(`/api/contracts/user/${this.state.id}`)
    .then(res => this.setState({user_clients: res}))
    .catch(err => console.log("problem finding user's clients: ", err))
  }

  createContract(authUser) {
    callAPI('/api/contracts/', 'POST', {
      client_id: this.state.client,
      user_id: this.state.user,
      due_date: this.state.date,
      paid: this.state.paid
    })
    .then(res => this.setState(res))
    .catch(err => console.log('problem creating user in profile.js: ', err))
  }

  componentDidMount() {
    console.log('component contract did mount with props: ', this.props)
    const authUser = this.props.auth0.user
    this.setState({id: authUser.id})
    console.log('user is: ', authUser)
    const usersClients = this.usersClients()
    console.log('usersClients list is: ', usersClients);
  }

  render() {
    return(
      <div className='profile'>
        <hr className='spacer' />
        <CardTitle
          img={contracts}
          title='Contract time!!'
          thisClass='card-md'
          text='You can upload invoices here to automatically generate new contracts, or manually enter the information below.'
        />
        <hr className='spacer' />
        <CardForm table='users' id={this.state.auth0_id}>
          <CardFormTopSideProfile />
          <CardFormFieldsPerson />
        </CardForm>
        <hr className='spacer' />
      </div>
    );
  }
}

export default withAuth0(Contract);
