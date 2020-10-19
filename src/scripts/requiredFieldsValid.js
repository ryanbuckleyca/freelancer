const requiredFieldsValid = () => {
  console.log('reqFieldsValid called')
  const formInputs = [...document.getElementsByTagName("input")]
  console.log('formInputs = ', formInputs)
  const reqFields = formInputs.filter(el => el.required)
  console.log('reqFields = ', reqFields)
  const allValid = reqFields.map(el => {
    if(el.value.length > 0) {
      el.classList.remove('invalid');
      return true
    } else {
      el.classList.add('invalid');
      return false
    }
  })
  return allValid.every(Boolean)
}

module.exports = requiredFieldsValid;
