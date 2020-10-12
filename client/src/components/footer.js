import React, {Component} from 'react';
import Trial from './trial';
import Logotype from './logotype';
import './footer.scss';

class Footer extends Component {
  render() {
    return(
      <div>
        { !this.props.showTrial && <div className="container my-5 p-0"><Trial /></div> }
        <div className="footer">
          <div className="footer-legal">
            <Logotype height='50' />
            <br />
            <small>info@chequemate.work</small>
            <small>
              © 2020 Cheque Mate. <br />
              All rights reserved.<br />
            </small>
          </div>
          <div class="footer-links">
            <div>
              <h4>About</h4>
              Profile<br />
              Features<br />
              Careers<br />
              News
            </div>
            <div>
              <h4>Help</h4>
              Support<br />
              Sign up<br />
              Guide<br />
              FAQ
            </div>
            <div>
              <h4>Social Media</h4>
              <span className="footer-social">
                <img src="https://www.flaticon.com/svg/static/icons/svg/1384/1384031.svg" alt="Instagram" /><br />
                <img src="https://www.flaticon.com/svg/static/icons/svg/733/733635.svg" alt="Twitter" /><br />
                <img src="https://www.flaticon.com/svg/static/icons/svg/2111/2111532.svg" alt="linkedIn" /><br />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
