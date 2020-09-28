import React, {Component} from 'react';
import social_media from '../images/social_media.svg';
import mailchimp from '../images/mailchimp.svg';
import './cards.scss'

class HowItWorks extends Component {
  render() {
    return (
      <div className="howitworks-card card-lg">
        <div className="row">
          <div className="col-12 mt-2">
            We automatically send emails, texts, and phone calls from your own phone number and email, based on your chosen frequency.
            <br /><br />
            If we detect that you have been blocked, we will send from our own list of addresses and numbers, using dynamic content of {Number(4*4*3*4*3*4*5*4*4*4*5*7*4).toLocaleString()} message variations that can’t be easily blocked or filtered.
          </div>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-12 mb-n5 col-md-5 mb-md-0 order-md-2 col-lg-3">
            <img className="mw-100" src={social_media} alt="social media" />
          </div>
          <div className="col-12 mt-n5 col-md-7 mt-md-0 order-md-1 col-lg-9">
            <p className="card-email">
              <i name="greeting">Hello</i> _CLIENT_,
              <br /><br />
              <i name="opening">With regards to</i> <i name="who">our client</i>. I am <i name="action">writing</i> to <i name="inform">inform you</i> it’s been _TIME_ since your <i name="invoice">invoice</i> was <i name="sent">sent</i>. Please <i name="respond">respond</i> to the <i name="contact">contact info</i> in the <i name="attachment">attachment</i> if you <i name="need">need</i> <i name="help">help</i>.
              <br /><br />
              <i name="thanks">Thanks</i>,
              Fake But Real Looking Name
            </p>
          </div>
        </div>
        <div className="row px-0 mt-n4 mb-n4 align-items-center" style={{height: 150}}>
          <div className="col-4 mt-5 mr-n3 col-md-3"><img className="w-100 mb-n5" style={{height: 150}} src={mailchimp} alt="mailchimp" /></div>
          <div className="col-8 p-0 mt-5 ml-n3 col-md-9">PLUS: We’ll send physical mail bi-weekly or monthly with your original invoice.</div>
        </div>
      </div>
    )
  }
}

export default HowItWorks;