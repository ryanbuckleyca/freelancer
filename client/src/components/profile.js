import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dbUser: { name: '', email: '', number: '' }
    };
  }

  //TODO: create updateAPI method to DRY-up these calls
  async findUser(auth0_id) {
    try {
      const res = await fetch(`${url}/users/findByAuth0/${auth0_id}`)
      const data = await res.json()
      return data
    } catch(err) {
      console.log('findUser error: ', err)
    }
  };

  //TODO: add authentication and validation
  async createUser(user) {
    try {
      const res = await fetch(`${url}/users/create/`, {
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
      const res = await fetch(`${url}/users/update/${user.id}`, {
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
      <div className="container user-wrapper">
        {/* Form for updating new user */}
        <div className="user-form">
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
        </div>
        <pre>
        {'{'}{
          Object.keys(this.state.dbUser).map(key =>
            <div key={key}>{key}: {this.state.dbUser[key]}</div>)
        }{'}'}
        </pre>
      </div>
    );
  }
}

export default withAuth0(Profile);
