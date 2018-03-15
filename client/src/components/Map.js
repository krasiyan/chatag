import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Tag from './Tag';
import API from '../api';
import { subscribeForNewTags } from '../ws';

const style = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 42.2020702,
      lng: 25.3248541
    },
    zoom: 15
  };

  constructor () {
    super()
    this.state = {
      tags: [],
      tagBeingCreated: null
    };

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleTagCreation = this.handleTagCreation.bind(this);
    this.handleTagCancelation = this.handleTagCancelation.bind(this);

    this.addOrUpdateTagInState = this.addOrUpdateTagInState.bind(this);
    this.removeTagFromState = this.removeTagFromState.bind(this);
  };

  componentDidMount() {
    API.get(`/api/tags`)
      .then(res => {
        this.setState((state) => {
          state.tags = state.tags.concat(res.data || [])
          return state
        });
      });

    subscribeForNewTags((err, tag) => this.addOrUpdateTagInState(tag));
    subscribeForDeletedTags((err, tagId) => this.removeTagFromState(tagId));
  };

  handleMapClick(e) {
    if (this.state.tagBeingCreated) return

    this.setState({
      tagBeingCreated: {
        id: 'new',
        message: '',
        location: {
          lat: e.lat,
          lng: e.lng,
        }
      }
    });
  };

  addOrUpdateTagInState (tag) {
    this.setState((state) => {
      var existingTag = state.tags.find((existingTag) => {
        return existingTag.id === tag.id
      });

      if (!existingTag) {
        state.tags.push(tag)
      } else {
        existingTag = tag
      }
      return state
    })
  };

  removeTagFromState (tagId) {
    this.setState((state) => {
      var existingTagIdx = state.tags.findIndex((existingTag) => {
        return existingTag.id === tagId
      });

      if (existingTagIdx !== -1) {
        state.tags.splice(existingTagIdx, 1);
      }

      return state;
    })
  }

  handleTagCreation(tag) {
    delete tag.id
    API.post(`/api/tags`, tag)
      .then(res => {
        var newTag = Object.assign(tag, res.data)

        this.setState({ tagBeingCreated: null });
        this.addOrUpdateTagInState(newTag);
      })
      .catch(err => {
        console.error(err)
        this.setState({ tagBeingCreated: null });
      });
  }

  handleTagCancelation() {
    this.setState({ tagBeingCreated: null });
  }

  render () {
    var tags = this.state.tags
    if (this.state.tagBeingCreated) tags = tags.concat(this.state.tagBeingCreated)

    var renderedTags = tags.map((tag) => {
      return (
        <Tag
          key={tag.id}
          lat={tag.location.lat}
          lng={tag.location.lng}
          tag={tag}
          handleTagCreation={this.handleTagCreation}
          handleTagCancelation={this.handleTagCancelation}
        />
      )
    })

    return (
      <GoogleMapReact
        className="map"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={style}
        onClick={this.handleMapClick}>
        {renderedTags}
      </GoogleMapReact>
    )
  }
}

export default Map;
