import React, { Component } from 'react';
import CardForm from '../components/card-form';
import CardFormTopsideClient from '../components/card-form-topside-client';
import CardFormFieldsPerson from '../components/card-form-fields-person';

class Client extends Component {

  render() {
    return(
      <div className="profile">
        <hr className="spacer" />

        <CardForm table='clients' id={this.props.match.params.id}>
          <CardFormTopsideClient />
          <CardFormFieldsPerson />
        </CardForm>

        <hr className="spacer" />
      </div>
    );
  }
}

export default Client;
