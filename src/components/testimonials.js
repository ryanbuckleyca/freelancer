import React, {Component} from 'react';
import './testimonials.scss';
import './cards/cards.scss';

class Testimonials extends Component {
  componentDidMount() {
    let nextBtn = document.querySelector(".carousel-control-next"),
        prevBtn = document.querySelector(".carousel-control-prev"),
        slide = document.querySelectorAll(".card-testimony"),
        i = 0;

    const slider_callback = () => nextBtn.click();

    prevBtn.onclick = (event) => {
        event.preventDefault();
        slide[i].classList.remove("active");
        i--;
        if (i < 0) {
            i = slide.length - 1;
        }
        slide[i].classList.add("active");
    };
    nextBtn.onclick = (event) => {
        event.preventDefault();
        slide[i].classList.remove("active");
        i++;
        if (i >= slide.length) {
            i = 0;
        }
        slide[i].classList.add("active");
    };

    window.setInterval(slider_callback, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.slider_callback);
  }

  render() {
    return(
      <div class="carousel card-testimonials card-lg">
        <span className="card-testimonials-head">
          <h2 className="m-0">Testimonials</h2>
          <div>
            <a className="carousel-control-prev" href="#demo">
              &lt;
            </a>
            <a className="carousel-control-next" href="#demo">
              &gt;
            </a>
          </div>
        </span>
        
        <div class="testimonials">
          <div className="card-testimony active">
            <div className="card-testimony-user">
              <img src="http://kitt.lewagon.com/placeholder/users/ryanbuckleyca"
                className="avatar" alt="user avatar" />
              <span>
                Ryan Buckley<br />Web Developer
              </span>
            </div>
            <p>
              Cheque Mate helped me get my hard-earned money while allowing me to focus on new projects. I'd highly recommend this effortless app to any freelancer!
            </p>
          </div>
          <div className="card-testimony">
            <div className="card-testimony-user">
                <img src="https://randomuser.me/api/portraits/men/15.jpg"
                  className="avatar" alt="user avatar" />
              <span>
                Ray Newman<br />Designer
              </span>
            </div>
            <p>
              I signed up to Cheque Mate because I was tired of being ripped off by new clients, so now I check before starting any new project to see if they're listed.
            </p>
          </div>

          <div className="card-testimony">
            <div className="card-testimony-user">
              <img src="https://randomuser.me/api/portraits/men/39.jpg"
                className="avatar" alt="user avatar" />
              <span>
                Hassan Raffi<br />Freelance Editor
              </span>
            </div>
            <p>
              I love that I don't have to keep checking which of my invoice have been paid and sending reminders to clients. With Cheque Mate I just upload and done!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Testimonials;
