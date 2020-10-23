import React, {Component} from 'react';
import toggleModal from '../scripts/toggleModal';
import './modal.scss'

const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

class Modal extends Component {

  // TODO: extract into requiredFieldsValid for re-use
  validateEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  }

  renderFieldValidity(e) {
    var color = this.validateEmail(e.currentTarget.value) ? 'green' : 'red'
    e.currentTarget.style = `border: 1px solid ${color}`;
  }

  async registerEmail(e) {
    e.preventDefault();
    const email = document.getElementById('email');
    if (this.validateEmail(email.value)) {
      try {
        const res = await fetch(`${url}/api/mailinglist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(email.value)
        })
        const data = await res.json()
        return data
      } catch(err) {
        console.log('add subscriber error: ', err)
      }
    } else {
      email.style.border = '1px solid red';
      document.getElementById('emailLabel').innerText = 'Please enter a valid email';
      document.getElementById('emailLabel').style = 'display: block; color: red';
    }
  }

  render() {
    return(
      <div id="modal">
        <div id="modalDialog">
          <a className="close" onClick={() => toggleModal()}>X</a>
          <h3>Stay informed. We'll let you know when we're live!</h3><br />
          <form onSubmit={(e) => this.registerEmail(e)}>
            <label htmlFor="email" id="emailLabel" style={{display: 'none'}}></label>
            <div className="formFields">
              <input type="text" name="email" id="email" placeholder="Enter your email"
                onChange={(e) => this.renderFieldValidity(e)}
              />
                <button className="btn btn-success" type="submit" name="submit">
                  send me updates!
                </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Modal;
