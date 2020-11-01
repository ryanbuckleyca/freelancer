import React, {Component} from 'react';
import '../cards.scss';

class Radio extends Component {
  render() {
    return(
    <label className="radio">
      <input name={this.props.name} type="radio" value={this.props.value.toLowerCase()} />
      {this.props.value}
      <span class="dot"></span>
    </label>
    )
  }
}

export default Radio;
