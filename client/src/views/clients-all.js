import React, {Component} from 'react';
import SectionHeader from '../components/section-header';
import CardTitle from '../components/card-title';
import CardClient from '../components/card-client';
import social_media from '../images/social_media.svg';
import callAPI from '../scripts/callAPI';

class ClientsAll extends Component {
  state = {clients: []};

  async componentDidMount() {
    const clients = await callAPI('/api/clients/')
    console.log('result is: ', clients)
    this.setState({clients: clients});
  }

  render() {
    console.log('clients api call is: ', this.state)
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
          {this.state.clients.map(client => {
            return <CardClient
              key={client.id}
              avatar="https://res.cloudinary.com/ryanbuckleyca/image/upload/c_scale,h_60,w_60/v1600109993/user_bgu0at.jpg"
              name={client.name}
              city={client.city}
              state={client.state}
            />
          })}
        </div>

        <hr className="spacer" />
      </div>
    );
  }
}

export default ClientsAll;
