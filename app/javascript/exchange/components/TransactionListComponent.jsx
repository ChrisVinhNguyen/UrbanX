import React, { Component } from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header, Rating, Item } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import pic from '../images/macbook.jpg';
import TransactionSummary from './TransactionSummary'

class TransactionListComponent extends Component {


  render() {
    console.log(this.props.filtered_transactions)
    let transactions = this.props.filtered_transactions.map(transaction => {
      return(
        <TransactionSummary transaction = { transaction } currentUserId = { this.props.currentUserId } />
      );
    });
    return (
      <div className="body">
        <Item.Group divided>
          {transactions}
        </Item.Group>
      </div>
    );
  }
}

TransactionListComponent.propTypes = {
  filtered_transactions: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  filtered_transactions: state.items.filtered_transactions,
  currentUserId: state.user.user_info.user_profile_id
});

export default connect(mapStateToProps, {})(TransactionListComponent);