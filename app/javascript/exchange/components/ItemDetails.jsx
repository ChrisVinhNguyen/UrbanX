
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'
import { getItem } from '../actions/itemsActions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';


import pic from '../images/macbook.jpg';


class ItemDetails extends Component {
  componentDidMount(){
    this.props.getItem(this.props.match.params.id)
  }
  render() {
    let numImages = 0
    let url =""
    let carouselItems;
    console.log("before iprinting item datils")
    console.log(this.props.item_details)
    console.log(this.props)
    console.log("inside item item_details")
    if (this.props.item_details.images){
      numImages = this.props.item_details.images.length
      url = this.props.item_details.images[0]
      console.log("making carousel items")
      carouselItems = this.props.item_details.images.map(imageSrc => {
      const keyVal = uuid();
      console.log("done generating uuid")
      console.log(imageSrc)
        return (
          <div key={keyVal}>
            <img src={imageSrc} />
            <p className="legend">{keyVal}</p>
          </div>
        )
      })
    }
    else{
      carouselItems = null
    }


    return (
      <div>
        <Item>
          <Item.Content>
          {carouselItems ? (<Carousel showThumbs={false} selectedItem={0}> {carouselItems} </Carousel>) : null}
          <Item.Header size = 'medium' as='a' href={'items/'+this.props.item_id}><strong>{this.props.item_details.name}</strong></Item.Header>
        <Item.Meta>
          <p>Quantity: {this.props.item_details.quantity}</p>
        </Item.Meta>
        <Item.Description>Description: {this.props.item_details.description}.</Item.Description>
        <Item.Extra>
          <Rating icon='star' defaultRating={this.props.item_details.average_rating} maxRating={5} disabled />
          <Label>Rating: {this.props.item_details.average_rating}</Label>
        </Item.Extra>
      </Item.Content>
        </Item>
        <ItemReviewsContainer current_viewed_item_id={this.props.match.params.id} test="test"/>
          <p>
            Reviews
          </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details
});

export default connect(mapStateToProps, {getItem})(ItemDetails);