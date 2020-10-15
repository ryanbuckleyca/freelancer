import React, {Component} from 'react';
import late from '../images/late.svg'
import robber from '../images/robber.svg'

class CardClient extends Component {
  render() {
    return(
      <div className="card-client">
        <div className="card-client-avatar">
          <img src={this.props.client.picture} alt="client avatar" />
        </div>
        <div className="card-client-info">
            <strong>{this.props.client.name}</strong><br />
            <small>{this.props.client.city}, {this.props.client.state}</small>
        </div>
        <div className="card-client-tags">
          <div><img src={robber} alt="robber" /><small>2/10 late</small></div>
          <div><img src={late} alt="hour-glass" /><small>48 weeks</small></div>
        </div>
        <div className="card-client-description">
        <p>
          This client currently has <strong>2</strong> outstanding invoices of <strong>10</strong> records in total with an average of <strong>48 weeks</strong> overdue.
        </p>
        </div>
        <div className="card-client-footer">
          <p><a href={'/clients/' + this.props.client.id}>details ⟶</a></p>
        </div>
      </div>
    )
  }
}

export default CardClient;
