import React, { Component } from 'react';
import ItemListComponent from './ItemListComponent'
import { Route } from "react-router-dom";

import UserProfile from './UserProfile';
import UserProfileEditForm from '../containers/UserProfileEditForm';
import ItemDetails from './ItemDetails';


const About = () => <h2>About</h2>;
const TermsOfService = () => <h2>Terms Of Service</h2>;
const PrivacyPolicy = () => <h2>Privacy Policy</h2>;
const SiteMap = () => <h2>Site Map</h2>;
const ContactUs = () => <h2>Contact Us</h2>;
const FAQ = () => <h2>FAQ</h2>;

class Body extends Component {
  render() {
    return (
      <div style={{marginLeft: '20px', marginTop: '100px'}} className="body">
      	  <Route path="/" exact component={ ItemListComponent } />
          <Route path= "/user_profiles/:id" exact component={ UserProfile } />
          <Route path= "/user_profiles/:id/edit" exact component={ UserProfileEditForm } />
          <Route path="/about" component={ About } />
          <Route path="/terms-of-service" component={ TermsOfService } />
          <Route path="/privacy-policy" component={ PrivacyPolicy } />
          <Route path="/site-map" component={ SiteMap } />
          <Route path="/contact-us" component={ ContactUs } />
          <Route path="/faq" component={ FAQ } />
          <Route path="/items/:id" component={ ItemDetails } />
      </div>
    );
  }
}

export default Body;
