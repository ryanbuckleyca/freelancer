import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class Client extends Component {

  state = {
    id: '',
    name: '',
    email: '',
    number: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    post_zip: '',
    country: ''
  }

  async componentDidMount() {
    if(this.props.match.params.id) {
      try {
        const client = await callAPI(`/api/clients/${this.props.match.params.id}`)
        this.setState(client)
      } catch(err) {
        this.setState(err)
      }
    } else {
      console.log('create new client record')
    }
  }

  // Update/create client profile
  handleClientSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state value when handleClientSubmit is called: ', this.state);
    try {
      const { name, email, number, street1, city, state, post_zip, country } = this.state;
      if (name && email && number && street1 && city && state && post_zip && country) {
        const saved = await callAPI(
          `/api/clients/${this.props.match.params.id || ''}`,
          this.props.match.params.id ? 'PUT' : 'POST',
          this.state
        )
        if(!this.props.match.params.id) {
          console.log('!this.props.match.params.id: ', this.props.match.params.id)
          (window.location.href = `/clients/${saved.id}`)
        }
        console.log('client saved')
      }
      else {
        console.log('Fields null or undefined')
        // TODO: render form to show errors
      }
    }
    catch(err) { console.log(err) }
  }

  changeClientHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state, [name]: value
    })
  }

  render() {
    if (this.props.match.params.id && !this.state.id)
      return (
        <div className="profile">
          <hr className="spacer" />
          <div style={{textAlign: 'center', height: '50vh', lineHeight: '50vh'}}>
          no user found
          </div>
        </div>
      )

    return(
      <div className="profile">
        <hr className="spacer" />
        <CardTitle
          img={social_media}
          thisClass="card-md"
          title={<span>Stay Informed. <br />Know your clients.</span>}
          text="Check this ongoing list for clients who may be known for late or unpaid invoices."
        />

        <hr className="spacer" />

        <form className="form-wrapper">
          <CardForm button={<button onClick={this.handleClientSubmit} className="btn btn-primary d-none d-md-block">Update profile</button>}>
              <fieldset>
                <label className="form-label" htmlFor="name">Full name*</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.name || ''}
                       onChange={this.changeClientHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="email">Email Address*</label>
                  <input className="form-input" type="text" id="email" name="email"
                         value={this.state.email || ''}
                         onChange={this.changeClientHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="number">Phone*</label>
                  <input className="form-input" type="text" id="number" name="number"
                         value={this.state.number || ''}
                         onChange={this.changeClientHandler}  />
                </fieldset>
              </span>
              <fieldset>
                <label className="form-label" htmlFor="street1">Address 1*</label>
                <input className="form-input" type="text" id="street1" name="street1"
                       value={this.state.street1 || ''}
                       onChange={this.changeClientHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street2">Address 2</label>
                <input className="form-input" type="text" id="street2" name="street2"
                       value={this.state.street2 || ''}
                       onChange={this.changeClientHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="city">City/Town*</label>
                  <input className="form-input" type="text" id="city" name="city"
                         value={this.state.city || ''}
                         onChange={this.changeClientHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="state">State/Province*</label>
                  <input className="form-input" type="text" id="state" name="state"
                         value={this.state.state || ''}
                         onChange={this.changeClientHandler} />
                </fieldset>
              </span>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="post_zip">Zip/Postal code*</label>
                  <input className="form-input" type="text" id="post_zip" name="post_zip"
                         value={this.state.post_zip || ''}
                         onChange={this.changeClientHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="country">Country*</label>
                  <input className="form-input" type="text" id="country" name="country"
                         value={this.state.country || ''}
                         onChange={this.changeClientHandler} />
                </fieldset>
              </span>
            <button onClick={this.handleClientSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Update profile</button>
          </CardForm>
        </form>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(Client);
