import React, {Component} from 'react';
import './cards.scss';
import callAPI from '../scripts/callAPI';

class CardFormFieldsContract extends Component {

  // TODO: this should be inherited from a more global state
  // to avoid having to make another unnecessary api call
  userID() {
    console.log('getting user id...')
    callAPI(`/api/users/${this.props.auth0_id}`)
    .then(res => this.usersClients(res.id))
    .catch(err => console.log("problem finding user id: ", err))
  }

  contractRecord(contract_id) {
    console.log('getting contract record from db...')
    callAPI(`/api/contracts/${contract_id}`)
    .then(res => this.setState(res))
    .catch(err => console.log("problem finding user's clients: ", err))
  }

  usersClients(user_id) {
    console.log('get client list of user...')
    callAPI(`/api/clients/user/${user_id}`)
    .then(res => {
      console.log("user's clients are: ", res)
      this.props.changeHandler({ target: { name: 'user_clients', value: res }})
    })
  }

  componentDidMount() {
    console.log('card-form-fields-contract mounted with props: ', this.props)
    this.userID()
    this.props.id && this.contractRecord(this.props.id)
  }

  render() {
    if(!this.props.id)
      return "Loading..."

    return(
      <div className="card-form-form">
        <fieldset>
          <label className="form-label" htmlFor="client">Client*</label>
          <input className="form-input" type="text" id="client_id" name="client_id"
                 value={this.props.client_id || ''}
                 onChange={this.props.changeHandler}
                 required />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="idenfitier">Invoice ID or unique description:*</label>
          <input className="form-input" type="text" id="idenfitier" name="identifier"
                 value={this.props.identifier || ''}
                 onChange={this.props.changeHandler}
                 required />
        </fieldset>
        <span className="d-sm-flex">
          <fieldset className="mr-sm-3">
            <label className="form-label" htmlFor="due_date">Due Date*</label>
            <input className="form-input" type="date" id="due_date" name="due_date"
                   value={this.props.due_date || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
          <fieldset>
            <label className="form-label" htmlFor="paid">Paid?*</label>
            <input className="form-input" type="checkbox" id="paid" name="paid"
                   value={this.props.paid || ''}
                   onChange={this.props.changeHandler} />
          </fieldset>
        </span>
        <button id="card-form-btn-bottom" onClick={this.props.handleSubmit} className="btn btn-primary">
          Update contract
        </button>
      </div>
    );
  }
}

export default CardFormFieldsContract;
