import React, {Component} from 'react';
import toggleModal from './toggleModal';

class Trial extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-12 text-center mb-4 col-sm-5 text-sm-left mb-sm-0 col-md-6"><h3 className="mb-0">Try for free!</h3>Get limited 1 week free try our features!</div>
        <div className="col-12 col-sm-7 col-md-6 d-flex align-items-center justify-content-center">
          <a href="#" onClick={() => toggleModal()} className="btn btn-success">Learn more</a>
          &nbsp;
          <a href="#" onClick={() => toggleModal()} className="btn btn-outline-success">Request Demo</a>
        </div>
      </div>
    );
  }
}

export default Trial;
