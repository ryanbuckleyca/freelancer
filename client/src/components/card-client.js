import React, {Component} from 'react';
import late from '../images/late.svg'
import robber from '../images/robber.svg'

class CardClient extends Component {
  render() {
    return(
      <div className="card-client">
        <div className="card-client-avatar">
          <img src={this.props.avatar} alt="client avatar" />
        </div>
        <div className="card-client-info">
            <strong>{this.props.name}</strong><br />
            <small>{this.props.city}, {this.props.state}</small>
        </div>
        <div className="card-client-tags">
          <div><img src={robber} alt="robber" /><small>2/10 late</small></div>
          <div><img src={late} alt="hour-glass" /><small>48 weeks</small></div>
        </div>
        <div className="card-client-description">
        <p>
          This client currently has <strong>2</strong> outstanding invoices with an average of <strong>48 weeks</strong> overdue. They have a total of <strong>10</strong> late or unpaid invoices in total.
        </p>
        </div>
        <div className="card-client-footer">
          <p>details --></p>
        </div>
      </div>
    )
  }
}

export default CardClient;
