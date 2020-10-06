// TODO: finish implementing Framer Motion
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { motion } from "framer-motion"
import CardTitle from '../components/card-title';
import CardSlider from '../components/card-slider';
import profile from '../images/profile.svg';
import email from '../images/sending_emails.svg';

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbUser: { name: '', email: '', number: '' },
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
    const move = () => {
      // get all child divs in carousel
      // when clicking next:
      //    scroll to width of clicked div
      //    toggle inactive of clicked div
      //    toggle inactive of FOLLOWING div
      // when clicking prev:
      //    scroll to -width of clicked div
      //    toggle inactive of clicked div
      //    toggle inactive of PREVIOUS div
      const elmnt = document.querySelectorAll(".card-carousel")[0];
      console.log('elmnt.firstChild.offsetWidth:', elmnt.firstChild.offsetWidth);
      const scrollBy = elmnt.firstChild.offsetWidth;
      // console.log(elmnt.scroll(scrollBy, 0));
      this.setState({scrollCarousel: scrollBy})
    }

    return(
      <style>
      .card-carousel {
          margin: 0;
          // below is determined by px of bootstrap width
          padding-left: calc((100vw - 1140px) / 2) !important;
          display: flex;
          overflow: scroll;
        }
        .inactive {
          opacity: 0.4;
        }
        .card-slider:last-child {
          padding-right: calc((100vw - 1140px) / 2) !important;
        }
        .card-slider {
          display: flex;
          min-width: 75%;
          margin-right: 3em;
          flex-direction: row-reverse;
          align-items: center;
          justify-items: flex-end;
          background-image: url('../images/card-bg-lg.svg');
          background-position: left;
          background-repeat: no-repeat;
          background-size: 85% 100%;
          -moz-background-size: 85% 100%;
          -webkit-background-size: 85% 100%;
          @media screen and (max-width: 767px) {
            flex-direction: column;
            background-image: url('../images/card-bg2.svg');
            background-position: bottom;
            background-repeat: no-repeat;
            background-size: 100% 85%;
            -moz-background-size: 100% 85%;
            -webkit-background-size: 100% 85%;
          }
          .card-slider-form {
            flex-grow: 1;
            padding: 3em;
            width: 100%;
            @media screen and (max-width: 767px) {
              padding: 1em 4em 4em;
            }
          }
          .card-slider-img {
            width: 40%;
            display: flex;
            flex-grow: 0;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            margin: 0;
            img {
              width: 100%;
            }
            @media screen and (max-width: 767px) {
              img {
                width: 100%;
              }
            }
          }
          label {
            padding-bottom: 0;
            margin-bottom: 0;
            @media screen and (max-width: 767px) {
              display: block;
            }
          }
          input {
            width: 100%;
          }
          fieldset {
            margin-bottom: 1em;
          }
        }
        </style>
      <div className="profile">
        <div className="container">
        <CardTitle
          img={profile}
          title={<span>Who are you?<br className="d-block d-sm-none d-lg-block" />What's your info?</span>}
          text="In order for us to reach out on your behalf, we need to know how to reach you, and how to forward your most up to date information to your clients."
        />
        </div>

        <div className="container text-center my-5">
          <h2>Your Profile</h2>
          <span className="my-5"><button onClick={move}>Click here to move to the next frame:</button></span>
        </div>

        <motion.div
          initial={{x: 0}}
          animate={{x: -this.state.scrollCarousel}}
          transition={{ duration: 0.5 }}
          className="card-carousel"
        >
          <CardSlider img={email}>
            <form className="form-wrapper" onSubmit={this.handleUserSubmit}>
              <fieldset>
                <label className="form-label" htmlFor="name">Enter name:</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.dbUser.name || ''} onChange={this.changeHandler} />
              </fieldset>

              <fieldset>
                <label className="form-label" htmlFor="email">Enter email:</label>
                <input className="form-input" type="text" id="email" name="email"
                       value={this.state.dbUser.email || ''} onChange={this.changeHandler} />
              </fieldset>

              <fieldset>
                <label className="form-label" htmlFor="number">Enter number:</label>
                <input className="form-input" type="text" id="number" name="number"
                       value={this.state.dbUser.number || ''} onChange={this.changeHandler}  />
              </fieldset>
            </form>

            <button onClick={this.handleUserSubmit} className="btn btn-success">Update profile</button>
          </CardSlider>
          <CardSlider img={email} inactive>
            <form className="form-wrapper" onSubmit={this.handleUserSubmit}>
              <fieldset>
                <label className="form-label" htmlFor="name">Full name:</label>
                <input className="form-input" type="text" id="name" name="name"
                       value={this.state.dbUser.name || ''} onChange={this.changeHandler} />
              </fieldset>

              <fieldset>
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-input" type="text" id="email" name="email"
                       value={this.state.dbUser.email || ''} onChange={this.changeHandler} />
              </fieldset>

              <fieldset>
                <label className="form-label" htmlFor="number">Phone number:</label>
                <input className="form-input" type="text" id="number" name="number"
                       value={this.state.dbUser.number || ''} onChange={this.changeHandler}  />
              </fieldset>
            </form>

            <button onClick={this.handleUserSubmit} className="btn btn-success">Update profile</button>
          </CardSlider>
        </motion.div>

      </div>
    );
  }
}

export default withAuth0(Profile);
