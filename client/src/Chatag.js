import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div id="root">
        <header>
          <Navbar/>
        </header>
        <main>
          <div className="container">
            chatag
          </div>
        </main>
        <footer className="page-footer">
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
