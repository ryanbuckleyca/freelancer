import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import CardFormProfile from '../components/card-form-profile';
import CardFormPersonFields from '../components/card-form-person-fields';
import social_media from '../images/social_media.svg';

class Client extends Component {

  render() {
    const fields = {
      id:'', name:'',email:'',number:'',street1:'',street2:'',city:'',props:'',post_zip:'',country:''
    }
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

        <CardForm table='clients' id={this.props.match.params.id} fields={fields}>
          <CardFormProfile />
          <CardFormPersonFields />
        </CardForm>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(Client);
