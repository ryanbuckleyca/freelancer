import React, {Component} from 'react';
import './cards.scss';
import late from '../images/late.svg'
import robber from '../images/robber.svg'


class CardFormTopsideClient extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    cropping: true,
    showSkipCropButton: false,
    croppingAspectRatio: 1,
    uploadPreset: 'cheque-mate-avatars'
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
          <a className="btn btn-danger">delete client</a>
          <div className="card-client-tags">
            <div><img src={robber} height="20px" alt="robber" /><small>2/10 late</small></div>
            <div><img src={late} alt="hour-glass" /><small>48 weeks</small></div>
          </div>
          <br />
          </div>
        </div>
        <button id="card-form-btn-side" className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update profile
        </button>
      </div>
    );
  }
}

export default CardFormTopsideClient;

