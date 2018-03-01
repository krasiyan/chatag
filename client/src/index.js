import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
import Chatag from './Chatag';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chatag />, document.getElementById('root'));
registerServiceWorker();
