
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'
import { getItem, newTransaction } from '../actions/itemsActions';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';


import pic from '../images/macbook.jpg';


class ItemDetails extends Component {
  componentDidMount(){
    this.props.getItem(this.props.match.params.id)
    this.handleBorrow = this.handleBorrow.bind(this);
  }

  handleBorrow(e) {
    let transaction = {item_id: this.props.item_id, status:'pending'}
    this.props.newTransaction(transaction)
  }

  render() {
    let numImages = 0
    let url =""
    let carouselItems;
    console.log("About to print item details")
    console.log(this.props.item_details)
    console.log("done printing item_details")
    console.log("print rating")
    console.log(this.props.item_details.average_rating)
    console.log("done printing rating")

    if (this.props.item_details.images){
      numImages = this.props.item_details.images.length
      url = this.props.item_details.images[0]
      carouselItems = this.props.item_details.images.map(imageSrc => {
      const keyVal = uuid();
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
          <Carousel></Carousel>
          {carouselItems ? (<Carousel showThumbs={false} width="50%" selectedItem={1}> {carouselItems} </Carousel>) : null}

          <Item.Header size = 'medium' as='a' href={'items/'+this.props.item_id}><strong>{this.props.item_details.name}</strong></Item.Header>
        <Item.Meta>
          <p>Quantity: {this.props.item_details.quantity}</p>
          <Button onClick={ this.handleBorrow }>
            Borrow
          </Button>
        </Item.Meta>
        <Item.Description>Description: {this.props.item_details.description}.</Item.Description>
        <Item.Extra>
          <Rating icon='star' rating={this.props.item_details.average_rating} maxRating={5} disabled />
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

ItemDetails.propTypes = {
  getItem: PropTypes.func.isRequired,
  newTransaction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details
});

export default connect(mapStateToProps, {getItem, newTransaction})(ItemDetails);