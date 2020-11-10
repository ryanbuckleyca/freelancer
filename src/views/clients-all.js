import React, {Component} from 'react';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  state = {clients: []};

  async componentDidMount() {
    let url = '/api/clients'
    let title = "Clients"

    if (this.props.match.path === '/clients/mine') {
      // TODO: change this to this.props.auth0.user.user_metadata.id
      url += '/user/1'
      title = "My " + title
    }
    const clients = await callAPI(url)
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
          title={<span>Clients</span>}
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
