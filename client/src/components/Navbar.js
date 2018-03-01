import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Navbar extends Component {
  componentDidMount () {
    $(".button-collapse").sideNav();
  }

  render(){
    return (
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Chatag&nbsp;
              <FontAwesome name="map-marker" />
            </Link>
            <Link to="/" data-activates="mobile-demo" className="button-collapse">
              <FontAwesome name='bars' />
            </Link>
            <ul id="nav-main" className="right hide-on-med-and-down">
              <li>
                <Link to="/about">
                  <FontAwesome name="question" />
                  &nbsp;About
                </Link>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <Link to="/about">
                  <FontAwesome name="question" />
                  &nbsp;About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
