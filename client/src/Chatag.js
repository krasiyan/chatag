import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div id="root">
        <header>
          <Navbar/>
        </header>
        <main>
          <Main/>
        </main>
        <footer className="page-footer">
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
