import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu'
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import { Container, Header } from 'semantic-ui-react'

import '../stylesheets/header.scss';


class FAQ extends Component {
  render() {
    return (
      <div>
        <Container>
          <Header as='h2'>FAQ</Header>
          <p>
            Q: How can I start borrowing items?
          </p>
          <p>
            A: Simply make an account and borrow away!
          </p>
          <br/>
          <p>
            Q: How does the point system work?
          </p>
          <p>
           A:
          <ul>
            <li>Bronze: Upload 10 items</li>
            <li>Silver: Upload 50 items</li>
            <li>Gold: Find out yourself!</li>
          </ul>
            
              
              
              
          </p>
        </Container>
      </div>
    )
  }
}

export default FAQ;
