import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../../scripts/callAPI';
import dateToStr from '../../scripts/dateToStr';
import requiredFieldsValid from '../../scripts/requiredFieldsValid';
import flashAlert from '../../scripts/flashAlert';
import '../cards/cards.scss';
import './form.scss';


class CardForm extends Component {

  // TODO: delete auth0 user instance on "delete"
  // TODO: handle callAPI returns of null

  loadRecordState(table, id='') {
    const user_id = 1; // TODO: get this from auth0 props
    callAPI(`/api/${table}/${id}`)
    .then(result => {
      if (!result)
        window.location.href = `../${table}`
      if (result && result.due_date)
        result.due_date = dateToStr(result.due_date);
      this.setState({ ...result, user_id: user_id })
    })
    .catch(err => console.log('problem with loading record: ', err))
  }

  saveFormToDB() {
    console.log('state to save to db is: ', this.state)
    const url = `/api/${this.props.table}/${this.props.id || ''}`
    const method = this.props.id ? 'PUT' : 'POST'
    const body = this.state

    callAPI(url, method, body)
      .then(res => {
        flashAlert('success', `${this.props.table} saved`);
        return res
      }).catch(err => flashAlert('warning', `card-form saveFormToDB err: ${err}`))
  }

  deleteFromDB = () => {
    console.log('deleteFromDB called')
    const confirm = window.confirm('Are you sure you want to delete this record?')
    if(!confirm)
      return

    const url = `/api/${this.props.table}/${this.props.id}`
    const method = 'DELETE'

    callAPI(url, method)
      .then(res => {
        // TODO: this still gets called when there are errors
        flashAlert('success', `record ${this.props.id} from ${this.props.table} deleted`);
        return res
      })
      .catch(err => flashAlert('warning', `form deleteFromDB err: ${err}`))
      .finally(window.location.href = `../${this.props.table}`)
  }

  handleSubmit = async (e) => {
    console.log('handleSubmit called')
    e.preventDefault()
    requiredFieldsValid()
    ? this.saveFormToDB()
    : flashAlert('warning', 'Fields null or undefined')
  }

  changeHandler = (e) => {
    console.log('change handler called in card-form with event: ', e)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, console.log('new state is: ', this.state))

  }

  passProps = (props) => {
    console.log('passProps called with: ', props)
    this.setState({ ...props })
  }

  componentDidMount() {
    const { table, id } = this.props
      this.loadRecordState(table, id || 'new');
  }

  render() {
    if(!this.props.table)
      return "Loading..."

    return(
      <form className="form-wrapper">
        <div className='card-form'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            handleDelete: this.deleteFromDB,
            passProps: this.passProps,
            auth0_id: this.props.auth0.user.sub,
            ...this.state
          })}

          {/* CardFormFields */}
          {React.cloneElement(this.props.children[1], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
            passProps: this.passProps,
            auth0_id: this.props.auth0.user.sub,
            ...this.state
          })}
        </div>
      </form>
    );
  }
}

export default withAuth0(CardForm);
