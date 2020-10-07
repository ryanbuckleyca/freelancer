import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import profile from '../images/profile.svg';
import address from '../images/house.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbUser: {
        name: '',
        email: '',
        number: '',
        street1: '',
        street2: '',
        city: '',
        zip: '',
        country: ''
      }
    };
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

  //TODO: create updateAPI method to DRY-up these calls
  async getUserAddress(user_id) {
      const res = await fetch(`${url}/api/addresses/user/${user_id}`)
      const data = await res.json()
      return data
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
  async updateUser(user) {
    try {
      const res = await fetch(`${url}/api/users/update/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('updateUser error: ', err)
    }
  };

  //TODO: add authentication and validation
  async updateUserAddress(user) {
    try {
      const res = await fetch(`${url}/api/addresses/users/update/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      return data
    } catch(err) {
      console.log('updateUserAddress error: ', err)
    }
  };

  async componentDidMount(props) {
    const authUser = await this.props.auth0.user
    const dbUser = await this.findUser(authUser.sub)
    try {
      const userState = dbUser || await this.createUser({
        auth0_id: authUser.sub,
        name: authUser.name,
        email: authUser.email
      });
      this.setState({dbUser: userState})
    } catch(err) {
      this.setState({dbUser: err})
    }

    if (dbUser) {
      const userAddress = await this.getUserAddress(dbUser.id);
      this.setState({
        dbUser: {...this.state.dbUser, ...userAddress}
      })
    }

  }

  //
  // USER.id and ADDRESS.id are conflicting.
  // user.id is getting overwritten by address.id when updating state
  //

  // Update user profile
  handleUserSubmit = async (e) => {
    e.preventDefault();
    console.log('this.state.dbUser value when handleUserSubmit is called: ', this.state.dbUser);
    const { name, email, number, street1, city, state, zip, country } = this.state.dbUser;
    if (name && email && number && street1 && city && state && zip && country) {
      try {
        await this.updateUser(this.state.dbUser)
        await this.updateUserAddress(this.state.dbUser)
        console.log('user profile updated')
      }
      catch(err) { console.log(err) }
    } else {
      console.log('validation did not pass')
      //TODO: alert user
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      dbUser: {...this.state.dbUser, [name]: value }
    })
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
          <CardForm img={address} button={<button onClick={this.handleUserSubmit} className="btn btn-success d-none d-md-block">Update profile</button>}>
              <fieldset>
                <label className="form-label" htmlFor="name">Full name*</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.dbUser.name || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="email">Email*</label>
                <input className="form-input" type="text" id="email" name="email"
                       value={this.state.dbUser.email || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="number">Phone number*</label>
                <input className="form-input" type="text" id="number" name="number"
                       value={this.state.dbUser.number || ''} onChange={this.changeHandler}  />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street1">Address 1*</label>
                <input className="form-input" type="text" id="street1" name="street1"
                       value={this.state.dbUser.street1 || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street2">Address 2</label>
                <input className="form-input" type="text" id="street2" name="street2"
                       value={this.state.dbUser.street2 || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="city">City*</label>
                <input className="form-input" type="text" id="city" name="city"
                       value={this.state.dbUser.city || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="state">State*</label>
                <input className="form-input" type="text" id="state" name="state"
                       value={this.state.dbUser.state || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="zip">Zip/postal code*</label>
                <input className="form-input" type="text" id="zip" name="zip"
                       value={this.state.dbUser.zip || ''} onChange={this.changeHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="country">Country*</label>
                <input className="form-input" type="text" id="country" name="country"
                       value={this.state.dbUser.country || ''} onChange={this.changeHandler} />
              </fieldset>
            <button onClick={this.handleUserSubmit} className="btn btn-success d-block mt-4 mx-auto d-md-none">Update profile</button>
          </CardForm>
        </form>

      </div>
    );
  }
}

export default withAuth0(Profile);
