import React, {Component} from 'react';
import Radio from './radio';
import '../cards.scss';

// contracts may have ZERO reminders
// clicking on a reminder not yet associated with their contract
// create a new reminder, and save it on SUBMIT
// or, create blank reminders for every contract...seems like a waste
// so... how to do the former...
// contract.Reminders is an array
// gets stored in state and passed to Reminder as currentReminder
// when item gets clicked, it loads that reminder
// but what if is doesn't exist?
// if Phone isn't in reminders (which we need to use .find to get)
//    then, create a new reminder and store it in the array.
// so update state.Reminders with the current array plus one.

class Reminder extends Component {
  // TODO: this.props.reminder is not updating
  updateReminders(newObject) {
    console.log("updateReminders called")
    const newReminder = { ...this.props.reminder, ...newObject }
    this.props.passProps({ reminder: newReminder }, console.log('reminder is now ', newReminder))
  }

  // TODO: toggle isn't currently working
  toggleReminder() {
    const status = this.props.reminder.active ? false : true
    this.updateReminders({ active: status })
  }

  render() {
    const { reminder } = this.props
    console.log('reminder rendered with props: ', this.props)
    
    if (!reminder)
      return('^ select a reminder to configure')

    return(
      <div id="reminder">
        <div style={{
          display: 'flex', 
          justifyContent: 'flex-start',
          alignItems: "center",
          marginBottom: '1em'
        }}>
        <label class="button r" id="button-3">
          <input type="checkbox" class="checkbox" 
            onChange={() => this.toggleReminder()} 
            selected={reminder && reminder.active}
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </label>
        <div style={{flexGrow: 1, marginLeft: '1em'}}>
          {reminder.type} reminders are {reminder && reminder.active ? 'ON' : 'OFF'}
        </div>
        </div>
        <fieldset>
          <label className="form-label" htmlFor="frequency">Frequency *</label><br />
            <Radio name="frequency" value="Daily" 
              onChange={() => this.updateReminders({frequency: 1})}
              checked={reminder && reminder.frequency === 1 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Weekly" 
              onChange={() => this.updateReminders({frequency: 7})}
              checked={reminder && reminder.frequency === 7 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Bi-Weekly" 
              onChange={() => this.updateReminders({frequency: 14})}
              checked={reminder && reminder.frequency === 14 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Monthly" 
              onChange={() => this.updateReminders({frequency: 28})}
              checked={reminder && reminder.frequency === 28 ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="tone">Tone *</label><br />
            <Radio name="tone" value="Polite" 
              onChange={() => this.updateReminders({tone: 'polite'})}
              checked={reminder && reminder.tone === 'polite' ? 'checked' : ''}
            />
            <Radio name="tone" value="Understanding" 
              onChange={() => this.updateReminders({tone: 'understanding'})}
              checked={reminder && reminder.tone === 'understanding' ? 'checked' : ''}
            />
            <Radio name="tone" value="Concerned" 
              onChange={() => this.updateReminders({tone: 'concerned'})}
              checked={reminder && reminder.tone === 'concerned' ? 'checked' : ''}
            />
            <Radio name="tone"value="Stern" 
              onChange={() => this.updateReminders({tone: 'stern'})}
              checked={reminder && reminder.tone === 'stern' ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label" 
            htmlFor="msg-content">
            Content *
          </label>
          <textarea rows="10" id="message" name="message"
            onChange={(e) => this.updateReminders({ text: e.target.value })}
            value={reminder && (reminder.text || null)}>
          </textarea>
        </fieldset> 
      </div> 
    )
  }
}

class Reminders extends Component {

  createReminder(type) {
    // this is returning undefined
    const reminders = this.props.reminders;
    reminders.push({ type: type })
    console.log('new reminders array is: ', reminders)
    this.props.passProps({ 
      reminders: reminders, 
      reminder: reminders[reminders.length - 1], 
      selectedType: type 
    })
  }

  //updates state in parent based on form modifications
  // reminder value is passing to parent, but not being re-received by component
  setReminder(e) {
    e.preventDefault();
    e.persist();
    const type = e.target.id
    let index = this.props.reminders.findIndex(x => x.type === type)
    if (index < 0)
      this.createReminder(e.target.id)
    else
      this.props.passProps({ reminder: this.props.reminders[index], selectedType: e.target.id })
  }

  render() {
    // props are passed from parent STATE (Contract)
    //  selectedType is a string set from here (Reminders)
    //  reminders is an array received from parent (Contract)

    // wait for parent component to pass props
    if(!this.props.reminders)
      return "Loading..."

    console.log('remidnerSSS loaded with props: ', this.props)

    // render reminder tabs based on activeness and selectedness
    const isSelected = type => type === this.props.selectedType ? ' reminder-selected' : ''
    const loadReminder = type => this.props.reminders.find(x => x.type === type)
    const icon = (type) => {
      if (loadReminder(type) && loadReminder(type).active)
        return <span className="text-green">✓</span>
      else
        return <span className="text-red">x</span>
    }

    return(
      <div className="reminders">
        Reminders:
        <div className="reminders-buttons" style={{display: 'flex', justifyContent: 'stretch'}}>
          <button 
            className={"flex-item-fill reminder-row" + isSelected('phone')}
            id="phone"
            onClick={(e) => this.setReminder(e)}>
            {icon('phone')} Phone
          </button>
          <button 
            className={"flex-item-fill reminder-row" + isSelected('email')}
            id="email"
            onClick={(e) => this.setReminder(e)}>
            {icon('email')} Email
          </button>
          <button 
            className={"flex-item-fill reminder-row" + isSelected('text')}
            id="text"
            onClick={(e) => this.setReminder(e)}>
            {icon('text')} Text
          </button>
          <button 
            className={"flex-item-fill reminder-row" + isSelected('mail')}
            id="mail"
            onClick={(e) => this.setReminder(e)}>
            {icon('mail')} Mail
          </button>
        </div>
        <br />
        <Reminder 
          passProps={this.props.passProps}
          changeHandler={this.props.changeHandler}
          reminders={this.props.reminders}
          reminder={loadReminder(this.props.selectedType)}
        />
      </div>
    );
  }
}

export default Reminders;
