import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu'
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { Container, Header } from 'semantic-ui-react'

import '../stylesheets/header.scss';


class About extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header as='h2'>About</Header>
          <p>
            UrbanX is Canada’s fastest growing classifieds site with a ton of live ads in a 
            wide range of categories - cars, tools, electronics and everything in between. 
            Two new ads are posted every second! We’re proud to provide a platform that
            connects Canadians, helping them to borrow great items in their community, lend out
            unused possessions cluttering up houses, and help the country waste less.
          </p>
        </Container>
      </div>
    )
  }
}

export default About;
