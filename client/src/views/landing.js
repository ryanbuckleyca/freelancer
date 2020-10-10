import React, {Component} from 'react';
import Splash from '../components/splash';
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
      <div className='container'>
        <div className='mt-2 mb-3'>
          <Splash />
        </div>
        <br />
        <div className='my-4'>
          <CardTitle
            img={imgCoins}
            title={<span>We do the work. <br />You get paid.</span>}
            text="Following up with clients for payment is time-consuming.  Our automated system handles reminders. You just add your invoice and we take care of the rest!"
          />
        </div>
        <br />
        <div className="text-center m-3">
          <h2 className="m-3">Features</h2>
          <span className="my-5">Here are a few of the features we offer to users.</span>
        </div>
        <br />
        <div className="row card-grid my-3 mx-2 mx-sm-0">
          <CardSmall
            img={money}
            cardTitle="Search Bad Clients"
            text="Know who you’re working with before you begin a project. Our database of 2,302 clients with overdue or unpaid invoices will help inform you before you take on work."
          />
          <CardSmall
            img={pr}
            cardTitle="Hands-off Follow-up"
            text="Our automated system automatically emails, texts, and calls the client, even sending them your invoice as physical mail weekly, bi-weekly, or monthly."
          />
          <CardSmall
            img={emails}
            cardTitle="In Your Own Voice"
            text="Personalize the message that send to your client. You can choose your range of politeness or sternness. Review and edit each suggested message."
          />
          <CardSmall
            img={currency}
            cardTitle="Save Money!"
            text="No expensive travel to out-of-area courts, no 35-55% fees from collection agencies. Just a $5/month and the rest of your money is, well, yours!"
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
