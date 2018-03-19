import React, { Component } from 'react';
import Moment from 'react-moment';

class Tag extends Component {

  constructor(props) {
    super(props);

    this.state = { ...props.tag };

    this.handleTagMessageChange = this.handleTagMessageChange.bind(this);
    this.handleTagCreation = this.handleTagCreation.bind(this);
    this.handleTagCancelation = this.handleTagCancelation.bind(this);
  };

  componentWillReceiveProps (nextProps) {
    var newTag = nextProps.tag
    if (newTag && newTag.message && newTag.message !== this.state.message) {
      this.setState({ ...newTag });
    }
  }

  handleTagMessageChange(event) {
    this.setState({ message: event.target.value });
  };

  handleTagCreation() {
    this.props.handleTagCreation(this.state);
  };

  handleTagCancelation() {
    this.props.handleTagCancelation();
  };

  render () {
    function getTagContents() {
      if (this.state.id === 'new') {
        return (
          <div>
            <textarea value={this.state.message} onChange={this.handleTagMessageChange} />
            <button onClick={this.handleTagCreation}>Tag!</button>
            <button onClick={this.handleTagCancelation}>X</button>
          </div>
        )
      } else {
        return (
          <div>
            <span>{this.state.message}</span>
            <br />
            <Moment fromNow>{this.state.createdAt}</Moment>
          </div>
        )
      }
    }

    return (
      <div className="tag">
        {getTagContents.apply(this)}
      </div>
    )
  }
}

export default Tag;
