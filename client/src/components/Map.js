import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Tag from './Tag';
import API from '../api';

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
    this.handleTagRemoval = this.handleTagRemoval.bind(this);
  };

  componentDidMount() {
    API.get(`/api/tags`)
      .then(res => {
        this.setState({
          tags: (res.data || [])
        });
      });
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

  handleTagCreation(tag) {
    delete tag.id
    API.post(`/api/tags`, tag).then(res => {
      var newTag = Object.assign(tag, res.data)

      this.setState((state) => {
        state.tags.push(newTag);
        state.tagBeingCreated = null;
        return state
      });
    });
  }

  handleTagRemoval() {
    this.setState({ tagBeingCreated: null });
    console.log('removal');
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
          handleTagRemoval={this.handleTagRemoval}
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
