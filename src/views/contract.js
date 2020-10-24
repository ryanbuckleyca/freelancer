import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/card-title';
import CardForm from '../components/card-form';
import CardFormTopSideContract from '../components/card-form-topside-contract';
import CardFormFieldsContract from '../components/card-form-fields-contract';
import contracts from '../images/finance_analytics_.svg';

class Contract extends Component {

  render() {
    return(
      <div className='profile'>
        <hr className='spacer' />
        <CardTitle
          img={contracts}
          title='Contract time!!'
          thisClass='card-md'
          text='You can upload invoices here to automatically generate new contracts, or manually enter the information below.'
        />
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
