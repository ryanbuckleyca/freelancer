import React, {Component} from 'react';
import './cards.scss';
import late from '../images/late.svg'
import robber from '../images/robber.svg'

class CardFormTopsideContract extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    uploadPreset: 'cheque-mate-invoices',
    resource_type: 'raw',
    ocr: 'adv_ocr'
   }, (err, res) => {
    if (!err && res && res.event === "success") {
      console.log('res from cloudinary upload: ', res)
      this.props.changeHandler({target:
        { name: 'invoice', value: res.info.url }
      })
    } else {
      console.log('cloudinary error: ', err)
    }
  })

  cloudinaryWidget = (e) => {
    e.preventDefault();
    this.cloudinaryUpload.open();
  }

  render() {
    return(
      <div className="card-form-img">
        <div className="card-form-avatar">
        <embed src={this.props.invoice} width="600" height="500" alt="invoice" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html" />
          <div className="profile-buttons">
          <a className="btn btn-secondary" onClick={this.cloudinaryWidget}>upload invoice</a>
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

