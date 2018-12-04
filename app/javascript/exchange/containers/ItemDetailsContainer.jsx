import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { displayFlash } from '../actions/flashActions';

import pic from '../images/defaultimage.png';

import { getItem, filterItems } from '../actions/itemsActions';

import ItemDetailsComponent from '../components/ItemDetailsComponent';

import ItemDetailsBorrowContainer from './ItemDetailsBorrowContainer';
import ItemReviewsContainer from './ItemReviewsContainer';


class ItemDetailsContainer extends Component {
  componentDidMount(){
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

    this.props.filterItems('All', this.props.cur_sort, '');
    this.props.history.push("/");

    this.displayMessage('Item deleted successfully', 'positive');
  }

  displayMessage(flash_message, pos_or_neg) {
    this.props.displayFlash(flash_message, true, pos_or_neg);
  }

  render() {
    let numImages = 0
    let url =""
    let processedImages = []

    if (this.props.item_details.images){  
      
      this.props.item_details.images.map(imageSrc =>{
        
        const imageObject = {
          original:imageSrc,
          thumbnail:imageSrc
        }

        processedImages.push(imageObject)
      })  

    }

    else {
      processedImages = null
    }

    let editButton = null;
    let deleteButton = null;
    let activeTransactionsMsg = null;

    if (this.props.is_signed_in) {
      let activeTransaction = this.props.my_transactions_for_current_item.find(
            (e) => e.lender_id == this.props.currentUserId);
      if (this.props.currentUserId == this.props.item_details.user_id){
        if (!activeTransaction) {
          editButton=(
            <Button as={Link} to={`/items_list/${this.props.match.params.id}/edit`}>
              Edit
            </Button>
          )
          deleteButton=(
            <Button negative onClick={this.deleteItem}>Delete</Button>
          )
        }
        else {
          activeTransactionsMsg= (
              <div>
                <strong>You may not edit or delete an item while there are active transactions involving the item. Please decline or finish them.</strong>
                <br/>
              </div>
              );
          editButton=(
              <Button disabled>
                Edit
              </Button>
          )
          deleteButton=(
            <Button disabled negative>Delete</Button>
          )
        }
      }
      else {
        editButton = (
            <div></div>
          )

        deleteButton = (
            <div></div>
          )
      }
  }

    return (
      <ItemDetailsComponent 
      item_id_prop={this.props.item_id} 
      item_name_prop={this.props.item_details.name} 
      item_condition_prop={this.props.item_details.condition}
      item_category_prop={this.props.item_details.category}
      item_quantity_prop={this.props.item_details.quantity} 
      item_value_prop={this.props.item_details.value} 
      item_owner_name_prop={this.props.item_details.item_owner}
      item_owner_profile_id_prop={this.props.item_details.item_owner_profile_id}
      item_match_param_id_prop={this.props.match.params.id} 
      current_user_id_prop={this.props.currentUserId}
      item_owner_profile_id = {this.props.currentUserProfileId}
      item_description_prop={this.props.item_details.description} 
      item_avg_rating_prop={this.props.item_details.average_rating} 
      item_details_user_id_prop={this.props.item_details.user_id} 
      item_images_prop={processedImages}
      edit_button_prop={editButton}
      delete_button_prop={deleteButton}
      active_transactions_msg_prop={activeTransactionsMsg}/>
    );
  }
}

ItemDetailsContainer.propTypes = {
  getItem: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
  item_details: PropTypes.object.isRequired,
  newTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  getMyTransactionsForItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details,
  current_viewed_item_reviews: state.items.current_viewed_item_reviews,
  currentUserId: state.user.user_info.user_id,
  currentUserProfileId: state.user.user_info.user_profile_id,
  my_transactions_for_current_item: state.items.my_transactions_for_current_item,
  cur_sort: state.items.cur_sort,
  is_signed_in: state.user.is_signed_in
});

export default connect(mapStateToProps, {getItem, filterItems, displayFlash})(ItemDetailsContainer);
