import React, {Component} from 'react';
import './cards.scss';

class CardFormTopsideProfile extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    uploadPreset: 'cheque-mate-avatars',
    resource_type: 'image',
    clientAllowedFormats: ['png','gif','jpeg','pdf','docx','doc','odt','jpg'],
    maxFileSize: 5000000,
    detection: 'adv_face',
    styles: {
      palette: {
        window: '#FEFDF7',
        windowBorder: "#90A0B3",
        tabIcon: "#0E2F5A",
        menuIcons: '#0B2027',
        textDark: '#0B2027',
        textLight: "#FFFFFF",
        link:  '#40798C',
        action:  '#70A9A1',
        inactiveTabIcon: "#0E2F5A",
        error: '#ff789d',
        inProgress: '#40798C',
        complete: '#70A9A1',
        sourceBg: "#E4EBF1"
      },
      fonts: {
          "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700",
      }
    }
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
          <img className="avatar-lg" src={this.props.picture} alt="avatar" />
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

