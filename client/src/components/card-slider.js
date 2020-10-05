import React, {Component} from 'react';
import './cards.scss';

class CardSlider extends Component {
  render() {
    return(
      <div className={this.props.inactive ? 'card-slider inactive' : 'card-slider'}>
        <div className="card-slider-img">
          <img src={this.props.img} alt="profile" />
        </div>
        <div className="card-slider-form">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CardSlider;
