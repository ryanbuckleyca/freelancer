import React, {Component} from 'react';
import Radio from './radio';
import ToggleSwitch from './toggle-switch';
import './reminders.scss';

class Reminder extends Component {
  render() {
    const { reminder, reminders } = this.props

    const updateReminders = (newObject) => {
      const index = reminders.findIndex(x => x === reminder)
      const newArray = reminders
      newArray[index] = { ...reminder, ...newObject }
      this.props.passProps({ reminders: newArray })
    }

    if (!reminder)
      return('^ select a reminder to configure')

    return(
      <div class="reminder">

        <ToggleSwitch
          changeHandler={updateReminders}
          value={reminder.active}
          message={reminder.type + ' reminders'}
        />

        <fieldset>
          <label className="form-label" htmlFor="frequency">Frequency *</label><br />
            <Radio name="frequency" value="Daily"
              onChange={() => updateReminders({frequency: 1})}
              checked={reminder && reminder.frequency === 1 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Weekly"
              onChange={() => updateReminders({frequency: 7})}
              checked={reminder && reminder.frequency === 7 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Bi-Weekly"
              onChange={() => updateReminders({frequency: 14})}
              checked={reminder && reminder.frequency === 14 ? 'checked' : ''}
            />
            <Radio name="frequency" value="Monthly"
              onChange={() => updateReminders({frequency: 28})}
              checked={reminder && reminder.frequency === 28 ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="tone">Tone *</label><br />
            <Radio name="tone" value="Polite"
              onChange={() => updateReminders({tone: 'polite'})}
              checked={reminder && reminder.tone === 'polite' ? 'checked' : ''}
            />
            <Radio name="tone" value="Understanding"
              onChange={() => updateReminders({tone: 'understanding'})}
              checked={reminder && reminder.tone === 'understanding' ? 'checked' : ''}
            />
            <Radio name="tone" value="Concerned"
              onChange={() => updateReminders({tone: 'concerned'})}
              checked={reminder && reminder.tone === 'concerned' ? 'checked' : ''}
            />
            <Radio name="tone"value="Stern"
              onChange={() => updateReminders({tone: 'stern'})}
              checked={reminder && reminder.tone === 'stern' ? 'checked' : ''}
            />
        </fieldset>
        <fieldset>
          <label className="form-label"
            htmlFor="msg-content">
            Content *
          </label>
          <textarea rows="10" id="message" name="message"
            onChange={(e) => updateReminders({ text: e.target.value })}
            value={reminder && reminder.text}>
          </textarea>
        </fieldset>
      </div>
    )
  }
}

class Reminders extends Component {

  createReminder(type) {
    const reminders = this.props.reminders;
    reminders.push({ type: type })
    console.log('new reminders array is: ', reminders)
    this.props.passProps({
      reminders: reminders,
      reminder: reminders[reminders.length - 1],
      selectedType: type
    })
  }

  setReminder(e) {
    e.preventDefault();
    e.persist();
    const type = e.target.id
    const reminders = this.props.reminders
    let index = reminders.findIndex(x => x.type === type)
    index < 0
    ? this.createReminder(type)
    : this.props.passProps({ reminder: reminders[index], selectedType: type })
  }

  render() {
    const { reminders, selectedType } = this.props

    if(!reminders)
      return "Loading..."

    const isSelected = type => type === selectedType ? ' reminder-selected' : ''
    const loadReminder = type => reminders.find(x => x.type === type)
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
