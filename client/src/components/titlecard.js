import React, {Component} from 'react';
import imgCoins from '../images/coins_nobg.svg';
import './titlecard.scss'

class TitleCard extends Component {
  render() {
    return (
      <div className="title-card">
        <div className="title-card-img">
          <img src={imgCoins} alt="person on stack of coins" />
        </div>
        <div className="title-card-text">
          <h2>We handle your reminders. You keep what you earned.</h2>
          <p>Following up with clients for payment is annoying and time-consuming.  Our automated system sends out interval reminders. All you need to do is add your invoice and we take care of the rest!</p>
        </div>
      </div>
    )
  }
}

export default TitleCard;
