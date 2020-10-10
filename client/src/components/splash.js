import React, {Component} from 'react';
import imgRevenue from '../images/revenue_2.svg';
import toggleModal from './toggleModal';
import './splash.scss';

class Splash extends Component {
  render() {
    return(
      <div className="splash">
        <div className="splash-img">
          <img src={imgRevenue} alt="person with money" />
          <a href="#" onClick={() => toggleModal()} className="d-none d-sm-inline mb-sm-3 d-md-none btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
        <div className="splash-text">
          <h2>Save your time. <br className="d-block d-sm-none d-md-block" /> Get your money.</h2>
          <p>No more chasing down client payments, or going blindly into new jobs. Cheque Mate helps you deal with, or straight-up avoid, bad clients and overdue invoices.</p>
          <a href="#" onClick={() => toggleModal()} className="d-inline d-sm-none d-md-inline btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
      </div>
    )
  }
}

export default Splash;
