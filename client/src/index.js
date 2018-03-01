import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import Chatag from './Chatag';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chatag />, document.getElementById('root'));
registerServiceWorker();
