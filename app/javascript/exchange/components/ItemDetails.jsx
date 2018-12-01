
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

import ItemDetailsBorrowContainer from '../containers/ItemDetailsBorrowContainer';

import pic from '../images/macbook.jpg';


class ItemDetails extends Component {

  componentDidMount(){
    console.log("componentDidMount")
    this.props.getItem(this.props.match.params.id)
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(){
    $.ajax({
      url: `/items/${this.props.match.params.id}`,
      method: 'DELETE'
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );

    console.log(this.props.match.params.id)
    this.props.history.push("/")
  }

  render() {
    console.log("##############################")
    let numImages = 0
    let url =""
    let carouselItems;
    console.log("About to print item details")
    console.log(this.props.item_details)
    console.log(this.props)
    console.log("inside item item_details")
    if (this.props.item_details.images){
      numImages = this.props.item_details.images.length
      url = this.props.item_details.image
      console.log("making carousel items")
      console.log(this.props.item_details)
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

    let editButton = null;
    let deleteButton = null;



    if (this.props.currentUserId == this.props.item_details.user_id){
      editButton=(
        <Button>
          <Link to={`/items_list/${this.props.match.params.id}/edit`}>
          Edit
          </Link>
        </Button>
      )
      deleteButton=(
        <Button negative onClick={this.deleteItem}>Delete</Button>
      )
    }
    else {
      editButton = (
          <div></div>
        )

      deleteButton = (
          <div></div>
        )
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
          
          <ItemDetailsBorrowContainer item_id={ this.props.match.params.id} currentUserId={ this.props.currentUserId } />
        </Item.Meta>
        <Item.Description>Description: {this.props.item_details.description}.</Item.Description>
        {editButton}
        {deleteButton}
        <Item.Extra>
          <Rating icon='star' rating={this.props.item_details.average_rating} maxRating={5} disabled />
          <Label>Rating: {this.props.item_details.average_rating}</Label>
        </Item.Extra>
      </Item.Content>
        </Item>
        <ItemReviewsContainer current_viewed_item_id={this.props.match.params.id} item_owner={this.props.item_details.user_id}/>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  getItem: PropTypes.func.isRequired,
  item_details: PropTypes.object.isRequired,
  newTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  getMyTransactionsForItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details,
  current_viewed_item_reviews: state.items.current_viewed_item_reviews,
  // filtered_transactions: state.items.filtered_transactions,
  currentUserId: state.user.user_info.user_profile_id,
  my_transactions_for_current_item: state.items.my_transactions_for_current_item,
  cur_status: state.items.cur_status,
  is_signed_in: state.user.is_signed_in
});

export default connect(mapStateToProps, {getItem})(ItemDetails);