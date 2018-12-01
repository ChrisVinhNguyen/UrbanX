import React, { Component } from 'react';
import ItemListComponent from './ItemListComponent'
import { Route } from "react-router-dom";

import UserProfile from './UserProfile';
import ItemDetails from './ItemDetails';
import About from './About';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import SiteMap from './SiteMap';
import ContactUs from './ContactUs';
import FAQ from './FAQ';

import UserProfileEditForm from '../containers/UserProfileEditForm';
import UserSignUpFormContainer from '../containers/UserSignUpFormContainer';
import UserSignInFormContainer from '../containers/UserSignInFormContainer';
import UserForgotPasswordFormContainer from '../containers/UserForgotPasswordFormContainer';
import ItemCreateFormContainer from '../containers/ItemCreateFormContainer';
import ItemEditFormContainer from '../containers/ItemEditFormContainer';
import ProfileCreateFormContainer from '../containers/ProfileCreateFormContainer';

import '../stylesheets/body.scss';


//const About = () => <h2>About</h2>;
//const TermsOfService = () => <h2>Terms Of Service</h2>;
//const PrivacyPolicy = () => <h2>Privacy Policy</h2>;
//const SiteMap = () => <h2>Site Map</h2>;
//const ContactUs = () => <h2>Contact Us</h2>;
//const FAQ = () => <h2>FAQ</h2>;

class Body extends Component {
  render() {
    return (
      <div className="body">
        <Route path="/" exact component={ ItemListComponent } />
        <Route path="/users_sign_up" exact component={ UserSignUpFormContainer } />
        <Route path="/users_sign_in" exact component={ UserSignInFormContainer } />
        <Route path="/users_forgot_password" exact component={ UserForgotPasswordFormContainer } />
        <Route path="/user_profiles/new/profile" exact component={ ProfileCreateFormContainer } />
        <Route path="/user_profiles_show/:id" exact component={ UserProfile } />
        <Route path="/user_profiles_change/:id/edit" exact component={ UserProfileEditForm } />
        <Route path="/about" component={ About } />
        <Route path="/terms-of-service" component={ TermsOfService } />
        <Route path="/privacy-policy" component={ PrivacyPolicy } />
        <Route path="/site-map" component={ SiteMap } />
        <Route path="/contact-us" component={ ContactUs } />
        <Route path="/faq" component={ FAQ } />
        <Route path="/items_list/:id" exact component={ ItemDetails } />
        <Route path="/items/add/new" exact component={ ItemCreateFormContainer } />
        <Route path="/items_list/:id/edit" component={ ItemEditFormContainer } />
        <Route path="/items/:item_id/delete_image" component= {ItemEditFormContainer} />
      </div>
    );
  }
}

export default Body;
