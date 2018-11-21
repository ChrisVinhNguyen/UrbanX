import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from './containers/AppContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  );
});
