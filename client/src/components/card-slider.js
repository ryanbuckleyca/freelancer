import React, {Component} from 'react';
import './cards.scss';

class CardSlider extends Component {
  render() {
    return(
      <div className="col wrapper">
        <div className="row card-slider">
          <div className="col-12 col-sm-6 order-sm-1 img">
            <img src={this.props.img} alt="profile" />
          </div>
          <div className="col-12 p-5 col-sm-6 order-sm-0 form">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default CardSlider;
