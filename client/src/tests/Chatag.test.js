import React from 'react';
import ReactDOM from 'react-dom';
import Chatag from '../Chatag';
import { BrowserRouter } from 'react-router-dom';

import api from '../api';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(api);

afterEach(() => {
  mock.reset();
  mock.restore();
})

it('renders without crashing', () => {
  mock.onGet('/api/tags').reply(200, [{
    id: 'test',
    message: 'test message',
    location: {
      lat: 37.7749,
      lng: 122.4194,
    },
    createdAt: new Date(),
  }]);

  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Chatag />
    </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
