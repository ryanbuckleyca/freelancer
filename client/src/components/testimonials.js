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
                <img src="http://kitt.lewagon.com/placeholder/users/ryanbuckleyca"
                  className="avatar" alt="user avatar" />
              </div>
              <p>
                Ryan Buckley
                <br />
                Web Developer
                <br /><br />
                Cheque Mate helped me get my hard-earned money while allowing me to focus on new projects. I'd highly recommend this effortless app to any freelancer!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card-testimony">
              <div className="avatar">
                <img src="https://randomuser.me/api/portraits/men/15.jpg"
                  className="avatar" alt="user avatar" />
              </div>
              <p>
                Ray Newman<br />
                Designer<br /><br />
                I signed up to Cheque Mate because I was tired of being ripped off by new clients, so now I check before starting any new project to see if they're listed.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card-testimony">
              <div className="avatar">
                <img src="https://randomuser.me/api/portraits/men/39.jpg"
                  className="avatar" alt="user avatar" />
              </div>
              <p>
                Hassan Raffi<br />
                Freelance Editor<br /><br />
                I love that I don't have to keep checking which of my invoice have been paid and sending reminders to clients. With Cheque Mate I just upload and done!
              </p>
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default Testimonials;
