import React, {Component} from 'react';
import './cards.scss';

class CardSmall extends Component {
  render(props) {
    return(
      <div className="col-12 col-md-6 py-3 px-4 p-md-4 mb-4 mb-md-3 card-sm">
        <div className="row">
          <div className="col-5 card-img d-flex align-items-center">
            <img className="w-100" src={this.props.img} alt='info' />
          </div>
          <div className="col-7 card-text">
            <strong className="d-block mb-2">{this.props.cardTitle}</strong>
            <p className="flex-grow-1 align-self-stretch">{this.props.text}</p>
            <a href="/more">Learn more --></a>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSmall;
