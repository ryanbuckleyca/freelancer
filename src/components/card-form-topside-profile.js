import React, {Component} from 'react';
import './cards.scss';
import Cloudinary from './cloudinary';

class CardFormTopsideProfile extends Component {
  render() {
    return(
      <div className="card-form-img">
        <div className="card-form-avatar">
          <img className="avatar-lg" src={this.props.picture} alt="avatar" />
          <div className="profile-buttons">
          <Cloudinary text="edit image" options="avatar" handler={this.props.passProps} />
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

