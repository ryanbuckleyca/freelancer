import React, {Component} from 'react';
import './cards.scss';

class CardForm extends Component {
  render() {
    return(
      <div className='card-slider'>
        <div className="card-slider-img">
          {this.props.button}
        </div>
        <div className="card-slider-form">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CardForm;
