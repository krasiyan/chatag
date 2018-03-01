import React, { Component } from 'react';
import './Chatag.css';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="Chatag">
        <Navbar/>
        <p className="Chatag-intro">
          chatag
        </p>
      </div>
    );
  }
}

export default App;
