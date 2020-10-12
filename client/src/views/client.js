import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import SectionHeader from '../components/section-header';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import client from '../images/social_media.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Client extends Component {

  state = {
    id: '',
    name: '',
    email: '',
    number: '',
    Addresses: [{
      id: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }]
  }

  //TODO: create updateAPI method to DRY-up these calls
  async findClient(id) {
    try {
      const res = await fetch(`${url}/api/clients/${id}`)
      const data = await res.json()
      return data
    } catch(err) {
      console.log('findClient error: ', err)
    }
  };

  //TODO: add authentication and validation
  async createClient(client) {
    try {
      const res = await fetch(`${url}/api/clients/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('createClient error: ', err)
    }
  };

  //TODO: add authentication and validation
  async updateClient(client) {
    console.log('updateClient called')
    try {
      const res = await fetch(`${url}/api/users/update/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('updateClient error: ', err)
    }
  };

  async componentDidMount() {
    const client_id = this.props.match.params.id
    const client = await this.findClient(client_id)
    console.log('found client: ', client)
    try {
      this.setState(client)
      console.log('compondedDidMount state: ', this.state)
    } catch(err) {
      this.setState(err)
    }
  }

  // Update user profile
  handleUserSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state value when handleUserSubmit is called: ', this.state);
    try {
      // TODO: loop through when there are mutliple addresses
        const { name, email, number } = this.state;
        const { street1, city, state, zip, country } = this.state.Addresses[0];

      if (name && email && number && street1 && city && state && zip && country) {
        await this.updateUser(this.state)
        console.log('client profile updated')
      }
      else {
        console.log('Addresses null or undefined')
      }
    }
    catch(err) { console.log(err) }
  }

  changeUserHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state, [name]: value
    })
  }
  changeAddressHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const i = parseInt(name.split('.')[0]);
    const key = name.split('.')[1]

    const updatedAddress = {...this.state.Addresses[i], [key]:value}
    const updatedArray = [...this.state.Addresses][i] = updatedAddress
    this.setState({...this.state, Addresses: [updatedArray]});
  }

  render() {
    return(
      <div className="profile">
        <hr className="spacer" />
        <CardTitle
          img={client}
          title="Who dat?"
          thisClass="card-md"
          text="We'll need to know who your clients are so we can reach out to them. Please provide all of the contact information requested."
        />

        <hr className="spacer" />
        <SectionHeader
          title="Your Client"
          text="Tell us a bit about them:"
        />

        <hr className="spacer" />
        <form className="form-wrapper">
          <CardForm button={<button onClick={this.handleUserSubmit} className="btn btn-primary d-none d-md-block">Submit client</button>}>
              <fieldset>
                <label className="form-label" htmlFor="name">Full name*</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.name || ''}
                       onChange={this.changeUserHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="email">Email Address*</label>
                  <input className="form-input" type="text" id="email" name="email"
                         value={this.state.email || ''}
                         onChange={this.changeUserHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="number">Phone*</label>
                  <input className="form-input" type="text" id="number" name="number"
                         value={this.state.number || ''}
                         onChange={this.changeUserHandler}  />
                </fieldset>
              </span>
              <fieldset>
                <label className="form-label" htmlFor="street1">Address 1*</label>
                <input className="form-input" type="text" id="street1" name="0.street1"
                       value={this.state.Addresses[0].street1 || ''}
                       onChange={this.changeAddressHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street2">Address 2</label>
                <input className="form-input" type="text" id="street2" name="0.street2"
                       value={this.state.Addresses[0].street2 || ''}
                       onChange={this.changeAddressHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="city">City/Town*</label>
                  <input className="form-input" type="text" id="city" name="0.city"
                         value={this.state.Addresses[0].city || ''}
                         onChange={this.changeAddressHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="state">State/Province*</label>
                  <input className="form-input" type="text" id="state" name="0.state"
                         value={this.state.Addresses[0].state || ''}
                         onChange={this.changeAddressHandler} />
                </fieldset>
              </span>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="zip">Zip/Postal code*</label>
                  <input className="form-input" type="text" id="zip" name="0.zip"
                         value={this.state.Addresses[0].zip || ''}
                         onChange={this.changeAddressHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="country">Country*</label>
                  <input className="form-input" type="text" id="country" name="0.country"
                         value={this.state.Addresses[0].country || ''}
                         onChange={this.changeAddressHandler} />
                </fieldset>
              </span>
            <button onClick={this.handleUserSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Submit client</button>
          </CardForm>
        </form>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(Client);
