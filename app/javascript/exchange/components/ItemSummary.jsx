
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';

import pic from '../images/macbook.jpg';


class ItemSummary extends Component {
  constructor(){
    super()
    this.handleItemClick = this.handleItemClick.bind(this)
  }

handleItemClick(){
  this.props.getItem(this.props.item.id)
}

  render() {
    console.log(this.props.item)
    return (
      <Item>
      <Link to={'items/'+this.props.item.id}>
      <Item.Image as='a' size = 'medium' src={pic} onClick={this.handleItemClick}/>
      </Link>
      <Item.Content>
        <Link to={'items/'+this.props.item.id}>
          <Item.Header size = 'medium' as='a' onClick={this.handleItemClick}><strong>{this.props.item.name}</strong></Item.Header>
        </Link>
        <Item.Meta>
          <Link to={'/user_profiles/'+ this.props.item.user_profile_id}>{this.props.item.owner}</Link>
          <p>Quantity: {this.props.item.quantity}</p>
        </Item.Meta>
        <Item.Description>Description: {this.props.item.description}.</Item.Description>
        <Item.Extra>
          <Rating icon='star' defaultRating={this.props.item.average_rating} maxRating={5} disabled />
          <Label>Rating: {this.props.item.average_rating}</Label>
        </Item.Extra>
      </Item.Content>
      <Divider/>
    </Item>
    );
  }
}

export default connect( ()=> {return {}}, { getItem })(ItemSummary);
