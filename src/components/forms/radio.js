import React, {Component} from 'react';
import '../cards/cards.scss';

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
      <span className={this.props.className || "dot"}></span>
    </label>
    )
  }
}

export default Radio;
