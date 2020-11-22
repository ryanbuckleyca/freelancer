import React, {Component} from 'react';
import './loading.scss';

class Loading extends Component {

  render() {
    return(
      <div className="loading">
        Loading {this.props.type} records. Please wait...
      </div>
    );
  }
}

export default Loading;
