import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import NotFound from '../components/not-found';
import Loading from '../components/loading';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  componentDidMount() {
    const user_id = this.props.auth0.user['http:id']
    let user = this.props.match.url === '/clients/mine' ? `user/${user_id}` : ''
    callAPI('/api/clients/' + user)
      .then(clients => this.setState({clients: clients}))
  }

  render() {
    if(!this.state)
      return <Loading type="clients" />

    if(this.state && this.state.clients.error)
      return <NotFound type="clients" />

    let clients = this.state.clients
    let mine = this.props.match.path === '/clients/mine'
    let button = mine
      ? <Link to="/clients/" className="btn btn-outline">show all</Link>
      : <Link to="/clients/mine" className="btn btn-outline">only mine</Link>
    let title = mine
      ? 'My clients'
      : 'Clients'
    let text = mine
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
            <Link to="/clients/new" className="btn btn-outline">+ add new</Link>
            {button}
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
