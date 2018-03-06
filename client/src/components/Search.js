import React, { Component } from 'react';

class Search extends Component {
  componentDidMount () {
    this.props.setSearchFieldRef(this.refs.input)
  }

  render() {
    return (
      <div>
        <input id="search-input" ref="input" type="text" placeholder="Search Box"/>
      </div>
    )
  }
}

export default Search;
