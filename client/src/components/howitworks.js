import React, {Component} from 'react';
import sending_emails from '../images/sending_emails.svg';
import social_media from '../images/social_media.svg';
import mailchimp from '../images/mailchimp.svg';
import './howitworks.scss'

class HowItWorks extends Component {
  render() {
    return (
      <div className="howitworks-card">
        <div className="row head">
          <div className="col-3 head-img"><img src={sending_emails} alt="sending emails" /></div>
          <div className="col-9">We automatically send emails, texts, and phone calls from your own phone number and email, based on your chosen frequency.
          </div>
        </div>
        <span>
          If we detect that you have been blocked, we will send from our own list of addresses and numbers, using dynamic content of {Number(4*4*3*4*3*4*5*4*4*4*5*7*4).toLocaleString()} message variations that can’t be easily blocked or filtered.
        </span>
        <div className="row body mt-5">
          <div className="col-7">
            <p>
              <i name="greeting">Hello</i> _CLIENT_,
              <br /><br />
              <i name="opening">With regards to</i> <i name="who">our client</i>.
              I am <i name="action">writing</i> to <i name="inform">inform you</i>&nbsp;
              it’s been _TIME_ since your <i name="invoice">invoice</i>&nbsp;
              was <i name="sent">sent</i>.&nbsp;
              Please <i name="respond">respond</i> to the <i name="contact">contact info</i> in the&nbsp;
              <i name="attachment">attachment</i> if you <i name="need">need</i> <i name="help">help</i>.
              <br /><br />
              <i name="thanks">Thanks</i>,
              Fake But Real Looking Name
            </p>
          </div>
          <div className="col-5">
            <img src={social_media} alt="social media" />
          </div>
        </div>
        <div className="row bottom">
          <div className="col-4"><img src={mailchimp} alt="mailchimp" /></div>
          <div className="col-8 mt-5">PLUS: We’ll send physical mail bi-weekly or monthly with your original invoice.</div>
        </div>
      </div>
    )
  }
}

export default HowItWorks;
