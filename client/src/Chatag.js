import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

class App extends Component {
  constructor () {
    super();
    this.state = {
      searchFieldRef: null,
    };
    this.setSearchFieldRef = this.setSearchFieldRef.bind(this);
  }

  setSearchFieldRef (searchFieldRef) {
    this.setState({ searchFieldRef })
  }

  render() {
    return (
      <div id="root">
        <header>
          <Navbar
            setSearchFieldRef={this.setSearchFieldRef}
          />
        </header>
        <main>
          <Main
            searchFieldRef={this.state.searchFieldRef}
          />
        </main>
        <footer className="page-footer">
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
