import React, {Component} from 'react';
import imgRevenue from '../images/revenue_.svg';
import './splash.scss';

class Splash extends Component {
  render() {
    return(
      <div className="splash">
        <div className="splash-text">
          <h2>Save your time. Get your money.</h2>
          <p>No more chasing down client payments, or going blindly into new jobs. Cheque Mate helps you deal with, or straight-up avoid, bad clients and overdue invoices.</p>
          <a href="/learn" className="btn btn-success">Learn more</a>
        </div>
        <div className="splash-img">
          <img src={imgRevenue} alt="person with money" />
        </div>
      </div>
    )
  }
}

export default Splash;
