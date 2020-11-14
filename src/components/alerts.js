import React, {Component} from 'react';
import flashAlert from '../scripts/flashAlert'

class Alerts extends Component {
  style = {
    alert: {
      position: 'fixed',
      zIndex: 999,
      bottom: '-100%',
      right: 0,
      left: 0,
      color: '#fff',
      textAlign: 'center',
      padding: '1em',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'bottom 0.5s ease 0s',
      background: '#ff789d'
    },
    close: {
      position: 'absolute',
      fontWeight: 900,
      fontSize: '1.5em',
      right: '1em',
      cursor: 'pointer'
    }
  }

  closeAlert() {
    const alert = document.getElementById('alert');
    alert.style.bottom = '-100%'
  }

  render() {
    return(
      <div id="alert" style={this.style.alert}>
        <span id="alert-text">alert</span>
        <span style={this.style.close} onClick={() => this.closeAlert()}>x</span>
      </div>
    )
  }
}

export default Alerts;
