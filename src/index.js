import React from 'react';
import { render } from 'react-dom';
import App from './App';

const APP = require('./App');

const root = document.getElementById('root');

render(<App />, root);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = APP.default;
    render(<NextApp />, root);
  });
}
