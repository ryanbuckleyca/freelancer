import React, {Component} from 'react';
import './cards.scss';

class CardFormPersonFields extends Component {
  render() {
    console.log('cardformPersonFields props: ', this.props)

    return(
      <div className="card-slider-form">
        <input className="form-input" type="hidden" id="id" name="id" />
        <fieldset>
          <label className="form-label" htmlFor="name">Full name*</label>
          <input className="form-input" type="text" id="name" name="name"
                 value={this.props.name || ''}
                 onChange={this.props.changeHandler}
                 required />
        </fieldset>
        <span className="d-sm-flex">
          <fieldset className="mr-sm-3">
            <label className="form-label" htmlFor="email">Email Address*</label>
            <input className="form-input" type="text" id="email" name="email"
                   value={this.props.email || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
          <fieldset>
            <label className="form-label" htmlFor="number">Phone*</label>
            <input className="form-input" type="text" id="number" name="number"
                   value={this.props.number || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
        </span>
        <fieldset>
          <label className="form-label" htmlFor="street1">Address 1*</label>
          <input className="form-input" type="text" id="street1" name="street1"
                 value={this.props.street1 || ''}
                 onChange={this.props.changeHandler}
                 required />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="street2">Address 2</label>
          <input className="form-input" type="text" id="street2" name="street2"
                 value={this.props.street2 || ''}
                 onChange={this.props.changeHandler} />
        </fieldset>
        <span className="d-sm-flex">
          <fieldset className="mr-sm-3">
            <label className="form-label" htmlFor="city">City/Town*</label>
            <input className="form-input" type="text" id="city" name="city"
                   value={this.props.city || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
          <fieldset>
            <label className="form-label" htmlFor="state">State/Province*</label>
            <input className="form-input" type="text" id="state" name="state"
                   value={this.props.state || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
        </span>
        <span className="d-sm-flex">
          <fieldset className="mr-sm-3">
            <label className="form-label" htmlFor="post_zip">Zip/Postal code*</label>
            <input className="form-input" type="text" id="post_zip" name="post_zip"
                   value={this.props.post_zip || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
          <fieldset>
            <label className="form-label" htmlFor="country">Country*</label>
            <input className="form-input" type="text" id="country" name="country"
                   value={this.props.country || ''}
                   onChange={this.props.changeHandler}
                   required />
          </fieldset>
        </span>
        <button onClick={this.props.handleSubmit} className="btn btn-primary d-block mt-4 mx-auto d-md-none">Update profile</button>
      </div>
    );
  }
}

export default CardFormPersonFields;
