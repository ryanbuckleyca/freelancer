import React, {Component} from 'react';
import './cards.scss';

class CardFormProfile extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    uploadPreset: 'cheque-mate'
   }, (err, res) => {
    if (!err && res && res.event === "success") {
      this.props.handler({target:
        { name: 'picture', value: res.info.url }
      })
    }
  })

  cloudinaryWidget = (e) => {
    e.preventDefault();
    this.cloudinaryUpload.open();
  }

  render() {
    return(
      <div className="card-slider-img">
        <div className="card-slider-avatar">
          <img src={this.props.picture} alt="avatar" />
          <a href="#" className="btn btn-dark btn-sm" onClick={this.cloudinaryWidget}>edit</a>
        </div>
        <button onClick={this.props.handleSubmit} className="btn btn-primary d-none d-md-block">
          Update profile
        </button>
      </div>
    );
  }
}

export default CardFormProfile;

