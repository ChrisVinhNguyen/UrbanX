import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { newTransaction, deleteTransaction, getMyTransactionsForItem } from '../actions/itemsActions';
import PropTypes from 'prop-types';

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class ItemDetailsBorrowContainer extends Component {
  constructor(props) {
  	super(props);
    if (this.props.currentUserId) {
      this.props.getMyTransactionsForItem(this.props.item_id, this.props.currentUserId);
    }
    this.handleBorrow = this.handleBorrow.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillUpdate(prevProps) {
    if (this.props.currentUserId != prevProps.currentUserId) {
      this.props.getMyTransactionsForItem(prevProps.item_id, prevProps.currentUserId);
    }
  }

  handleBorrow(e) {
    let transaction = {item_id: this.props.item_id, status:'pending'};
    this.props.newTransaction(transaction, this.props.userProfileId, this.props.cur_status);
  }

  handleCancel(e, transaction) {
    this.props.deleteTransaction(transaction, this.props.userProfileId, this.props.cur_status);
  }

  render() {
    let borrowButton = null;

  	if (this.props.is_signed_in) {
      if (this.props.item_details.status == 'available' && this.props.currentUserId != this.props.item_details.user_id) {
        let request = this.props.my_transactions_for_current_item.find(
          (e) => e.status == 'pending' && e.borrower_id == this.props.currentUserId);
        if (request) {
          borrowButton = (
            <Button onClick={ e => this.handleCancel(e, request) }>
              Cancel request
            </Button>
            );
        }
        else {
          borrowButton = (
            <Button onClick={ this.handleBorrow }>
              Borrow
            </Button>
            );
        }
      }
      else {
        if (this.props.currentUserId != this.props.item_details.user_id) {
          borrowButton = (
            <Button disabled>
              Item unavailable
            </Button>
          );
        }
      }
    }
    else {
      borrowButton = (
        <div>
          <Header as='h3' dividing>
            Please sign in/sign up to borrow
          </Header>
          <div>
            <span>
              <SignUpButton />
              or
              <SignInButton />
            </span>
          </div>
        </div>
        );
    }

    return (
    		<div>
    			{borrowButton}
    		</div>
    		);

  }
}


ItemDetailsBorrowContainer.propTypes = {
  newTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
  getMyTransactionsForItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  // item_id: state.items.item_id,
  item_details: state.items.item_details,
  current_viewed_item_reviews: state.items.current_viewed_item_reviews,
  // filtered_transactions: state.items.filtered_transactions,
  // currentUserId: state.user.user_info.user_profile_id,
  my_transactions_for_current_item: state.items.my_transactions_for_current_item,
  cur_status: state.items.cur_status,
  is_signed_in: state.user.is_signed_in
});

export default connect(mapStateToProps, { newTransaction, deleteTransaction, getMyTransactionsForItem})(ItemDetailsBorrowContainer);