const background = {
  notice: '#40798C',
  success: '#70A9A1',
  warning: '#ff789d',
  subtle: '#CFD7C7'
}

const flashAlert = (type, message) => {
    const alert = document.getElementById('alert');
    const alertText = document.getElementById('alert-text');

    console.log('alert is ', alert)
    console.log('alertText is ', alertText)

    alertText.innerText = message
    alert.style.background = background[type]

    if(alert.style.bottom === '-100%') {
      alert.style.bottom = '0';
      setTimeout(() => alert.style.bottom = 0, 1000)
      setTimeout(() => alert.style.bottom = '-100%', 3000)
    } else {
      alert.style.bottom = '-100%';
    }
}

export default flashAlert;
