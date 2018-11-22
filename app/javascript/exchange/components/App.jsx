import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import axios from 'axios';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import UserProfile from './UserProfile';

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