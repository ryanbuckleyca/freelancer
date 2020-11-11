import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardForm from '../components/forms';
import CardFormTopSideContract from '../components/forms/contract-topside';
import CardFormFieldsContract from '../components/forms/contract-main';

class Contract extends Component {
  render() {
    return(
      <div className='profile'>
        <hr className='spacer' />
        <CardForm table='contracts' id={this.props.match.params.id}>
          <CardFormTopSideContract />
          <CardFormFieldsContract />
        </CardForm>
        <hr className='spacer' />
      </div>
    );
  }
}

export default withAuth0(Contract);
