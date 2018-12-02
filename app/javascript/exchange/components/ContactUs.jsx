import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu'
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { Container, Header } from 'semantic-ui-react'

import '../stylesheets/header.scss';


class ContactUs extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header as='h2'>Contact Us</Header>
            <strong>
              Email us at urbanx444@gmail.com
            </strong>
        </Container>
      </div>
    )
  }
}

export default ContactUs;
