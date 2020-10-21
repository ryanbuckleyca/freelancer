import React, { Component } from 'react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import CardFormTopsideProfile from '../components/card-form-topside-profile';
import CardFormFieldsPerson from '../components/card-form-fields-person';
import social_media from '../images/social_media.svg';

class Client extends Component {

  render() {
    return(
      <div className="profile">
        <hr className="spacer" />
        <CardTitle
          img={social_media}
          thisClass="card-md"
          title={<span>Stay Informed. <br />Know your clients.</span>}
          text="Check this ongoing list for clients who may be known for late or unpaid invoices."
        />

        <hr className="spacer" />

        <CardForm table='clients' id={this.props.match.params.id}>
          <CardFormTopsideProfile />
          <CardFormFieldsPerson />
        </CardForm>

        <hr className="spacer" />
      </div>
    );
  }
}

export default Client;
