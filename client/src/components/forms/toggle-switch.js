import React, {Component} from 'react'
import './toggle-switch.scss'

class ToggleSwitch extends Component {
  render() {
    return(
      <div className="reminder-toggle">
        <label className="toggle-switch button">
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => this.props.changeHandler({ active: !this.props.value })}
            checked={this.props.value || false}
          />
          <div className="knobs"></div>
          <div className="layer"></div>
        </label>
        <div style={{flexGrow: 1, marginLeft: '1em'}}>
          {this.props.message} are {this.props.value ? 'ON' : 'OFF'}
        </div>
      </div>
    )
  }
}

export default ToggleSwitch;
