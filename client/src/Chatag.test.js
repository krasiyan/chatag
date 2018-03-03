import React from 'react';
import ReactDOM from 'react-dom';
import Chatag from './Chatag';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Chatag />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
