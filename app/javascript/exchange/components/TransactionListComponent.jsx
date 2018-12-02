import React, { Component } from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header, Rating, Item } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import pic from '../images/macbook.jpg';
import TransactionSummary from './TransactionSummary'
import TransactionFilterContainer from '../containers/TransactionFilterContainer'

class TransactionListComponent extends Component {


  render() {
    console.log(this.props.filtered_transactions)
    let transactions = this.props.filtered_transactions.map(transaction => {
      return(
        <TransactionSummary key = { transaction.id } transaction = { transaction } />
      );
    });
    return (
      <div className="body">
        <TransactionFilterContainer userProfileId = { this.props.userProfileId } />
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
  userProfileId: state.user.user_info.user_profile_id
});

export default connect(mapStateToProps, {})(TransactionListComponent);