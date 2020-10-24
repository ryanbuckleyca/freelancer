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
          <div className="profile-buttons">
          <a className="btn btn-secondary" onClick={this.cloudinaryWidget}>edit image</a>
          <a className="btn btn-secondary">payment info</a>
          <a className="btn btn-secondary">my clients</a>
          <a className="btn btn-danger">delete account</a>
          </div>
        </div>
        <button id="card-form-btn-side" className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update profile
        </button>
      </div>
    );
  }
}

export default CardFormTopsideProfile;

