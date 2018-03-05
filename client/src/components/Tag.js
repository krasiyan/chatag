import React, { Component } from 'react';

class Tag extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      message: props.message,
      location: props.location,
      createdAt: props.createdAt
    };

    this.handleTagMessageChange = this.handleTagMessageChange.bind(this);
    this.handleTagCreation = this.handleTagCreation.bind(this);
    this.handleTagRemoval = this.handleTagRemoval.bind(this);
  };

  handleTagMessageChange(event) {
    this.setState({ message: event.target.value });
  };

  handleTagCreation() {
    this.props.handleTagCreation(this.state);
  };

  handleTagRemoval() {
    this.props.handleTagRemoval();
  };

  render () {
    function getTagContents() {
      if (this.state.id === 'new') {
        return (
          <div>
            <textarea value={this.state.message} onChange={this.handleTagMessageChange} />
            <button onClick={this.handleTagCreation}>Tag!</button>
            <button onClick={this.handleTagRemoval}>X</button>
          </div>
        )
      } else {
        return `${this.state.message} @ ${this.state.createdAt}`
      }
    }

    return (
      <div style={{
        position: 'relative', color: 'white', background: '#42d9f4',
        border: '2px solid #009fc6',
        padding: 10,
        height: 70, width: 70, top: -20, left: -30,
      }}>
        {getTagContents.apply(this)}
      </div>
    )
  }
}

export default Tag;
