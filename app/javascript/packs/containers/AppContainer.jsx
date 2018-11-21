import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

import axios from 'axios';
import Header from '../components/Header';
import Body from '../components/Body';
import Footer from '../components/Footer';


const About = () => <h2>About</h2>;
const TermsOfService = () => <h2>Terms Of Service</h2>;
const PrivacyPolicy = () => <h2>Privacy Policy</h2>;
const SiteMap = () => <h2>Site Map</h2>;
const ContactUs = () => <h2>Contact Us</h2>;
const FAQ = () => <h2>FAQ</h2>;

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentUserInfo: {}
    };
  }

  componentDidMount() {
    let that = this
    axios.get('/is_signed_in')
    .then(function(response){
      if(response.data.user_info && response.data.user_info.user_profile_id != null) {
        that.setState({
          currentUserInfo: response.data.user_info
        })
      } else {
        that.setState({
          currentUserInfo: null
        })
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    return (
      <div className="app">
        <Header currentUser={ this.state.currentUserInfo } />
        <Route path="/" exact component={ Body } />
        <Route path="/about" component={ About } />
        <Route path="/terms-of-service" component={ TermsOfService } />
        <Route path="/privacy-policy" component={ PrivacyPolicy } />
        <Route path="/site-map" component={ SiteMap } />
        <Route path="/contact-us" component={ ContactUs } />
        <Route path="/faq" component={ FAQ } />
        <Footer />
      </div>
    );
  }
}

export default AppContainer;