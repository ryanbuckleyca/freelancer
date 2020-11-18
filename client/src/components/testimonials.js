import React, {Component} from 'react';
import './testimonials.scss';
import './cards/cards.scss';

class Testimonials extends Component {

  intervalID = 0;

  advSlide(dir) {
    const slide = document.querySelector('.card-testimony.active')
    const nextSlide = slide.nextSibling || slide.parentNode.firstChild
    const prevSlide = slide.previousSibling || slide.parentNode.lastChild
    slide.classList.remove('active');
    dir > 0 ? nextSlide.classList.add('active') : prevSlide.classList.add('active')
  }


  componentDidMount() {
    const nextBtn = document.querySelector('.carousel-control-next')
    const prevBtn = document.querySelector('.carousel-control-prev')
    prevBtn.onclick = () => this.advSlide(-1)
    nextBtn.onclick = () => this.advSlide(1)

    this.intervalID = setInterval(this.advSlide, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return(
      <div className="carousel card-testimonials card-lg">
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

        <div className="testimonials">
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
