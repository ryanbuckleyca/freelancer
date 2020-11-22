import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import late from '../../images/late.svg'
import robber from '../../images/robber.svg'

class CardClient extends Component {
  render() {
    return(
      <div className="card-client">
        <div className="card-client-personal">
          <div className="card-client-avatar">
            <img src={this.props.client.picture} alt="client avatar" />
          </div>
          <div className="card-client-info">
              <strong>{this.props.client.name}</strong><br />
              <small>{this.props.client.city}, {this.props.client.state}</small>
          </div>
        </div>
        <div className="card-client-tags">
          <div><img src={robber} alt="robber" /><small>2/10 late</small></div>
          <div><img src={late} alt="hour-glass" /><small>48 weeks</small></div>
        </div>
        <div className="card-client-description">
          This client currently has <strong>2</strong> outstanding invoices of <strong>10</strong> records in total with an average of <strong>48 weeks</strong> overdue.
        </div>
        <div className="card-client-footer">
          <p><Link to={'/clients/' + this.props.client.id}>details ⟶</Link></p>
        </div>
      </div>
    )
  }
}

export default CardClient;
