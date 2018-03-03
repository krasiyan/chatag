import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Tag from './Tag';

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

  render () {
    return (
      <GoogleMapReact
        className="map"
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={style}>
        <Tag
          message="My first pin message"
          lat={42.2020702}
          lng={25.3248541}
        />
      </GoogleMapReact>
    )
  }
}

export default Map;
