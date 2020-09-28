import React, {Component} from 'react';

class Trial extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-5 col-md-7"><h3 className="mb-0">Try for free!</h3>Get limited 1 week free try our features!</div>
        <div className="col-7 col-md-5 d-flex align-items-center justify-content-end">
          <a href="/learn" className="btn btn-success">Learn more</a>
          &nbsp;
          <a href="/demo" className="btn btn-outline-success">Request Demo</a>
        </div>
      </div>
    );
  }
}

export default Trial;
