import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../scripts/callAPI';
import './cards.scss';

class CardForm extends Component {

  setFormDataState(props) {
    console.log(`setFormDataState() will call /api/${props.table}/${props.id}`)
    callAPI(`/api/${props.table}/${props.id}`)
      .then(result => {
        console.log('card-form results of api: ', result)
        this.setState(result)
      })
  }

  // Update/create client profile
  handleSubmit = async (e) => {
    e.preventDefault();
    const formInputs = Array.from(document.getElementsByTagName("input"))
    const reqFields = [...formInputs].filter(el => el.required).map(el => el.value.length > 0)
    try {
      if (reqFields.every(Boolean)) {
        const saved = await callAPI(
          `/api/${this.props.table}/${this.props.id || ''}`,
          this.props.id ? 'PUT' : 'POST',
          this.state
        )
        if(!this.state.id) {
          // redirect to newly created record
          (window.location.href = `/${this.props.table}/${saved.id}`)
        }
        console.log(`${this.props.table} saved`)
      }
      else {
        console.log('Fields null or undefined')
        // TODO: render form to show errors
      }
    }
    catch(err) { console.log(err) }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  render() {
    console.log('card-form rendered with props: ', this.props)
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
