const dateToStr = (dateObj) => {
  const addZ = n => n<10 ? '0'+n : n
  const date = new Date(dateObj)

  const yyyy = date.getFullYear()
  const mm = addZ(date.getMonth()+1)
  const dd = addZ(date.getDate())
  
  return yyyy +'-'+ mm +'-'+ dd;
}

export default dateToStr
