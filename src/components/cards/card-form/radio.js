import React, {Component} from 'react';
import '../cards.scss';

class Radio extends Component {
  render() {
    return(
    <label className="radio">
      <input 
        name={this.props.name} 
        type="radio" 
        value={this.props.value.toLowerCase()}
        onChange={this.props.onChange}
        checked={this.props.checked}
      />
      {this.props.value}
      <span class={this.props.className || "dot"}></span>
    </label>
    )
  }
}

export default Radio;
