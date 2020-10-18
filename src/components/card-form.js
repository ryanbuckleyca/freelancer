import React, {Component} from 'react';
import callAPI from '../scripts/callAPI';
import './cards.scss';

class CardForm extends Component {

  constructor(props) {
    super(props);
    this.state = props.fields
  }

  async componentDidMount() {
    console.log('card-form.js did mount with props: ', this.props)

    if(this.props.id) {
      try {
        const result = await callAPI(`/api/${this.props.table}/${this.props.id}`)
        this.setState(result)
        console.log('set state by id: ', this.state)
      } catch(err) {
        this.setState(err)
      }
    } else {
      console.log('create new record')
    }
  }

  // Update/create client profile
  handleSubmit = async (e) => {
    e.preventDefault();
    const formInputs = Array.from(document.getElementsByTagName("input"))
    const reqFields = [...formInputs].filter(el => el.required).map(el => el.value.length > 0)
    try {
      if (reqFields.every(Boolean)) {
        const saved = await callAPI(
          `/api/${this.props.table}/${this.state.id || ''}`,
          this.state.id ? 'PUT' : 'POST',
          this.state
        )
        if(!this.state.id) {
          (window.location.href = `/${this.props.table}/${saved.id}`)
        }
        console.log(`${this.props.table} saved`)
      }
      else {
        console.log('Fields null or undefined')
        // TODO: render form to show errors
      }
    }
    catch(err) { console.log(err) }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  render() {
    console.log('this.props from cardform: ', this.props)

    if (this.props.table && !this.state.id)
      return (
        <div className="profile">
          <hr className="spacer" />
          <div style={{textAlign: 'center', height: '50vh', lineHeight: '50vh'}}>
          no user found
          </div>
        </div>
      )

    return(
      <form className="form-wrapper">
        <div className='card-slider'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            ...this.state
          })}

          {/* CardFormFields */}
          {React.cloneElement(this.props.children[1], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            ...this.state
          })}
        </div>
      </form>
    );
  }
}

export default CardForm;
