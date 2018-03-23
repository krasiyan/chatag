import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Tag from './Tag';
import API from '../api';
import { subscribeForNewTags, subscribeForUpdatedTags, subscribeForDeletedTags } from '../ws';

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
    zoom: 15,
    options: {
      minZoom: 3,
      maxZoom: 13
    }
  };

  constructor (props) {
    super()
    this.state = {
      map: {
        zoom: props.zoom,
        center: props.center,
        bounds: null,
      },
      tags: [],
      tagBeingCreated: null
    };

    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleTagCreation = this.handleTagCreation.bind(this);
    this.handleTagCancelation = this.handleTagCancelation.bind(this);

    this.addOrUpdateTagInState = this.addOrUpdateTagInState.bind(this);
    this.removeTagFromState = this.removeTagFromState.bind(this);
  };

  componentDidMount() {
    this.mounted = true;

    subscribeForNewTags((err, tag) => this.addOrUpdateTagInState(tag));
    subscribeForUpdatedTags((err, tag) => this.addOrUpdateTagInState(tag));
    subscribeForDeletedTags((err, tag) => this.removeTagFromState(tag));
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  handleMapChange(mapProps) {
    this.setState(state => {
      state.map.center = mapProps.center
      state.map.zoom = mapProps.zoom
      state.map.bounds = mapProps.bounds
      return state
    }, () => {

      var queryParams = {}
      if (this.state.map.bounds && this.state.map.bounds.sw && this.state.map.bounds.ne) {
        // TODO: round up the coordinates in order to benefit from caching
        queryParams = {
          swLat: this.state.map.bounds.sw.lat,
          swLng: this.state.map.bounds.sw.lng,
          neLat: this.state.map.bounds.ne.lat,
          neLng: this.state.map.bounds.ne.lng
        }
      }

      API.get(`/api/tags/in-region`, { params: queryParams })
        .then(res => {
          if (!this.mounted) return
          this.setState({ tags: res.data || [] });
        });
    })
  }

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
    if (!this.mounted) return

    this.setState((state) => {
      var existingTagIdx = state.tags.findIndex((existingTag) => {
        return existingTag.id === tag.id
      });

      if (existingTagIdx === -1) {
        state.tags.push(tag)
      } else {
        state.tags[existingTagIdx] = tag
      }
      return state
    })
  };

  removeTagFromState (tag) {
    if (!this.mounted) return

    this.setState((state) => {
      var existingTagIdx = state.tags.findIndex((existingTag) => {
        return existingTag.id === tag.id
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
        options={this.props.options}
        style={style}
        onClick={this.handleMapClick}
        onChange={this.handleMapChange}>
        {renderedTags}
      </GoogleMapReact>
    )
  }
}

export default Map;
