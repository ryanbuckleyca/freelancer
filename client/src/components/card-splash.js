import React, {Component} from 'react';
import imgRevenue from '../images/revenue_2.svg';
import toggleModal from './toggleModal';
import './cards.scss';

class CardSplash extends Component {
  render() {
    return(
      <div className="card-splash">
        <div className="card-splash-img">
          <img src={imgRevenue} alt="person with money" />
          <a href="#" onClick={() => toggleModal()} className="btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
        <div className="card-splash-text">
          <h2>Save your time. <br className="d-block d-sm-none d-md-block" /> Get your money.</h2>
          <p>No more chasing payments or going blindly into new jobs. Cheque Mate helps you deal with and avoid bad clients and overdue invoices.</p>
          <a href="#" onClick={() => toggleModal()} className="btn btn-outline-primary">Learn more <span className="arrow">⟶</span></a>
        </div>
      </div>
    )
  }
}

export default CardSplash;
