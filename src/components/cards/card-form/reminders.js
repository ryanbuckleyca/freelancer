import React, {Component} from 'react';
import Radio from './radio';
import '../cards.scss';

class Reminder extends Component {
  updateReminders(newObject) {
    const { reminder, reminders } = this.props
    const type = reminder.type
    const index = reminders.findIndex(x => x.type === type) || reminders.length
    reminders[index] = { ...reminder, ...newObject }
    this.props.passProps({ Reminders: reminders })
  }

  toggleReminder() {
    const status = this.props.reminder.active ? false : true
    this.updateReminders({ active: status })
  }

  render() {
    const { reminder } = this.props
    console.log('reminder rendered with props: ', this.props)
    
    //TODO: if there is no reminder, create a new one
    if (!reminder)
      return('^ select a reminder to configure')

    return(
      <div id="reminder">
        <duv style={{
          display: 'flex', 
          justifyContent: 'flex-start',
          alignItems: "center",
          marginBottom: '1em'
        }}>
        <label class="button r" id="button-3">
          <input type="checkbox" class="checkbox" 
            onChange={() => this.toggleReminder()} 
            selected={reminder.active}
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </label>
        <div style={{flexGrow: 1, marginLeft: '1em'}}>
        {reminder.type} reminders are {reminder.active ? 'ON' : 'OFF'}
        </div>
        </duv>
        <fieldset>
          <label className="form-label" htmlFor="frequency">Frequency *</label><br />
            <Radio name="frequency" value="Daily" 
              onChange={() => this.updateReminders({frequency: 1})}
              checked={reminder.frequency === 1 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Weekly" 
              onChange={() => this.updateReminders({frequency: 7})}
              checked={reminder.frequency === 7 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Bi-Weekly" 
              onChange={() => this.updateReminders({frequency: 14})}
              checked={reminder.frequency === 14 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Monthly" 
              onChange={() => this.updateReminders({frequency: 28})}
              checked={reminder.frequency === 28 ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="tone">Tone *</label><br />
            <Radio name="tone" value="Polite" 
              onChange={() => this.updateReminders({tone: 'polite'})}
              checked={reminder.tone === 'polite' ? 'checked' : ''}
            />
            <Radio name="tone" value="Understanding" 
              onChange={() => this.updateReminders({tone: 'understanding'})}
              checked={reminder.tone === 'understanding' ? 'checked' : ''}
            />
            <Radio name="tone" value="Concerned" 
              onChange={() => this.updateReminders({tone: 'concerned'})}
              checked={reminder.tone === 'concerned' ? 'checked' : ''}
            />
            <Radio name="tone"value="Stern" 
              onChange={() => this.updateReminders({tone: 'stern'})}
              checked={reminder.tone === 'stern' ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label" 
            htmlFor="msg-content">
            Content *
          </label>
          <textarea rows="10" id="message" name="message"
            onChange={(e) => this.updateReminders({ text: e.target.value })}
            value={reminder.text}>
          </textarea>
        </fieldset> 
      </div> 
    )
  }
}

class Reminders extends Component {
  setReminder(e) {
    e.preventDefault();
    e.persist();
    this.props.passProps({ selectedReminder: e.target.id })
  }

  render() {
    const { reminders, selectedReminder } = this.props

    // wait for parent components to pass props
    if(!reminders)
      return "Loading..."

    console.log("reminders prop is: ", reminders)

    const icon = (type) => {
      if (loadReminder(type) && loadReminder(type).active)
        return <span className="text-green">✓</span>
      else
        return <span className="text-red">x</span>
    }

    const isSelected = type => type === selectedReminder ? ' reminder-selected' : ''

    const loadReminder = type => reminders.find(x => x.type === type)

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
          reminders={reminders}
          reminder={loadReminder(selectedReminder)} 
        />
      </div>
    );
  }
}

export default Reminders;
