import React, {Component} from 'react';
import Trial from './trial';
import Logotype from './logotype';
import './footer.scss';

class Footer extends Component {
  render(props) {
    return(
      <div>
        { this.props.trial ? <div className="container my-5 p-0"><Trial /></div> : null }
        <div className="row footer">
          <div className="row order-2 col-sm-5 order-sm-0">
            <div className="mx-3 d-flex flex-row flex-sm-column align-items-start w-100 justify-content-between">
              <Logotype height='40' />
              <div className="text-right text-sm-left align-self-end align-self-sm-start">
                <p>
                  info@chequemate.work<br />
                  1-347-272-0159
                </p>
                <div>
                  <small> © 2020 Cheque Mate.<br className="d-block d-lg-none" /> All rights reserved.</small>
                  <small> Company Registration Number: 21479524.</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 col-sm-2 pb-3 pt-sm-3">
            <h4>About</h4>
            Profile<br />
            Features<br />
            Careers<br />
            News
          </div>
          <div className="col-3 col-sm-2 pb-3 pt-sm-3">
            <h4>Help</h4>
            Support<br />
            Sign up<br />
            Guide<br />
            FAQ
          </div>
          <div className="col-4 col-sm-2 pb-3 pt-sm-3">
            <h4>Social Media</h4>
            <span className="d-flex align-items-center justify-items-start social">
              <img className="mr-2" src="https://www.flaticon.com/svg/static/icons/svg/1384/1384031.svg" alt="Instagram" /><br />
              <img className="mr-2" src="https://www.flaticon.com/svg/static/icons/svg/733/733635.svg" alt="Twitter" /><br />
              <img className="mr-2" src="https://www.flaticon.com/svg/static/icons/svg/2111/2111532.svg" alt="linkedIn" /><br />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
