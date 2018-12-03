import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'
import { getItem } from '../actions/itemsActions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import ItemDetailsContainer from '../containers/ItemDetailsContainer'
import ItemDetailsBorrowContainer from '../containers/ItemDetailsBorrowContainer';
import pic from '../images/macbook.jpg';

class ItemDetailsComponent extends Component {

  render() {
    return (
      <div>
        <Item>
          <Item.Content>
          
          
          {this.props.carousel_items_prop ? (<Carousel width ="30%" dynamicHeight={true} showThumbs={false} showStatus={false} selectedItem={1}> {this.props.carousel_items_prop} </Carousel>) : null}

          <Item.Header size = 'medium' as='a' ><strong>{this.props.item_name_prop}</strong></Item.Header>
        <Item.Meta>
          <p>Quantity: {this.props.item_quantity_prop}</p>
          
          <ItemDetailsBorrowContainer item_id={ this.props.item_match_param_id_prop} currentUserId={ this.props.current_user_id_prop } userProfileId={ this.props.item_owner_profile_id }/>
        </Item.Meta>
        <Item.Description>Description: {this.props.item_description_prop}.</Item.Description>
        {this.props.active_transactions_msg_prop}
        {this.props.edit_button_prop}
        {this.props.delete_button_prop}
        <Item.Extra>
          <Rating icon='star' rating={this.props.item_avg_rating_prop} maxRating={5} disabled />
          <Label>Rating: {this.props.item_avg_rating_prop}</Label>
        </Item.Extra>
      </Item.Content>
        </Item>
        <ItemReviewsContainer current_viewed_item_id={this.props.item_match_param_id_prop} item_owner_profile_id={this.props.item_owner_profile_id} item_owner_user_id={this.props.item_details_user_id_prop}/>
      </div>
    );
  }
}

export default ItemDetailsComponent;