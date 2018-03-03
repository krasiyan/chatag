import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Tag extends Component {
  constructor(props) {
  super(props);
  }
  render () {
    return (
      <div style={{
        position: 'relative', color: 'white', background: '#42d9f4',
        border: '2px solid #009fc6',
        padding: 10,
        height: 70, width: 70, top: -20, left: -30,
        }}>
          {this.props.message}
      </div>
    )
  }
}

export default Tag;
