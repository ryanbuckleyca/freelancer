import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../scripts/callAPI';
import requiredFieldsValid from '../scripts/requiredFieldsValid';
import updateAuthUser from '../scripts/updateAuthUser';
import './cards.scss';

class CardForm extends Component {

  setFormDataState(props) {
    callAPI(`/api/${props.table}/${props.id}`)
      .then(result => this.setState(result))
  }

  async saveFormToDB() {
    try {
      const res = await callAPI(
        `/api/${this.props.table}/${this.props.id || ''}`,
        this.props.id ? 'PUT' : 'POST',
        this.state
      )
      if(this.props.table === 'users') {
        updateAuthUser(this.state);
      }
      console.log(`${this.props.table} saved`)
      return res
    }
    catch(err) { console.log('card-form saveFormToDB err: ', err) }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFieldsValid()) {
      const saved = this.saveFormToDB();
      // redirect to new record if not updating
      !this.state.id && (window.location.href = `/${this.props.table}/${saved.id}`)
    }
    else {
      // TODO: render form to show errors
      console.log('Fields null or undefined')
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  render() {
    !this.state && this.props.id && this.setFormDataState(this.props);

    if (this.props.table && !this.props.id)
      return (
        <div className="profile">
          <hr className="spacer" />
          <div style={{textAlign: 'center', height: '50vh', lineHeight: '50vh'}}>
          no user found
          </div>
        </div>
      )

    return(
      <form className="form-wrapper">
        <div className='card-slider'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            ...this.state
          })}

          {/* CardFormFields */}
          {React.cloneElement(this.props.children[1], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            ...this.state
          })}
        </div>
      </form>
    );
  }
}

export default withAuth0(CardForm);
