import React, {Component} from 'react';
import Trial from './trial';
import Logotype from './logotype';
import './footer.scss';

class Footer extends Component {
  render(props) {
    return(
      <div>
        { this.props.trial ? <div className="container my-5 p-0"><Trial /></div> : null }
        <div className="footer mr-5">
          <div>
            <Logotype height='40' />
            <p>info@chequemate.work<br />
            1-347-272-0159</p>
            <small> © Cheque Mate™, 2020. All rights reserved.</small>
            <small> Company Registration Number: 21479524.</small>
          </div>
          <div className="pt-3">
            <h4>About</h4>
            Profile<br />
            Features<br />
            Careers<br />
            News
          </div>
          <div className="pt-3">
            <h4>Help</h4>
            Support<br />
            Sign up<br />
            Guide<br />
            FAQ
          </div>
          <div className="pt-3 w-25">
            <h4>Social Media</h4>
            <span className="d-flex align-items-center">
              <img height="25" src="https://mk0hootsuiteblof6bud.kinstacdn.com/wp-content/uploads/2018/09/glyph-logo_May2016-310x310.png" alt="Instagram" /><br />
              <img height="35" src="https://mk0hootsuiteblof6bud.kinstacdn.com/wp-content/uploads/2018/09/Twitter_Logo_Blue-310x310.png" alt="Twitter" /><br />
              <img height="25" src="https://blog-assets.hootsuite.com/wp-content/uploads/2018/09/In-2C-54px-R.png" alt="linkedIn" /><br />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
