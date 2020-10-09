import React, {Component} from 'react';
import imgRevenue from '../images/revenue_2.svg';
import toggleModal from './toggleModal';

class Splash extends Component {
  render() {
    return(
      <div className="row splash">
        <div className="col-12 px-5 p-sm-0 px-lg-2 mb-4 col-sm-6 col-lg-5 order-sm-2 text-center">
          <img src={imgRevenue} className="mb-4 mx-auto mr-sm-n5 ml-sm-n1 w-100" alt="person with money" />
          <a href="#" onClick={() => toggleModal()} className="d-none d-sm-inline d-md-none btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
        <div className="col-12 text-center col-sm-6 col-lg-7 text-sm-left order-sm-1">
          <h2>Save your time. <br className="d-block d-sm-none d-lg-block" /> Get your money.</h2>
          <p className="text-left my-5 px-2 px-sm-0 pr-sm-2 pr-lg-5">No more chasing down client payments, or going blindly into new jobs. Cheque Mate helps you deal with, or straight-up avoid, bad clients and overdue invoices.</p>
          <a href="#" onClick={() => toggleModal()} className="d-inline d-sm-none d-md-inline btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
      </div>
    )
  }
}

export default Splash;
