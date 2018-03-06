import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Tag from './Tag';
import API from '../api';

const style = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};
const bootstrapURLKeys = { key: process.env.REACT_APP_GOOGLE_API_KEY, libraries: 'places' };

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 42.2020702,
      lng: 25.3248541
    },
    zoom: 15,
    searchFieldRef: null
  };

  constructor (props) {
    super()
    this.state = {
      tags: [],
      tagBeingCreated: null
    };

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleTagCreation = this.handleTagCreation.bind(this);
    this.handleTagCancelation = this.handleTagCancelation.bind(this);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
  };

  componentDidMount() {
    API.get(`/api/tags`)
      .then(res => {
        this.setState({
          tags: (res.data || [])
        });
      });
  };

  onGoogleApiLoaded({map, maps}) {
    console.log(this.props.searchFieldRef)
    // Add input to search
    // console.log(maps.places);
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
    API.post(`/api/tags`, tag)
      .then(res => {
        var newTag = Object.assign(tag, res.data)

        this.setState((state) => {
          state.tags.push(newTag);
          state.tagBeingCreated = null;
          return state
        });
      })
      .catch(err => {
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
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={style}
        onGoogleApiLoaded={this.onGoogleApiLoaded}
        onClick={this.handleMapClick}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {renderedTags}
      </GoogleMapReact>
    )
  }
}

export default Map;
