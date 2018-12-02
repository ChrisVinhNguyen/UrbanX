import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, Card } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';

import pic from '../images/macbook.jpg';


class ItemSummary extends Component {
  render() {
    const { id, name, user_profile_id, owner, quantity, description, average_rating, images} = this.props.item;

    let url;

    if (this.props.item.images && this.props.item.images.length > 0){
      url = this.props.item.images[0];
    }
    else {
      url = "https://react.semantic-ui.com/images/wireframe/image.png"
    } 

    return (
      <Card centered>
        <Link to={ `/items_list/${id}` }>
          <Image size='medium' src={url} />
        </Link>
        <Card.Content>
          <Card.Header>
            <Link to={ `/items_list/${id}` }>{ name }</Link>
          </Card.Header>
          <Card.Meta>
            <Link to={ `/user_profiles_show/${user_profile_id}` }>
              <span className='owner-name'>{ owner }</span>
            </Link>
          </Card.Meta>
          <Card.Meta>
            <span className='owner-name'>Quantity: { quantity }</span>
          </Card.Meta>
          <Card.Description>{ description }</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rating icon='star' rating={ average_rating } maxRating={5} disabled />
           <Label>
             Rating: { average_rating }
           </Label>
        </Card.Content>
      </Card>
    )
  }
} 

export default connect(()=> { return {} }, { getItem })(ItemSummary);
