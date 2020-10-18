  const cloudinaryUpload = window.cloudinary.createUploadWidget({
     cloudName: 'ryanbuckleyca',
     cropping: true,
     showSkipCropButton: false,
     croppingAspectRatio: 1,
     uploadPreset: 'cheque-mate'
   }, (error, result) => {
     if (!error && result && result.event === "success") {
       console.log('cloudinary upload result: ', result)
       return result;
     }
  })

  const cloudinaryWidget = (e) => {
    cloudinaryUpload.open();
  }

  module.exports = cloudinaryWidget;
