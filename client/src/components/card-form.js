import React, {Component} from 'react';
import './cards.scss';

class CardForm extends Component {
  render() {
    console.log('this.props from cardform: ', this.props)

    return(
      <div className='card-slider'>
        <div className="card-slider-img">
          <div className="card-slider-avatar">
            <img src={this.props.picture} alt="avatar" />
            <button className="btn btn-dark btn-sm">edit</button>
          </div>
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
