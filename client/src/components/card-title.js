import React, {Component} from 'react';
import './cards.scss';

class CardTitle extends Component {
  render() {
    return (
      <div className="card-lg">
        <div className="card-lg-img ">
          <img src={this.props.img} alt="title" />
        </div>
        <div className="card-lg-text">
          <h2>{this.props.title}</h2>
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default CardTitle;
