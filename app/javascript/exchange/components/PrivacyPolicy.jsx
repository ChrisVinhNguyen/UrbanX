import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu'
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { Container, Header } from 'semantic-ui-react'

import '../stylesheets/header.scss';


class PrivacyPolicy extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header as='h2'>Privacy Policy</Header>
          <p>
            The information we learn from customers helps us personalize and continually
            improve your UrbanX experience. Here are the types of information we gather.
          </p>
          <Header>
            Information You Give Us: 
          </Header>
          <p>
            We receive and store any information you enter on our
            Web site or give us in any other way. Click here to see examples of what we 
            collect. You can choose not to provide certain information, but then you might
            not be able to take advantage of many of our features. We use the information
            you provide for such purposes as responding to your requests, customizing 
            future shopping for you, improving our stores, and communicating with you.
          </p>
          <Header>
            Automatic Information: 
          </Header>
          <p>
            We receive and store certain types of information whenever
            you interact with us. For example, like many Web sites, we use "cookies," and we
            obtain certain types of information when your Web browser accesses UrbanX or
            advertisements and other content served by or on behalf of UrbanX on other 
            Web sites. Click here to see examples of the information we receive.
          </p>
          <Header>
            Mobile: 
          </Header>
          <p>
            When you download or use apps created by UrbanX or its subsidiaries, we 
            may receive information about your location and your mobile device, including a 
            unique identifier for your device. We may use this information to provide you with
            location-based services, such as advertising, search results, and other personalized
            content. Most mobile devices allow you to turn off location services. For more 
            information about how to do this, click here.
          </p>
          <Header>
            E-mail Communications: 
          </Header>
          <p>
            To help us make e-mails more useful and interesting, we often
            receive a confirmation when you open e-mail from UrbanX if your computer supports 
            such capabilities. Also, in an effort to avoid sending unnecessary messages to our 
            customers, we compare our customer list to lists received from other companies. If 
            you don't want to receive e-mail or other mail from us, please adjust your Customer
            Communication Preferences.
          </p>
          <Header>
            Information from Other Sources: 
          </Header>
          <p>
            We might receive information about you from other 
            sources and add it to our account information. Click here to see examples of the 
            information we receive.
          </p>
        </Container>
      </div>
    )
  }
}

export default PrivacyPolicy;
