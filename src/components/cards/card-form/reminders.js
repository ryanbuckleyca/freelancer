import React, {Component} from 'react';
import Radio from './radio';
import '../cards.scss';

class Reminder extends Component {
  currentReminder() {
    const type = this.props.currentReminder
    let index = this.props.reminders.findIndex(x => x.type === type)
    if (index < 0)
      index = this.props.reminders.length;
    return this.props.reminders[index]
  }

  updateReminders(newObject) {
    const newReminder = { ...this.currentReminder(), ...newObject }
    this.props.passProps({ Reminders: newReminder })
  }

  toggleReminder() {
    const status = this.currentReminder().active ? false : true
    this.updateReminders({ active: status })
  }

  render() {
    const { reminders } = this.props
    console.log('reminder rendered with props: ', this.props)
    
    if (!this.props.reminder)
      return('^ select a reminder to configure')

    const reminder = reminders.find(x => x.type === this.props.reminder)

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
            onChange={() => this.updateReminders({active: true})} 
            selected={reminder && (reminder.active || false)}
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </label>
        <div style={{flexGrow: 1, marginLeft: '1em'}}>
        {this.props.reminder} reminders are {reminder && reminder.active ? 'ON' : 'OFF'}
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
          reminder={selectedReminder} 
        />
      </div>
    );
  }
}

export default Reminders;
