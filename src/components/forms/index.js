import React, {Component} from 'react';
import NotFound from '../not-found';
import Loading from '../loading';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../../scripts/callAPI';
import dateToStr from '../../scripts/dateToStr';
import requiredFieldsValid from '../../scripts/requiredFieldsValid';
import flashAlert from '../../scripts/flashAlert';
import '../cards/cards.scss';
import './form.scss';


class CardForm extends Component {
  // Makes GET call to API based on URL
  // Loads a form with existing record
  // or creates a new one

  // TODO: delete auth0 user instance on "delete"
  // TODO: handle callAPI returns of null

  saveFormToDB() {
    console.log('state to save to db is: ', this.state)
    const url = `/api/${this.props.table}/${this.props.id || ''}`
    const method = this.props.id ? 'PUT' : 'POST'
    const body = this.state

    callAPI(url, method, body)
      .then(res => {
        console.log('call flashAlert')
        flashAlert('success', `${this.props.table} saved`);
        return res
      })
      .catch(err => flashAlert('warning', `card-form saveFormToDB err: ${err}`))
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
      .finally(this.props.redirect(`../${this.props.table}`))
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

  parseData = (data) => {
    // for fields such as date
    if (data.due_date) data.due_date = dateToStr(data.due_date);
    return data
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { table, id } = this.props
    callAPI(`/api/${table}/${id || 'new'}`)
      .then(res => {
        console.log('result is: ', res)
        if(!res) throw('no results')
        this.setState({ ...this.parseData(res), id: id })
      })
      .catch(err => {
        console.log('problem with loading record: ', err)
        this.setState({error: err, id: id })
      })
  }

  render() {
    if(!this.props.table || !this.state)
      return <Loading type={this.props.table} />

    if(this.state && this.state.error)
      return <NotFound type={this.props.table} />

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
