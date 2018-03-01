import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import $ from 'jquery';

class Footer extends Component {
  componentDidMount () {
    $(".button-collapse").sideNav();
  }

  render () {
    return (
      <div className="footer-copyright">
        <div className="container">
          © Chatag
        </div>
      </div>
    )
  }
}

export default Footer;
