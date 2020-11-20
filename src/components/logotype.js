import React, {Component} from 'react';
import './logotype.scss';
import logo from '../images/logo.svg';

class Logotype extends Component {
  render(props) {
    const imgH = {height: (this.props.height || 50) + 'px'}
    const txtH = {fontSize: (this.props.height / 3) || 16}
    return (
      <div className="logotype">
        <img style={imgH} src={logo} alt="Cheque Mate logo" />
        <h1 style={txtH}>Cheque Mate</h1>
      </div>
    );
  }
}

export default Logotype;
