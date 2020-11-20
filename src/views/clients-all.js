import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import NotFound from '../components/not-found';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  state = {clients: []};

  async componentDidMount() {
    console.log(this.props)
    const user_id = this.props.auth0.user['http:id']
    let user = this.props.match.url === '/clients/mine' ? `user/${user_id}` : ''
    const clients = await callAPI('/api/clients/' + user)
    clients && this.setState({clients: clients})
  }

  render() {
    if(this.state.clients.length < 1)
          return <NotFound type="clients" />

    let clients = this.state.clients
    let title = this.props.match.path === '/clients/mine'
      ? 'My clients'
      : 'Clients'
    let text = this.props.match.path === '/clients/mine'
      ? "Below are clients you have create or added to your account."
      : "Check this ongoing list for clients who may be known for late or unpaid invoices."

    return (
      <div>
        <hr className="spacer" />
        <CardTitle
          img={social_media}
          thisClass="card-md"
          title={<span>{title}</span>}
          text={
            <div>{text}<br /><br />
            <a href="/clients/new" className="btn btn-outline">+ add new</a>
            <a href="/clients/mine" className="btn btn-outline">only mine</a>
            </div>
          }
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

export default withAuth0(ClientsAll);
