import React, {Component} from 'react';

class Trial extends Component {
  render() {
    return(
      <div className="d-flex justify-content-between">
        <div><h3 className="mb-0">Try for free!</h3>Get limited 1 week free try our features!</div>
        <div className="d-flex align-items-center">
          <a href="/learn" className="btn btn-success">Learn more</a>
          &nbsp;
          <a href="/demo" className="btn btn-outline-success">Request Demo</a>
        </div>
      </div>
    );
  }
}

export default Trial;
