import React, {Component} from 'react';
import '../cards/cards.scss';
import late from '../../images/late.svg'
import robber from '../../images/robber.svg'
import Cloudinary from './cloudinary';

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
          <div className="profile-image">
            <img className="avatar-lg" src={this.props.picture} alt="avatar" />
          </div>
          <div className="profile-buttons left">
            <Cloudinary text="edit image" options="avatar" handler={this.props.passProps} />
            <a className="btn btn-secondary" onClick={this.cloudinaryWidget}>add client</a>
          </div>
          <div className="card-client-tags right">
            <div><img src={robber} height="20px" alt="robber" /><small>2/10 late</small></div>
            <div><img src={late} alt="hour-glass" /><small>48 weeks</small></div>
          </div>
        </div>
        <div id="card-form-btn-side">
          <a className="btn btn-danger">delete account</a><br />
          <a className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update profile
          </a>
        </div>
      </div>
    );
  }
}

export default CardFormTopsideClient;
