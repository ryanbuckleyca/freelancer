import React, {Component} from 'react';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import NotFound from '../components/not-found';
import Loading from '../components/loading';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

class ContractsAll extends Component {
  componentDidMount() {
    callAPI('/api/contracts/')
      .then(contracts => this.setState({ contracts: contracts }));
  }

  displayContract(contract) {
    const id = contract.id
    return(
      <div key={id}>
        <Link to={'/contracts/'+id}>Contract#: {id}</Link><br />
        {contract.paid ? "paid" : "UNPAID"}<br />
        Client: {contract.Client.name}<br />
        Due: {contract.due_date}<br />
        ID: {contract.identifier}<br />
        Amount: {contract.amount}<br />
        Reminders: {contract.Reminders.map(x => x.type)}
      </div>
    )
  }

  render() {
    if(!this.state)
      return <Loading type="contracts" />

    if(this.state.contracts.length < 1)
      return <NotFound type="contracts" />

    let contracts = this.state.contracts
    return (
      <div>
        <hr className="spacer" />
        <CardTitle
          img={social_media}
          thisClass="card-md"
          title={<span>Contracts</span>}
          text="Here is your list of contracts."
        />
        <hr className="spacer" />
        <div className="card-client-grid">
          { contracts.map(contract => this.displayContract(contract)) }
        </div>

        <hr className="spacer" />
      </div>
    );
  }
}

export default withAuth0(ContractsAll);
