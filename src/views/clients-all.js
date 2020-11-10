import React, {Component} from 'react';
import CardTitle from '../components/cards/card-title';
import CardClient from '../components/cards/card-client';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  state = {clients: []};

  async componentDidMount() {
    console.log('this.props.match.url is ', this.props.match.url)
    // TODO: replace with user_id from auth0 props
    let user = this.props.match.url === '/clients/mine' ? `user/1` : null
    const clients = await callAPI('/api/clients/' + user)
    this.setState({clients: clients});
  }

  render() {
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

export default ClientsAll;
