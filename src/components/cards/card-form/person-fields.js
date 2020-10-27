import React, {Component} from 'react';
import '../cards.scss';

class CardFormInput extends Component {
  render() {
    return(
      <fieldset>
        <label className="form-label" htmlFor={this.props.name}>
          {this.props.title}
        </label>
        <input 
          className="form-input" 
          type="text" 
          id={this.props.name} 
          name={this.props.name}
          value={this.props.value || ''}
          onChange={this.props.changeHandler}
          required
        />
      </fieldset>
    )  
  }
}

class CardFormFieldsPerson extends Component {
  render() {
    return(
      <div className="card-form-form">
        <CardFormInput 
          name="name" 
          title="Full name *" 
          value={this.props.name}
          changeHandler={this.props.changeHandler} 
          required 
        />
        <span className="d-sm-flex">
          <CardFormInput 
            name="email" 
            title="Email Address *" 
            value={this.props.email}
            changeHandler={this.props.changeHandler} 
            required 
          />
          <CardFormInput 
            name="number"
            title="Phone *" 
            value={this.props.number}
            changeHandler={this.props.changeHandler} 
            required 
          />
        </span>
        <CardFormInput 
            name="street1"
            title="Address 1 *" 
            value={this.props.street1}
            changeHandler={this.props.changeHandler} 
            required 
        />
        <CardFormInput 
            name="street2"
            title="Address 2" 
            value={this.props.street2}
            changeHandler={this.props.changeHandler} 
        />
        <span className="d-sm-flex">
          <CardFormInput 
              name="city"
              title="City/Town *" 
              value={this.props.city}
              changeHandler={this.props.changeHandler} 
              required 
          />
          <CardFormInput 
              name="state"
              title="State/Province *" 
              value={this.props.state}
              changeHandler={this.props.changeHandler} 
              required 
          />
        </span>
        <span className="d-sm-flex">
          <CardFormInput 
              name="post_zip"
              title="Zip/Postal code *" 
              value={this.props.post_zip}
              changeHandler={this.props.changeHandler} 
              required 
          />
          <CardFormInput 
              name="country"
              title="Country *" 
              value={this.props.country}
              changeHandler={this.props.changeHandler} 
              required 
          />
        </span>
        <div id="card-form-btn-bottom">
          <a className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update profile
          </a>
          <br />
          <a className="btn btn-danger">delete account</a>
        </div>
      </div>
    );
  }
}

export default CardFormFieldsPerson;
