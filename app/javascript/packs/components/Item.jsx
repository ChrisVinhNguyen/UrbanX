
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'

import Logo from '../images/macbook.jpg';


class Item1 extends Component {
  render() {
    return (
      <Item>
      <Item.Image as='a' size = 'medium' src={Logo} href={'items/'+this.props.item.id} />

      <Item.Content>
        <Item.Header size = 'medium' as='a' href={'items/'+this.props.item.id}><strong>{this.props.item.name}</strong></Item.Header>
        <Item.Meta>
          <a href={'user_profiles/'+ this.props.item.user_id}>{this.props.item.owner}</a>
          <p>Quantity: {this.props.item.quantity}</p>
        </Item.Meta>
        <Item.Description>Description: {this.props.item.description}.</Item.Description>
        <Item.Extra>
          <Rating icon='star' defaultRating={this.props.item.average_rating} maxRating={5} disabled />
          <Label>Rating: {this.props.item.average_rating}</Label>
        </Item.Extra>
      </Item.Content>
    </Item>
    );
  }
}

export default Item1;

