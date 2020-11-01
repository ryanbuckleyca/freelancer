import React, {Component} from 'react';
import '../cards.scss';
import Cloudinary from '../../cloudinary';

class CardFormTopsideProfile extends Component {
  render() {
    return(
      <div className="card-form-img">
        <div className="card-form-avatar">
          <div className="profile-image">
            <img className="avatar-lg" src={this.props.picture} alt="avatar" />
          </div>
          <div className="profile-buttons left">
            <a href="/clients/" className="btn btn-secondary">my clients</a>
            <a href="/contracts/" className="btn btn-secondary">my contracts</a>
          </div>
          <div className="profile-buttons right">
            <Cloudinary text="edit image" options="avatar" handler={this.props.passProps} />
            <a className="btn btn-secondary">payment info</a>
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

export default CardFormTopsideProfile;

