const background = {
  notice: '#40798C',
  success: '#70A9A1',
  warning: '#ff789d',
  subtle: '#CFD7C7'
}

const flashAlert = (type, message) => {
  let alert = document.getElementById('alert');
  let alertText = document.getElementById('alert-text');

  alertText.innerText = message
  alert.style.transition = 'bottom 1s ease 0s'
  alert.style.background = background[type]
  console.log(alert.style.transition)
  alert.style.bottom = 0;
  setTimeout(() => alert.style.transition = 'bottom 5s ease 0s', 1000)
  setTimeout(() => alert.style.bottom = '-100%', 5000)
}

export default flashAlert;
