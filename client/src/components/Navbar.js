import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
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
            <a href="#!" className="brand-logo">Chatag</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <FontAwesome name='bars' />
            </a>
            <ul id="nav-main" className="right hide-on-med-and-down">
              <li>
                <a href="#">
                  <FontAwesome name='question' />
                  &nbsp;About
                </a>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <a href="#">
                  <FontAwesome name='question' />
                  &nbsp;About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
