import React, {Component} from 'react';
import imgCoins from '../images/coins_nobg.svg';
import './cards.scss';

class CardTitle extends Component {
  render() {
    return (
      <div className="row card-lg">
        <div className="col-12 p-5 col-sm-5 col-lg-4 p-sm-0">
          <img className="mx-auto" src={imgCoins} alt="person on stack of coins" />
        </div>
        <div className="col-12 col-sm-7 col-lg-8">
          <h2 className="text-center text-sm-left">We do the work. <br className="d-block d-sm-none d-lg-block" />You get paid.</h2>
          <p className="my-5">Following up with clients for payment is annoying and time-consuming.  Our automated system sends out interval reminders. All you need to do is add your invoice and we take care of the rest!</p>
        </div>
      </div>
    )
  }
}

export default CardTitle;
