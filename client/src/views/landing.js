import React, {Component} from 'react';
import CardSplash from '../components/card-splash';
import CardTitle from '../components/card-title';
import CardSmall from '../components/card-small';
import HowItWorks from '../components/howitworks';
import Testimonials from '../components/testimonials';
import money from '../images/bank_note.svg';
import pr from '../images/pr.svg';
import emails from '../images/sending_emails.svg';
import currency from '../images/currency.svg';
import imgCoins from '../images/coins_nobg.svg';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className='mt-5 mb-3'>
          <CardSplash />
        </div>
        <br />
        <div className='my-4'>
          <CardTitle
            img={imgCoins}
            title={<span>We do the work. <br />You get paid.</span>}
            text="Don't waste time chasing clients for payment.  Our automated system handles reminders. You just add your invoice and we take care of the rest!"
          />
        </div>
        <br />
        <div className="text-center m-3">
          <h2 className="m-3">Features</h2>
          <span className="my-5">Here are a few of the features we offer to users.</span>
        </div>
        <br />
        <div className="card-grid">
          <CardSmall
            img={money}
            cardTitle="Search Bad Clients"
            text="Know before you begin. Our database of 2,302 clients with overdue or unpaid bills will inform you before you take on work."
          />
          <CardSmall
            img={pr}
            cardTitle="Hands-off Follow-up"
            text="We automatically email, text, and call the client, even sending them your invoice as physical mail. You focus on what's important"
          />
          <CardSmall
            img={emails}
            cardTitle="In Your Own Voice"
            text="Personalize the message that send to your client. You can choose your range of politeness or sternness abd edit suggested messages."
          />
          <CardSmall
            img={currency}
            cardTitle="Save Money!"
            text="No out-of-area court fees, no 35-55% collection agencies. Just $5/month and the rest of your hard-earned money is yours!"
          />
        </div>
        <br />
        <div className="text-center mb-4">
          <h2>How It Works</h2>
        </div>
        <div className='container my-5'>
          <HowItWorks />
        </div>
        <br />
        <div className='container my-5'>
          <Testimonials />
        </div>
      </div>
    );
  }
}

export default Landing;
