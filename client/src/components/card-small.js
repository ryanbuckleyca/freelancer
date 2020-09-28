import React, {Component} from 'react';
import './cards.scss';

class CardSmall extends Component {
  render(props) {
    return(
      <div className="col-12 col-md-6 mb-4 px-3 px-sm-4 d-flex">
        <div className="row card-sm">
          <div className="col-12 px-5 col-sm-5 col-md-12 px-sm-3 col-lg-5 p-lg-0 card-img d-flex align-items-center card-sm-img">
            <img className="w-100 mx-auto" src={this.props.img} alt='info' />
          </div>
          <div className="col-12 col-sm-7 col-md-12 col-lg-7 card-sm-text">
            <div className="pt-4 pb-3 pl-3 py-sm-4 px-sm-2 p-md-0 py-md-3 pl-md-4 pr-md-3 m-md-3">
            <strong className="d-block mb-2">{this.props.cardTitle}</strong>
            <p className="flex-grow-1 align-self-stretch">{this.props.text}</p>
            <a href="/more">Learn more --></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardSmall;
