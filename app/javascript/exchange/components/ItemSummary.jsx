import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';

import pic from '../images/macbook.jpg';


class ItemSummary extends Component {
  render() {
    const { id, name, user_profile_id, owner, quantity, description, average_rating } = this.props.item;

    return (
      <Item>
      <Link to={ `/items_list/${id}` }>
        <Item.Image size ='medium' src={ pic } />
      </Link>
      <Item.Content>
        <Link to={ `/items_list/${id}` }>
          <Item.Header size = 'medium' onClick={this.handleItemClick}>
            <strong>
              { name }
            </strong>
          </Item.Header>
        </Link>
        <Item.Meta>
          <Link to={ `/user_profiles/${user_profile_id}` }>
            { owner }
          </Link>
          <p>Quantity: { quantity }</p>
        </Item.Meta>
        <Item.Description>
          Description: { description }.
        </Item.Description>
        <Item.Extra>
          <Rating icon='star' rating={ average_rating } maxRating={5} disabled />
          <Label>
            Rating: { average_rating }
          </Label>
        </Item.Extra>
      </Item.Content>
      <Divider/>
    </Item>
    );
  }
} 

export default connect(()=> { return {} }, { getItem })(ItemSummary);
