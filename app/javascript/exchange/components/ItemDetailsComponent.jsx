import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react'
import { Rating, Divider, Grid } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'
import { getItem } from '../actions/itemsActions';
import ImageGallery from 'react-image-gallery';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import ItemDetailsContainer from '../containers/ItemDetailsContainer'
import ItemDetailsBorrowContainer from '../containers/ItemDetailsBorrowContainer';
import pic from '../images/defaultimage.png';
import "react-image-gallery/styles/css/image-gallery.css";
// import '../stylesheets/image-gallery.css';

import '../stylesheets/item-details-component.scss';


class ItemDetailsComponent extends Component {
  render() {
    const imageGallery = (
      <ImageGallery items={this.props.item_images_prop}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showThumbnails={false}
        showIndex={false}
        showBullets={false}
        showPlayButton={false}
        autoPlay={true}
        lazyLoad={true}
        slideDuration={450}
        slideInterval={8000}
      />
    );

    return (
      <div>
        <Item.Group>
          <Item>
            { this.props.item_images_prop && this.props.item_images_prop.length > 0 ?
              imageGallery :
              <Image className="image-gallery" size='medium' src={pic} />
            }
            <Item.Content className="item-details-content">
              <Item.Header className="item-details-header" size='huge' as='h1' ><strong>{this.props.item_name_prop}</strong></Item.Header>
              <Item.Meta>
                <p>Quantity: {this.props.item_quantity_prop}</p>
              </Item.Meta>
              <Item.Description> 
                <Link to={'/user_profiles_show/'+ this.props.item_owner_profile_id_prop}>
                  {this.props.item_owner_name_prop}
                </Link>
              </Item.Description>
              <Item.Description>Description: {this.props.item_description_prop}</Item.Description>
              <Item.Description>Category: {this.props.item_category_prop}</Item.Description>
              <Item.Description>Condition: {this.props.item_condition_prop}</Item.Description>
              <Item.Description>Value: {this.props.item_value_prop}</Item.Description>
              <Item.Extra>
                <Rating icon='star' rating={this.props.item_avg_rating_prop} maxRating={5} disabled />
                <Label>Rating: {this.props.item_avg_rating_prop}</Label>
              </Item.Extra>

              <Item.Meta className="item-details-buttons-container">
                {this.props.active_transactions_msg_prop}
                {this.props.edit_button_prop}
                {this.props.delete_button_prop}
                <ItemDetailsBorrowContainer item_id={ this.props.item_match_param_id_prop} currentUserId={ this.props.current_user_id_prop } userProfileId={ this.props.item_owner_profile_id }/>
              </Item.Meta>

            </Item.Content>
          </Item>
        </Item.Group>
        <ItemReviewsContainer current_viewed_item_id={this.props.item_match_param_id_prop} item_owner_profile_id={this.props.item_owner_profile_id} item_owner_user_id={this.props.item_details_user_id_prop}/>
      </div>
    );
  }
}

export default ItemDetailsComponent;
