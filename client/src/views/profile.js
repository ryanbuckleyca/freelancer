import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import profile from '../images/profile.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Profile extends Component {

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
      zip: '',
      country: ''
    },
    {'secondAddress': null},
    {'third': null},
    {'fourth': null},
    ]
  }

  //TODO: create updateAPI method to DRY-up these calls
  async findUser(auth0_id) {
    try {
      const res = await fetch(`${url}/api/users/${auth0_id}`)
      const data = await res.json()
      return data
    } catch(err) {
      console.log('findUser error: ', err)
    }
  };

  //TODO: add authentication and validation
  async createUser(user) {
    try {
      const res = await fetch(`${url}/api/users/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('createUser error: ', err)
    }
  };

  //TODO: add authentication and validation
  async updateUser(dbUser) {
    try {
      const res = await fetch(`${url}/api/users/update/${dbUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbUser)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('updateUser error: ', err)
    }
  };

  async componentDidMount(props) {
    const authUser = await this.props.auth0.user
    const dbUser = await this.findUser(authUser.sub)
    console.log('found user: ', dbUser)
    try {
      const userState = dbUser || await this.createUser({
        auth0_id: authUser.sub,
        name: authUser.name,
        email: authUser.email
      });
      this.setState(userState)
    } catch(err) {
      this.setState(err)
    }
  }

  //
  // USER.id and ADDRESS.id are conflicting.
  // user.id is getting overwritten by address.id when updating state
  //

  // Update user profile
  handleUserSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state value when handleUserSubmit is called: ', this.state);
    const { name, email, number } = this.state;
    // TODO: loop through when there are mutliple addresses
    const { street1, city, state, zip, country } = this.state.Addresses[0];
    if (name && email && number && street1 && city && state && zip && country) {
      try {
        await this.updateUser(this.state)
        console.log('user profile updated')
      }
      catch(err) { console.log(err) }
    } else {
      console.log('validation did not pass')
      //TODO: alert user
    }
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
        <div className="container">
        <CardTitle
          img={profile}
          title={<span>Hello there!</span>}
          text="In order for us to reach out on your behalf, we need to know how to reach you, and how to forward your most up to date information to your clients."
        />
        </div>

        <div className="text-center my-5">
          <h2>Your Profile</h2>
          <span className="my-5">Tell us a bit about yourself.</span>
        </div>

        <form className="form-wrapper">
          <CardForm button={<button onClick={this.handleUserSubmit} className="btn btn-success d-none d-md-block">Update profile</button>}>
              <fieldset>
                <label className="form-label" htmlFor="name">Full name*</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.name || ''} onChange={this.changeUserHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="email">Email*</label>
                  <input className="form-input" type="text" id="email" name="email"
                         value={this.state.email || ''} onChange={this.changeUserHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="number">Phone number*</label>
                  <input className="form-input" type="text" id="number" name="number"
                         value={this.state.number || ''} onChange={this.changeUserHandler}  />
                </fieldset>
              </span>
              <fieldset>
                <label className="form-label" htmlFor="street1">Address 1*</label>
                <input className="form-input" type="text" id="street1" name="0.street1"
                       value={this.state.Addresses[0].street1 || ''} onChange={this.changeAddressHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street2">Address 2</label>
                <input className="form-input" type="text" id="street2" name="0.street2"
                       value={this.state.Addresses[0].street2 || ''} onChange={this.changeAddressHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="city">City/Town*</label>
                  <input className="form-input" type="text" id="city" name="0.city"
                         value={this.state.Addresses[0].city || ''} onChange={this.changeAddressHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="state">State/Province*</label>
                  <input className="form-input" type="text" id="state" name="0.state"
                         value={this.state.Addresses[0].state || ''} onChange={this.changeAddressHandler} />
                </fieldset>
              </span>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="zip">Zip/Postal code*</label>
                  <input className="form-input" type="text" id="zip" name="0.zip"
                         value={this.state.Addresses[0].zip || ''} onChange={this.changeAddressHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="country">Country*</label>
                  <input className="form-input" type="text" id="country" name="0.country"
                         value={this.state.Addresses[0].country || ''} onChange={this.changeAddressHandler} />
                </fieldset>
              </span>
            <button onClick={this.handleUserSubmit} className="btn btn-success d-block mt-4 mx-auto d-md-none">Update profile</button>
          </CardForm>
        </form>

      </div>
    );
  }
}

export default withAuth0(Profile);
