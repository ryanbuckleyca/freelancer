import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../scripts/callAPI';
import requiredFieldsValid from '../scripts/requiredFieldsValid';
import './cards.scss';

class CardForm extends Component {

  setFormDataState(props) {
    callAPI(`/api/${props.table}/${props.id}`)
      .then(result => this.setState(result))
  }

  getTokenAndUpdateUser(user) {
    var options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: `{"client_id": "${process.env.REACT_APP_AUTH0_MGMT_API_CLIENT_ID}", "client_secret": "${process.env.REACT_APP_AUTH0_MGMT_API_SECRET}", "audience": "${process.env.REACT_APP_AUTH0_MGMT_API_AUDIENCE}", "grant_type": "client_credentials"}`
    };
    fetch('https://chequemate.us.auth0.com/oauth/token', options)
    .then(res => res.json())
    .then(data => {
      const token = data.access_token
      this.updateUserInAuth0(user, token)
    })
  }
  updateUserInAuth0(user, token) {
    var options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
        'cache-control': 'no-cache'
      },
      body: { "name": user.name, "picture": user.picture }
    };
    fetch(`https://chequemate.us.auth0.com/api/v2/users/${user.auth0_id}`, options)
    .then(res => {
      return res
    })
  }


  async saveFormToDB() {
    try {
      const res = await callAPI(
        `/api/${this.props.table}/${this.props.id || ''}`,
        this.props.id ? 'PUT' : 'POST',
        this.state
      )
      if(this.props.table === 'users') {
        this.getTokenAndUpdateUser(this.state);
      }
      console.log(`${this.props.table} saved`)
      return res
    }
    catch(err) { console.log('card-form saveFormToDB err: ', err) }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFieldsValid()) {
      console.log('all fields valud')
      const saved = this.saveFormToDB();
      // redirect to new record if not updating
      !this.state.id && (window.location.href = `/${this.props.table}/${saved.id}`)
    }
    else {
      // TODO: render form to show errors
      console.log('Fields null or undefined')
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  render() {
    console.log('card-form rendered with props: ', this.props)
    !this.state && this.props.id && this.setFormDataState(this.props);

    if (this.props.table && !this.props.id)
      return (
        <div className="profile">
          <hr className="spacer" />
          <div style={{textAlign: 'center', height: '50vh', lineHeight: '50vh'}}>
          no user found
          </div>
        </div>
      )

    return(
      <form className="form-wrapper">
        <div className='card-slider'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            ...this.state
          })}

          {/* CardFormFields */}
          {React.cloneElement(this.props.children[1], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            ...this.state
          })}
        </div>
      </form>
    );
  }
}

export default withAuth0(CardForm);
