import React, {Component} from 'react';
import '../cards.scss';
import callAPI from '../../../scripts/callAPI';
import Select from 'react-select';

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

  clientInfo(client) {
    return  client.name + ' | ' +
    client.street1 + ', ' + (client.street2 ? client.street2 + ', ' : '') +
    client.city + ', ' + client.state + ' ' +
    client.post_zip + ' ' + client.country
  }

  contractClient(client_id, user_clients) {
    const client = user_clients.find(client => client.id === client_id)
    return this.clientInfo(client)
  }

  changeSelect = e => {
    console.log('event in changeSelect() is: ', e)
    this.props.passProps({ 
      selectedClient: e,
      client_id: e.value
    })
  }

  clientList(clients) {
    const options = clients.map(client => {
      return {
        value: client.id,
        label: this.clientInfo(client)
      }
    })
    return (
      <Select 
        className="form-input" 
        name="client" 
        id="client" 
        classNamePrefix="react-select"
        options={options}
        value={this.props.selectedClient} 
        onChange={this.changeSelect} 
        isSearchable
        required
      />
    )
  }

  render() {
    console.log('||||| card-form-fields-contract rendered with props: ', this.props)

    //set selected client
    const {user_clients, client_id } = this.props
    user_clients 
    && !this.props.selectedClient 
    && this.props.passProps({
      selectedClient: {
        value: client_id,
        label: this.contractClient(client_id, user_clients)
      }
    })

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
