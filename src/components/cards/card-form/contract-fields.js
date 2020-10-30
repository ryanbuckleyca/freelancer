import React, {Component} from 'react';
import '../cards.scss';
import callAPI from '../../../scripts/callAPI';

class CardFormFieldsContract extends Component {
  // TODO: this should be inherited from a more global state
  // to avoid having to make another unnecessary api call
  userIDandClients(auth0_id) {
    callAPI(`/api/users/${auth0_id}`)
    .then(res => this._usersClients(res.id))
    .catch(err => console.log("problem finding user id: ", err))
  }
  _usersClients(user_id) {
    callAPI(`/api/clients/user/${user_id}`)
    .then(res => {
      console.log("user's clients are: ", res)
      this.props.passProps({ user_clients: res })
    })
    .catch(err => console.log("problem finding user's clients: ", err))
  }

  // called from componentDidMount
  contractRecord(contract_id) {
    callAPI(`/api/contracts/${contract_id}`)
    .then(res => this.props.passProps(...res))
    .catch(err => console.log("problem finding contract record: ", err))
  }

  componentDidMount() {
    console.log('||||| card-form-fields-contract mounted with props: ', this.props)
    // get records once props are received
    // unless record has already been loaded
    console.log('contract-fields mounted with recordLoaded value of ', this.props.recordLoaded)
    !this.props.recordLoaded && this.contractRecord(this.props.id)
  }

  clientList(clients) {
    const options = clients.map(client =>
        <option key={client.id} value={client.id}>
        {
          client.name + ' | ' +
          client.street1 + ', ' + (client.street2 ? client.street2 + ', ' : '') +
          client.city + ', ' + client.state + ' ' +
          client.post_zip + ' ' + client.country
        }
        </option>)
    return (
      <select className="form-input" name="client" id="client" value={this.props.client_id} onChange={this.props.changeHandler} required>
        {options}
      </select>
    )
  }

  render() {
    console.log('||||| card-form-fields-contract rendered with props: ', this.props)

    !this.props.id && this.userIDandClients(this.props.auth0_id)

    // wait for parent components to pass props
    if(!this.props.id)
      return "Loading..."

    return(
      <div className="card-form-form">
        <fieldset>
          <label className="form-label" htmlFor="client">Client*</label>
          {this.props.user_clients && this.clientList(this.props.user_clients)}
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
