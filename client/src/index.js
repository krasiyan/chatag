import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './Chatag.css';

import Chatag from './Chatag';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
  <Chatag />
</BrowserRouter>
, document.getElementById('chatag'));
registerServiceWorker();
