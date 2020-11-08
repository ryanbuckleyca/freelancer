import React, {Component} from 'react';
import '../cards/cards.scss';
import Cloudinary from './cloudinary';

class CardFormTopsideContract extends Component {
  render() {
    const invoice =
      this.props.invoice
      ? <embed src={this.props.invoice} width="200" height="200" alt="invoice"
          pluginspage="http://www.adobe.com/products/acrobat/readstep2.html" />
      : <div style={{width: 200, height: 200, textAlign: 'center', lineHeight: '200px',
          verticalAlign: 'middle', background: '#ececec', borderRadius: '15px'}}>
          upload an invoice
        </div>

    return(
      <div className="card-form-img">
        <div className="card-form-avatar">
          {invoice} <br />
          <div className="profile-buttons">
            <Cloudinary text="upload invoice" options="invoice" handler={this.props.passProps} />
            <a className="btn btn-danger">delete contract</a>
            <br />
          </div>
        </div>
        <button id="card-form-btn-side" className="btn btn-primary" onClick={this.props.handleSubmit}>
          Update contract
        </button>
      </div>
    );
  }
}

export default CardFormTopsideContract;
