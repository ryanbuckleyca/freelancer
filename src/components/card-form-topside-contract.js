import React, {Component} from 'react';
import './cards.scss';
import late from '../images/late.svg'
import robber from '../images/robber.svg'

class CardFormTopsideContract extends Component {
  cloudinaryUpload = window.cloudinary.createUploadWidget({
    cloudName: 'ryanbuckleyca',
    uploadPreset: 'cheque-mate-invoices',
    sources: ['local', 'url', 'dropbox', 'google_drive'],
    resource_type: 'raw',
    clientAllowedFormats: ['png','gif','jpeg','pdf','docx','doc','odt','jpg'],
    maxFileSize: 5000000,
    styles: {
      palette: {
        window: '#FEFDF7',
        windowBorder: "#90A0B3",
        tabIcon: "#0E2F5A",
        menuIcons: '#0B2027',
        textDark: '#0B2027',
        textLight: "#FFFFFF",
        link:  '#40798C',
        action:  '#70A9A1',
        inactiveTabIcon: "#0E2F5A",
        error: '#ff789d',
        inProgress: '#40798C',
        complete: '#70A9A1',
        sourceBg: "#E4EBF1"
      },
      fonts: {
          "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700",
      }
    }
   }, (err, res) => {
    if (!err && res && res.event === "success") {
      console.log('res from cloudinary upload: ', res)
      this.props.passProps({
        invoice: 'https://res.cloudinary.com/ryanbuckleyca/files/' + res.info.public_id
      })
    } else if (err) { console.log('cloudinary error: ', err) }
  })

  cloudinaryWidget = (e) => {
    e.preventDefault();
    this.cloudinaryUpload.open();
  }

  render() {
    const invoice =
      this.props.invoice
      ?
      <embed src={this.props.invoice} width="200" height="200" alt="invoice"
        pluginspage="http://www.adobe.com/products/acrobat/readstep2.html" />
      :
      <div style={{width: 200, height: 200, textAlign: 'center', lineHeight: '200px',
        verticalAlign: 'middle', background: '#ececec', borderRadius: '15px'}}>
        upload an invoice
      </div>

    return(
      <div className="card-form-img">
        <div className="card-form-avatar">
          {invoice} <br />
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

