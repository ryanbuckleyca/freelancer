import React, {Component} from 'react';
import '../cards.scss';

class InputField extends Component {
  render() {
    return(
      <fieldset className={this.props.className}>
        <label className="form-label" htmlFor={this.props.name}>
          {this.props.title}
        </label>
        <input 
          className="form-input" 
          type={this.props.type || "text"} 
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

export default InputField;