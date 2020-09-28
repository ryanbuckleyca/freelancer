import React, {Component} from 'react';
import imgCoins from '../images/coins_nobg.svg';
import './cards.scss';

class CardTitle extends Component {
  render() {
    return (
      <div className="row card-lg">
        <div className="col-12 px-2 pt-3 pb-4 text-center col-sm-5 p-sm-0 col-lg-3">
          <img className="mx-auto" src={imgCoins} alt="person on stack of coins" />
        </div>
        <div className="col-12 col-sm-7 col-lg-9">
          <h2 className="text-center text-sm-left">We do the work. <br className="d-block d-sm-none d-lg-block" />You get paid.</h2>
          <p className="mt-5">Following up with clients for payment is annoying and time-consuming.  Our automated system sends out interval reminders. All you need to do is add your invoice and we take care of the rest!</p>
        </div>
      </div>
    )
  }
}

export default CardTitle;
