import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div>
        <input id="search-input" ref="input" type="text" placeholder="Search Box"/>
      </div>
    )
  }
}

export default Search;
