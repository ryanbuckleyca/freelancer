import React, {Component} from 'react';
import SectionHeader from '../components/section-header';
import CardSplash from '../components/cards/card-splash';
import CardTitle from '../components/cards/card-title';
import CardSmall from '../components/cards/card-small';
import HowItWorks from '../components/howitworks';
import Testimonials from '../components/testimonials';
import money from '../images/bank_note.svg';
import pr from '../images/pr.svg';
import emails from '../images/sending_emails.svg';
import currency from '../images/currency.svg';
import imgCoins from '../images/coins_nobg.svg';
import callAPI from '../scripts';

class Landing extends Component {
  render() {
    console.log('hits the backend:', callAPI('api/clients/1'));
    return (
      <div>
        <hr className="spacer" />
        <CardSplash />

        <hr className="spacer" />
        <CardTitle
          img={imgCoins}
          title={<span>We do the work. <br />You get paid.</span>}
          text="Don't waste time chasing clients for payment.  Our automated system handles reminders. You just add your invoice and we take care of the rest!"
        />

        <hr className="spacer" />
        <SectionHeader
          title="Features"
          text="Here are a few of the features we offer to users."
        />

        <hr className="spacer" />
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

        <hr className="spacer" />
        <SectionHeader
          title="How it Works"
        />

        <hr className="spacer" />
        <HowItWorks />

        <hr className="spacer" />
        <Testimonials />

        <hr className="spacer" />
      </div>
    );
  }
}

export default Landing;
