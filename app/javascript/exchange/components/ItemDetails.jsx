
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
    console.log("before iprinting item datils")
    console.log(this.props.item_details)
    console.log(this.props)
    console.log("inside item item_details")
    if (this.props.item_details.image){
      // numImages = this.props.item_details.images.length
      url = this.props.item_details.image
      console.log("making carousel items")
      // carouselItems = this.props.item_details.images.map(imageSrc => {
      // const keyVal = uuid();
      // console.log("done generating uuid")
      // console.log(imageSrc)
      //   return (
      //     <div key={keyVal}>
      //       <img src={imageSrc} />
      //       <p className="legend">{keyVal}</p>
      //     </div>
      //   )
      // })
    }
    else{
      console.log("COURSEL IS NULL")
      console.log(carouselItems)
      carouselItems = null
    }


    return (
      <div>
        <Item>
          <Item.Content>
          <img src= {url}/>
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

ItemDetails.propTypes = {
  getItem: PropTypes.func.isRequired,
  newTransaction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details
});

export default connect(mapStateToProps, {getItem, newTransaction})(ItemDetails);