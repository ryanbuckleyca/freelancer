import React, {Component} from 'react';
import './cards.scss';

class CardFormFieldsContract extends Component {
  render() {
    console.log('cardformFieldsContract props: ', this.props)

    return(
      <div className="card-form-form">
        <input className="form-input" type="hidden" id="id" name="id" />
        <fieldset>
          <label className="form-label" htmlFor="client">Client*</label>
          <input className="form-input" type="text" id="client" name="client"
                 value={this.props.client || ''}
                 onChange={this.props.changeHandler}
                 required />
        </fieldset>
        <span className="d-sm-flex">
          <fieldset className="mr-sm-3">
            <label className="form-label" htmlFor="due_date">Due Date*</label>
            <input className="form-input" type="text" id="due_date" name="due_date"
                   value={this.props.due_date || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
          <fieldset>
            <label className="form-label" htmlFor="paid">Paid?*</label>
            <input className="form-input" type="checkbox" id="paid" name="paid"
                   value={this.props.paid || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
        </span>
        <button onClick={this.props.handleSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Update profile</button>
      </div>
    );
  }
}

export default CardFormFieldsContract;
