import React, {Component} from 'react';
import './testimonials.scss';

class Testimonials extends Component {
  render() {
    return(
      <div className="testimonials">
        <h2>Testimonials</h2>
        <div className="hScroll">
          <div className="testimony">
            <div className="avatar">
              <img src="https://kitt.lewagon.com/placeholder/users/ryanbuckleyca"
                className="avatar" alt="user avatar" />
            </div>
            <p>
              Ryan Buckley
              <br />
              Front-End Developer
              <br /><br />
              Proin molestie felis leo, vestibulum ullamcorper leo consectetur ac. Donec eros nulla, porttitor quis velit vitae, pulvinar dapibus neque. Quisque malesuada neque a lacus vestibulum aliquam.
            </p>
          </div>
          <div className="testimony">
            <div className="avatar">
              <img src="https://kitt.lewagon.com/placeholder/users/nachiket87"
                className="avatar" alt="user avatar" />
            </div>
            <p>
              Nachiket<br />
              Back-End Developer<br /><br />
              Vivamus commodo mauris id mi commodo, sodales tempus leo elementum.
            </p>
          </div>
          <div className="testimony">
            <div className="avatar">
              <img src="https://kitt.lewagon.com/placeholder/users/mynameisnirali"
                className="avatar" alt="user avatar" />
            </div>
            <p>
              Nirali<br />
              Full-Stack Developer<br /><br />
              Donec efficitur sit amet leo vitae iaculis. Donec et ex non ante porta tristique et ac.
            </p>
          </div>
        </div>
        <div className="bottom-scroll">
          <div>••••</div>
          <div>&#x2190; &#x2192;</div>
        </div>
      </div>
    )
  }
}

export default Testimonials;
