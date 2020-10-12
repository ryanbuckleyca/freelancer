import React, {Component} from 'react';
import mailchimp from '../images/mailchimp.svg';
import './cards.scss'
import {swapWords, stopSwapWords} from './swapWords'

class HowItWorks extends Component {
  componentDidMount() {
    swapWords();
  }

  componentWillUnmount() {
    console.log('component unmounted');
    stopSwapWords();
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
          from: <i name="fakerEmail">youremail@emailaccount.com</i><br />
          to: theclientsemail@yahoo.com<br />
          date: <i name="date">{ new Date().toISOString().substring(0, 10) }</i><br />
          subject:  <i name="subject">Checking in</i><br />
          <br />
          <i name="greeting">Hello</i> <em>Client Name</em>,
          <br /><br />
          <i name="opening">With regards to</i> <i name="who">our client</i>, I am <i name="action">writing</i> to <i name="inform">inform you</i> it’s been <i name="time">a week</i> since the initial <i name="invoice">invoice</i> was <i name="sent">sent</i>. Please <i name="respond">respond</i> to the <i name="contact">contact info</i> in the <i name="attachment">attachment</i> if you <i name="need">need</i> <i name="help">help</i>.
          <br /><br />
          <i name="thanks">Thanks</i>,<br />
          <i name="fakerName">Ryan Buckley</i>
        </p>
        <br />
        <div className="card-bottom">
          <div className="card-bottom-img">
            <img src={mailchimp} alt="mailchimp" />
          </div>
          <div className="card-bottom-text">
            PLUS: We’ll send physical mail bi-weekly or monthly with your original invoice.
          </div>
        </div>
      </div>
    )
  }
}

export default HowItWorks;
