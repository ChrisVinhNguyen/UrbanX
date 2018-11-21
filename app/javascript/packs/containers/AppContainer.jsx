import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import axios from 'axios';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';

import store from '../store';

const About = () => <h2>About</h2>;
const TermsOfService = () => <h2>Terms Of Service</h2>;
const PrivacyPolicy = () => <h2>Privacy Policy</h2>;
const SiteMap = () => <h2>Site Map</h2>;
const ContactUs = () => <h2>Contact Us</h2>;
const FAQ = () => <h2>FAQ</h2>;

class AppContainer extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="app">
          <Header />
          <Route path="/" exact component={ Body } />
          <Route path="/about" component={ About } />
          <Route path="/terms-of-service" component={ TermsOfService } />
          <Route path="/privacy-policy" component={ PrivacyPolicy } />
          <Route path="/site-map" component={ SiteMap } />
          <Route path="/contact-us" component={ ContactUs } />
          <Route path="/faq" component={ FAQ } />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;