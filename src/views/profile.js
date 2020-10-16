import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import profile from '../images/profile_header.svg';
import callAPI from '../scripts/callAPI';

class Profile extends Component {

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
    country: '',
    picture: ''
  }

  widget = window.cloudinary.createUploadWidget({
     cloudName: 'ryanbuckleyca',
     cropping: true,
     showSkipCropButton: false,
     croppingAspectRatio: 1,
     uploadPreset: 'cheque-mate'
   }, (error, result) => {
     if (!error && result && result.event === "success") {
       console.log('will update state with: ', {picture: result.info.url})
       this.setState({picture: result.info.url});
       console.log('state is now: ', this.state)
     }
  })

  showWidget = (e) => {
    e.preventDefault();
    this.widget.open();
  }

  async componentDidMount(props) {
    const authUser = await this.props.auth0.user
    const dbUser = await callAPI(`/api/users/${authUser.sub}`)
    console.log('found user: ', dbUser)
    try {
      const userState = dbUser || await callAPI(
        `/api/users/`,
        'POST', {
        auth0_id: authUser.sub,
        name: authUser.name,
        email: authUser.email
      });
      this.setState(userState)
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
      const { name, email, number, street1, city, state, post_zip, country } = this.state;
      if (name && email && number && street1 && city && state && post_zip && country) {
        await callAPI(
          `/api/users/${this.state.id}`,
          'PUT',
          this.state
        )
        console.log('user profile updated')
      }
      else {
        console.log('Fields null or undefined')
        // TODO: render form to show errors
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

  render() {
    console.log('this.props.auth0: ', this.props.auth0)
    return(
      <div className="profile">
        <hr className="spacer" />
        <CardTitle
          img={profile}
          title="Hey there!"
          thisClass="card-md"
          text="In order for us to reach out on your behalf, we need to know how to reach you, and how to forward your most up to date information to your clients."
        />

        <hr className="spacer" />
        <form className="form-wrapper">
          <CardForm picture={this.state.picture} cloudinary={this.showWidget} button={
            <button onClick={this.handleUserSubmit} className="btn btn-primary d-none d-md-block">
              Update profile
            </button>
          }>
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
                <input className="form-input" type="text" id="street1" name="street1"
                       value={this.state.street1 || ''}
                       onChange={this.changeUserHandler} />
              </fieldset>
              <fieldset>
                <label className="form-label" htmlFor="street2">Address 2</label>
                <input className="form-input" type="text" id="street2" name="street2"
                       value={this.state.street2 || ''}
                       onChange={this.changeUserHandler} />
              </fieldset>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="city">City/Town*</label>
                  <input className="form-input" type="text" id="city" name="city"
                         value={this.state.city || ''}
                         onChange={this.changeUserHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="state">State/Province*</label>
                  <input className="form-input" type="text" id="state" name="state"
                         value={this.state.state || ''}
                         onChange={this.changeUserHandler} />
                </fieldset>
              </span>
              <span className="d-sm-flex">
                <fieldset className="mr-sm-3">
                  <label className="form-label" htmlFor="post_zip">Zip/Postal code*</label>
                  <input className="form-input" type="text" id="post_zip" name="post_zip"
                         value={this.state.post_zip || ''}
                         onChange={this.changeUserHandler} />
                </fieldset>
                <fieldset>
                  <label className="form-label" htmlFor="country">Country*</label>
                  <input className="form-input" type="text" id="country" name="country"
                         value={this.state.country || ''}
                         onChange={this.changeUserHandler} />
                </fieldset>
              </span>
            <button onClick={this.handleUserSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Update profile</button>
          </CardForm>
        </form>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(Profile);
