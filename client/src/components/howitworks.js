import React, {Component} from 'react';
import mailchimp from '../images/mailchimp.svg';
import swapWords from './swapwords';
import './cards.scss'

class HowItWorks extends Component {
  componentDidMount() {
    swapWords();
  }

  render() {
    return (
      <div className="card-xl">
        <p>
            We automatically send emails, texts, and phone calls from your own phone number and email, based on your chosen frequency.
            <br /><br />
            If we detect that you have been blocked, we will send from our own list of addresses and numbers, using dynamic content of 103,219,200 message variations that can’t be easily blocked or filtered.
        </p>
        <br />
        <p className="card-email">
          <i name="greeting">Hello</i> _CLIENT_,
          <br /><br />
          <i name="opening">With regards to</i> <i name="who">our client</i>, I am <i name="action">writing</i> to <i name="inform">inform you</i> it’s been _TIME_ since the initial <i name="invoice">invoice</i> was <i name="sent">sent</i>. Please <i name="respond">respond</i> to the <i name="contact">contact info</i> in the <i name="attachment">attachment</i> if you <i name="need">need</i> <i name="help">help</i>.
          <br /><br />
          <i name="thanks">Thanks</i>,<br />
          <i name="fakerName">Ryan Buckley</i>
        </p>
        <br />
        <div className="card-splash">
          <p className="card-splash-text">
            PLUS: We’ll send physical mail bi-weekly or monthly with your original invoice.
          </p>
          <div className="card-splash-img" style={{marginBottom: '-25%'}}>
            <img style={{width: '50%'}} src={mailchimp} alt="mailchimp" />
          </div>
        </div>
      </div>
    )
  }
}

export default HowItWorks;
