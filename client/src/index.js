import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chatag from './Chatag';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chatag />, document.getElementById('root'));
registerServiceWorker();
