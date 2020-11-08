import React, {Component} from 'react';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ContractsAll extends Component {
  state = { contracts: [] };

  async componentDidMount() {
    const contracts = await callAPI('/api/contracts/')
    this.setState({ contracts: contracts });
  }

  contract(contract) {
    return(
      <div key={contract.id}>
        <a href={contract.id}>
          Contract#: {contract.id}
        </a><br />
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
          { contracts.map(contract => this.contract(contract)) }
        </div>

        <hr className="spacer" />
      </div>
    );
  }
}

export default ContractsAll;
