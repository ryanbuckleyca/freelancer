import React, {Component} from 'react';
import CardTitle from '../components/card-title';
import CardClient from '../components/card-client';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  state = {clients: []};

  async componentDidMount() {
    const clients = await callAPI('/api/clients/')
    this.setState({clients: clients});
  }

  render() {
    let clients = this.state.clients
    return (
      <div>

        <hr className="spacer" />
        <CardTitle
          img={social_media}
          thisClass="card-md"
          title={<span>Stay Informed. <br />Know your clients.</span>}
          text="Check this ongoing list for clients who may be known for late or unpaid invoices."
        />

        <hr className="spacer" />
        <div className="card-client-grid">
          {clients.map(client => {
            return <CardClient key={client.id} client={client} />
          })}
        </div>

        <hr className="spacer" />
      </div>
    );
  }
}

export default ClientsAll;
