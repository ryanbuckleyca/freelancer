import React, {Component} from 'react';
import Navbar from './navbar';
import Splash from './splash';
import TitleCard from './titlecard';
import HowItWorks from './howitworks';
import Testimonials from './testimonials';
import Footer from './footer';
import './card-grid.scss';
import money from '../images/bank_note.svg';
import pr from '../images/pr.svg';
import finance from '../images/finance_analytics_.svg';
import currency from '../images/currency.svg';

class Landing extends Component {
  render() {
    return (<div className='container'>
        <div className='container my-3'>
          <Navbar />
        </div>
        <br />
        <div className='container mt-4 mb-3'>
          <Splash />
        </div>
        <br />
        <div className='container my-4'>
          <TitleCard />
        </div>
        <br />
        <div className="text-center m-3">
          <h2 className="m-3">Features</h2>
          <span className="my-5">Here are a few of the features we offer to users.</span>
        </div>
        <br />
        <div className="card-grid m-3">
          <div className="card">
            <div className="card-img">
              <img src={money} alt="cash" />
            </div>
            <div className="card-text">
              <h3>Search Bad Clients</h3>
              <p>Know who you’re working with before you begin a project. Our database of 2,302 clients with overdue or unpaid invoices will help inform you before you take on work.</p>
              <a href="/more">Learn more --></a>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={finance} alt="cash" />
            </div>
            <div className="card-text">
              <h3>In Your Own Voice</h3>
              <p>Personalize the message that send to your client. You can choose your range of politeness or sternness. Review and edit each suggested message.</p>
              <a href="/more">Learn more --></a>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={pr} alt="cash" />
            </div>
            <div className="card-text">
              <h3>Hands-off Follow-up</h3>
              <p>Our automated system automatically emails, texts, and calls the client, even sending them your invoice as physical mail weekly, bi-weekly, or monthly.</p>
              <a href="/more">Learn more --></a>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src={currency} alt="cash" />
            </div>
            <div className="card-text">
              <h3>Save Money!</h3>
              <p>No expensive travel to out-of-area courts, no 35-55% fees from collection agencies. Just a small one-time fee and the rest of your money is, well, yours!</p>
              <a href="/more">Learn more --></a>
            </div>
          </div>
        </div>
        <br />
        <div className="text-center m-3">
          <h2 className="m-3">How It Works</h2>
        </div>
        <div className='container my-5'>
          <HowItWorks />
        </div>
        <br />
        <div className='container my-5'>
          <Testimonials />
        </div>
        <br />
        <hr />
        <div className='container my-5'>
          <Footer trial />
        </div>
    </div>);
  }
}

export default Landing;
