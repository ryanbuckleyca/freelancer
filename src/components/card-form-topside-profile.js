import React, {Component} from 'react';
import './cards.scss';

class CardFormTopsideProfile extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    uploadPreset: 'cheque-mate'
   }, (err, res) => {
    if (!err && res && res.event === "success") {
      this.props.changeHandler({target:
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
      <div className="card-form-img">
        <div className="card-form-avatar">
          <img src={this.props.picture} alt="avatar" />
          <a href="#" className="btn btn-dark btn-sm" onClick={this.cloudinaryWidget}>edit</a>
        </div>
        <button id="card-form-btn-side" className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update profile
        </button>
      </div>
    );
  }
}

export default CardFormTopsideProfile;

