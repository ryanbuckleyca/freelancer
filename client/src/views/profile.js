import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardSlider from '../components/card-slider';
import profile from '../images/profile.svg';
import address from '../images/house.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbUser: { name: '', email: '', number: '' },
      dbAddress: { address1: '', address2: '', city: '', zip: '', country: '' },
      scrollCarousel: 0
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
  }

  // Update user profile
  handleUserSubmit = async () => {
    const { name, email, number } = this.state.dbUser;
    if (name && email && number) {
      try { await this.updateUser(this.state.dbUser) }
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

        <CardSlider img={address}>
          <form className="form-wrapper" onSubmit={this.handleUserSubmit}>
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
              <label for="form-address1">Address 1*</label>
              <input className="form-input" type="text" id="form-address1"
                     placeholder="Street address" />
            </fieldset>
            <fieldset>
              <label for="form-address2">Address 2</label>
              <input className="form-input" type="text" id="form-address2"
                     placeholder="Unit/apartment number" />
            </fieldset>
            <fieldset>
              <label for="form-city">City*</label>
              <input className="form-input" type="text" id="form-city"
                     placeholder="City" />
            </fieldset>
            <fieldset>
              <label for="form-zip">Zip/postal code*</label>
              <input className="form-input" type="text" id="form-zip"
                     placeholder="Zip/postal code" />
            </fieldset>
            <fieldset>
              <label for="form-country">Country*</label>
              <input className="form-input" type="text" id="form-country"
                     placeholder="Country" />
            </fieldset>
          <button onClick={this.handleUserSubmit} className="btn btn-success d-block mt-4 mx-auto d-md-none">Update profile</button>
          </form>
        </CardSlider>

      </div>
    );
  }
}

export default withAuth0(Profile);
