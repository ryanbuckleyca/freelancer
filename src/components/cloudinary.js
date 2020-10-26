import React, {Component} from 'react';

class Cloudinary extends Component {
  required = 
  {
    cloudName: 'ryanbuckleyca',
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
  }
  avatarOptions =  
  {
    uploadPreset: 'cheque-mate-avatars',
    clientAllowedFormats: ['png','gif','jpeg','jpg'],
    resource_type: 'image',
    showSkipCropButton: false,
    cropping: true,
    croppingAspectRatio: 1,
    detection: 'adv_face'
  }
  pdfOptions =
  {
    uploadPreset: 'cheque-mate-invoices',
    clientAllowedFormats: ['png','gif','jpeg','pdf','docx','doc','odt','jpg'],
    resource_type: 'raw',
    sources: ['local', 'url', 'dropbox', 'google_drive']
  }

  render() {
    const options = this.props.options === 'avatar' ? this.avatarOptions : this.pdfOptions
    const cloudinaryUpload = window.cloudinary.createUploadWidget({
      ...this.required, ...options
     }, (err, res) => {
      if (!err && res && res.event === "success") {
        this.props.handler({picture: res.info.url})
      }
    })
    
    const cloudinaryWidget = (e) => {
      e.preventDefault();
      cloudinaryUpload.open();
    }

    return (
      <a className="btn btn-secondary" onClick={cloudinaryWidget}>{this.props.text}</a>
    )
  }
}

export default Cloudinary;