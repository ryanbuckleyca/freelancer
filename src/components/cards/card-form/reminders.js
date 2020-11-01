import React, {Component} from 'react';
import Radio from './radio';
import '../cards.scss';

class Reminders extends Component {
  render() {
    // wait for parent components to pass props
    // if(!this.props.reminders)
    //   return "Loading..."

    return(
      <div className="reminders">
        <div className="reminders-buttons" style={{display: 'flex'}}>
          Phone
          Email
          Text
          Mail
        </div>
        <fieldset>
          <label className="form-label" htmlFor="frequency">Frequency *</label>
            <Radio name="frequency" value="Daily" />
            <Radio name="frequency" value="Weekly" />
            <Radio name="frequency" value="Bi-Weekly" />
            <Radio name="frequency" value="Monthly" />
        </fieldset>
        <fieldset>
          <label className="form-label" htmlFor="tone">Tone *</label>
            <Radio name="tone" value="Polite" />
            <Radio name="tone" value="Understanding" />
            <Radio name="tone" value="Concerned" />
            <Radio name="tone" value="Stern" />
        </fieldset>
        <fieldset>
          <label className="form-label" 
            htmlFor="msg-content">
            Content *
          </label>
          <textarea rows="10" id="paid" name="paid"
            onChange={this.props.changeHandler}>
          </textarea>
        </fieldset>
      </div>
    );
  }
}

export default Reminders;
