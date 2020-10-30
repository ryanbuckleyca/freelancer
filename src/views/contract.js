import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardForm from '../components/cards/card-form/';
import CardFormTopSideContract from '../components/cards/card-form/contract-topside';
import CardFormFieldsContract from '../components/cards/card-form/contract-fields';

class Contract extends Component {
  componentDidMount() {
    console.log("||||| contract view mounted with props: ", this.props)
  }
  render() {
    console.log("||||| contract view rendered with props: ", this.props)
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
