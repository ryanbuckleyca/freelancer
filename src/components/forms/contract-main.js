import React, {Component} from 'react';
import '../cards/cards.scss';
import callAPI from '../../scripts/callAPI';
import Select from 'react-select';
import Reminders from './reminders';
import InputField from './input';
import Radio from './radio';

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
    .then(res => this.props.passProps({ user_clients: res }))
    .catch(err => console.log("problem finding user's clients: ", err))
  }

  clientInfo(client) {
    return (
      client.name + ' | ' +
      client.street1 + ', ' +
      (client.street2 ? client.street2 + ', ' : '') +
      client.city + ', ' + client.state + ' ' +
      client.post_zip + ' ' + client.country
    )
  }

  contractClient(client_id, user_clients) {
    const client = user_clients.find(client => client.id === client_id)
    return this.clientInfo(client)
  }

  changeSelect = e => {
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

    if(!this.props.id)
      return "Loading..."

    return(
      <div className="card-form-form">
        <span className="d-xs-flex">
          <InputField
            name="identifier"
            className="flex-item-fill"
            title="Invoice ID or unique description: *"
            value={this.props.identifier}
            changeHandler={this.props.changeHandler}
            required
          />
          <div className="flex-item-small">
            <Radio name="paid" value="paid" />
            <Radio name="paid" value="unpaid" className="alert" />
          </div>
        </span>
        <span className="d-xs-flex">
          <InputField
            className="flex-item-fill"
            type="date"
            name="due_date"
            title="Due Date: *"
            value={this.props.due_date}
            changeHandler={this.props.changeHandler}
            required
          />
          <InputField
            className="flex-item-fill"
            name="amount"
            title="Amount: *"
            value={this.props.amount}
            changeHandler={this.props.changeHandler}
            required
          />
        </span>
        <fieldset>
          <label className="form-label" htmlFor="client">Client*</label>
          {this.props.user_clients && this.clientList(this.props.user_clients)}
        </fieldset>
        <Reminders
          reminders={this.props.Reminders}
          passProps={this.props.passProps}
          changeHandler={this.props.changeHandler}
          selectedType={this.props.selectedType}
        />
        <button id="card-form-btn-bottom" onClick={this.props.handleSubmit} className="btn btn-primary">
          Update contract
        </button>
      </div>
    );
  }
}

export default CardFormFieldsContract;
