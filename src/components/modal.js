import React, {Component} from 'react';
import toggleModal from '../scripts/toggleModal';

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
      <div id="modal" style={{
        display: 'none',
        zIndex: 999,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(1, 1, 1, 0.25)',
        backdropFilter: 'blur(2px)',
      }}
      >
        <div style={{
          position: 'relative',
          margin: '2em',
          maxWidth: '800px',
          background: 'white',
          borderRadius: 25,
          padding: '3.5em',
          zIndex: 99999,
          boxShadow: 'rgba(1, 1, 1, 0.2) 0px 1px 75px'
        }}>
          <button className="btn btn-danger p-1"
            onClick={() => toggleModal()}
            style={{
              position: 'absolute',
              top: 10, right: 10,
              borderRadius: '50%',
              width: '2em', height: '2em'
            }}
          >
            X
          </button>
          <h3>Stay informed. We'll let you know when we're live!</h3><br />
          <form onSubmit={(e) => this.registerEmail(e)}>
            <label htmlFor="email" id="emailLabel" style={{display: 'none'}}></label>
            <div className="d-flex justify-content-stretch align-items-center flex-column flex-sm-row">
              <input className="flex-grow-1 mb-3 mr-sm-3 my-sm-auto w-100" type="text"
                     name="email" id="email" placeholder="Enter your email"
                     onChange={(e) => this.renderFieldValidity(e)} />
              <button className="btn btn-success my-auto w-100" type="submit" name="submit">
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
