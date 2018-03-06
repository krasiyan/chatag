import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import $ from 'jquery';

class Navbar extends Component {
  componentDidMount () {
    if ($(".button-collapse").sideNav) $(".button-collapse").sideNav();
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
              <Route path="/about">
                {({ match }) =>
                  <li className={match ? 'active' : undefined}><Link to="/about"><FontAwesome name="question" />&nbsp;About</Link></li>
                }
              </Route>
            </ul>
            <Search/>
            <ul className="side-nav" id="mobile-demo">
              <Route path="/about">
                {({ match }) =>
                  <li className={match ? 'active' : undefined}><Link to="/about"><FontAwesome name="question" />&nbsp;About</Link></li>
                }
              </Route>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
