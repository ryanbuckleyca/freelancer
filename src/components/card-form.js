import React, {Component} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import callAPI from '../scripts/callAPI';
import requiredFieldsValid from '../scripts/requiredFieldsValid';
import './cards.scss';

class CardForm extends Component {
  state = {}
  // renders form based on url where /table/id
  // gets called from views: Profile, Client, and Contract
  // takes two children components: (1) a form and (2) a top/side
  // state gets updated by children using changeHandler and passProps
  // this state gets sent to DB for new/update records
  // this state gets passed to children as props

  loadRecordState(props) {
    // called when props are received from parent
    callAPI(`/api/${props.table}/${props.id}`)
    .then(result => {
      let date = new Date(result.due_date)
      result.due_date = (date.getFullYear() + '-'
                      + (date.getMonth() + 1) + '-'
                      + date.getDate());
      this.setState(result)
    })
  }

  saveFormToDB() {
    callAPI(
      `/api/${this.props.table}/${this.props.id || ''}`,
      this.props.id ? 'PUT' : 'POST',
      this.state
    ).then(res => {
      console.log(`${this.props.table} saved`)
      return res
    }).catch(err => console.log('card-form saveFormToDB err: ', err))
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (requiredFieldsValid()) {
      const saved =  await this.saveFormToDB();
      console.log('database result: ', saved)
      // redirect to new record if not updating
      // !this.state.id && (window.location.href = `/${this.props.table}/${saved.id}`)
    }
    else {
      // TODO: render form to show errors
      console.log('Fields null or undefined')
    }
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  passProps = (props) => {
    this.setState({ ...props })
  }

  componentDidMount() {
    // if record id prop has loaded from parent
    // then get that record
    this.props.id && this.loadRecordState(this.props);
  }

  render() {
    if(!this.props.id)
      return "Loading..."

    return(
      <form className="form-wrapper">
        <div className='card-form'>
          {/* CardFormTopSide */}
          {React.cloneElement(this.props.children[0], {
            changeHandler: this.changeHandler,
            handleSubmit: this.handleSubmit,
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
