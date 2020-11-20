import React, {Component} from 'react';
import toggleModal from '../../scripts/toggleModal';
import './cards.scss';

class CardSmall extends Component {
  render() {
    return(
        <div className="card-sm">
          <div className="card-sm-img">
            <img src={this.props.img} alt='info' />
          </div>
          <div className="card-sm-text">
            <div>
              <h3>{this.props.cardTitle}</h3>
              <p>{this.props.text}</p>
              <a href="#" onClick={() => toggleModal()}>Learn more ⟶</a>
            </div>
          </div>
      </div>
    );
  }
}

export default CardSmall;
