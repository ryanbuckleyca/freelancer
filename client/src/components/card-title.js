import React, {Component} from 'react';
import './cards.scss';

class CardTitle extends Component {
  render() {
    const thisClass = this.props.thisClass || 'card-lg'
    return (
      <div className={thisClass}>
        <div className={thisClass + '-img'}>
          <img src={this.props.img} alt="title" />
        </div>
        <div className={thisClass + '-text'}>
          <h2>{this.props.title}</h2>
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default CardTitle;
