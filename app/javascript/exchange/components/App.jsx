import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import store from '../store';


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="app">
          <Header />
          <Body />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;