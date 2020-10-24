import React, {Component} from 'react';
import './cards.scss';
import callAPI from '../scripts/callAPI';

class CardFormFieldsContract extends Component {

  componentDidMount() {
    console.log('component did mount, looking for user:')
    callAPI(`/api/users/${this.props.auth0_id}`)
    .then(res =>  {
      console.log('found user id for ', this.props.auth0_id, ': ', res.id)
      this.props.changeHandler({ target:
        { name: 'user_id', value: res.id }
      })
    })
    .catch(err => console.log("problem finding user id: ", err))

    this.props.user_id && callAPI(`/api/contracts/user/${this.props.user_id}`)
    .then(res => {
      console.log('found contract from user ', this.props.user_id)
      this.props.changeHandler({ target:
        { name: 'user_clients', value: res}
      })
  })
    .catch(err => console.log("problem finding user's clients: ", err))
    console.log('card-form-fields-contract mounted with props: ', this.props)
  }

  render() {
    return(
      <div className="card-form-form">
        <input className="form-input" type="hidden" id="id" name="id" />
        <fieldset>
          <label className="form-label" htmlFor="client">Client*</label>
          <input className="form-input" type="text" id="client_id" name="client_id"
                 value={this.props.client_id || ''}
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
