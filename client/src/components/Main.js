import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Map from './Map';
import About from './About';

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' render={()=>
          <Map searchFieldRef={this.props.searchFieldRef}/>
        } />
        <Route exact path='/about' component={About} />
      </Switch>
    )
  }
}

export default Main;
