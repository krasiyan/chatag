import React, { Component } from 'react';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

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
            <FontAwesome className="tag-cancel" name='times' onClick={this.handleTagCancelation} />
            <div className="input-field">
              <textarea id="icon_prefix2" className="tag-textarea materialize-textarea" data-length="120" value={this.state.message} onChange={this.handleTagMessageChange} autoFocus />
              <label htmlFor="textarea1">What's taggin'?</label>
            </div>
            <a className="tag-add waves-effect waves-light btn" onClick={this.handleTagCreation}>
              Tag it <FontAwesome name='map-marker' />
            </a>
          </div>
        )
      } else {
        return (
          <div>
            <span>{this.state.message}</span>
            <br />
            <Moment fromNow className="tag-age">{this.state.createdAt}</Moment>
          </div>
        )
      }
    }

    return (
      <div className="tag-wrapper">
        {getTagContents.apply(this)}
      </div>
    )
  }
}

export default Tag;
