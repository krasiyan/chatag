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
      tags: []
    };
  };

  componentDidMount() {
    API.get(`/api/tags`)
      .then(res => {
        this.setState({
          tags: (res.data || [])
        });
      });
  };

  render () {
    var renderedTags = this.state.tags.map((tag) => {
      return (
        <Tag
          key={tag.id}
          message={tag.message}
          lat={tag.location.lat}
          lng={tag.location.lng}
        />
      )
    })

    return (
      <GoogleMapReact
        className="map"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={style}>
        {renderedTags}
      </GoogleMapReact>
    )
  }
}

export default Map;
