import React, {Component} from 'react';
import bug from '../images/404.svg';

class NotFound extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <img width="25%" src={bug} alt="Error" />
        <p>We're sorry, but we can't seem to find the <br />{this.props.type} you're looking for.</p>
      </div>
    );
  }
}

export default NotFound;
