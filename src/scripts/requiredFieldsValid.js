// TODO: combine with validation scripts in modal
// and link to this script from modals instead
const requiredFieldsValid = () => {
  const formInputs = [...document.getElementsByTagName("input")]
  console.log('formInputs are ', formInputs)
  const reqFields = formInputs.filter(el => el.required)

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

export default requiredFieldsValid;
