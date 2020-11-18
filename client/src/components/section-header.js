import React, {Component} from 'react';

class SectionHeader extends Component {

  render() {
    return(
      <div style={{textAlign: 'center', margin: '3em'}}>
        <h2 style={{textAlign: 'center', marginBottom: '.3em'}}>
          {this.props.title}
        </h2>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default SectionHeader;
