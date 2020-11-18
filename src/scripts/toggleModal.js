// TODO: rewrite to use State instead of modifying dom
const toggleModal = (force) => {
    const modal = document.getElementById('modal');
    if(modal.style.display === 'flex' || force === 'none') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex';
    }
}

export default toggleModal;
