import React, {Component} from 'react';
import './cards.scss';

class CardTitle extends Component {
  render() {
    return (
      <div className="container">
        <div className="row card-lg">
          <div className="col-12 px-2 pt-3 pb-4 text-center col-sm-5 p-sm-0 col-lg-3">
            <img className="mx-auto" src={this.props.img} alt="person on stack of coins" />
          </div>
          <div className="col-12 col-sm-7 col-lg-9">
            <h2 className="text-center text-sm-left">{this.props.title}</h2>
            <p className="mt-3 mt-md-4">{this.props.text}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CardTitle;
