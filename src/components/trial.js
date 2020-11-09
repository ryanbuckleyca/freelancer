import React, {Component} from 'react';
import toggleModal from '../scripts/toggleModal';
import './trial.scss';

class Trial extends Component {
  // TODO: toggleModal not being called but onclicks working
  // console.log(toggleModal) shows function fine
  render() {
    return(
      <div className="trial">
        <div className="trial-text">
          <h3>Try for free!</h3>
          Get 1 month of access to try our features!
        </div>
        <div className="trial-btns">
          <button className="btn btn-success" onClick={() => toggleModal()}>
            Learn more
          </button>
          &nbsp;
          <button className="btn btn-outline-success" onClick={() => toggleModal()}>
            Request Demo
          </button>
        </div>
      </div>
    );
  }
}

export default Trial;
