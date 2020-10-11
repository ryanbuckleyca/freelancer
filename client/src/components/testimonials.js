import React, {Component} from 'react';
import './testimonials.scss';
import './cards.scss';

class Testimonials extends Component {
  render() {
    return(

      <div id="demo" className="carousel slide card-testimonials card-lg" data-ride="carousel">
        <span className="card-testimonials-head">
          <h2 className="m-0">Testimonials</h2>
          <div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </span>

        {/* Indicators */}
        <ul className="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
        </ul>

        {/* The slideshow */}
        <div className="carousel-inner pb-3">
          <div className="carousel-item active">
            <div className="card-testimony">
              <div className="avatar">
                <img src="https://kitt.lewagon.com/placeholder/users/ryanbuckleyca"
                  className="avatar" alt="user avatar" />
              </div>
              <p>
                Ryan Buckley
                <br />
                Front-End Developer
                <br /><br />
                Proin molestie felis leo, vestibulum ullamcorper leo consectetur ac. Donec eros nulla!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card-testimony">
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
          </div>
          <div className="carousel-item">
            <div className="card-testimony">
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
        </div>


      </div>
    )
  }
}

export default Testimonials;
