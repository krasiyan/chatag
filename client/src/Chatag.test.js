import React from 'react';
import ReactDOM from 'react-dom';
import Chatag from './Chatag';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chatag />, div);
  ReactDOM.unmountComponentAtNode(div);
});
