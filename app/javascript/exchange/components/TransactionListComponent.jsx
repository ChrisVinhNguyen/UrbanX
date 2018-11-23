import React, { Component } from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header, Rating, Item } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import pic from '../images/macbook.jpg';

class TransactionListComponent extends Component {

  render() {
    console.log(this.props.filtered_transactions)
    let transactions = this.props.filtered_transactions.map(transaction => {
      return (
        <Item>
          <Item.Image as='a' size = 'medium' src={pic} />

          <Item.Content>
            <Item.Header size = 'medium'><strong>{transaction.item_name}</strong></Item.Header>
            <Item.Meta>
              <p>Status: {transaction.status} </p>
            </Item.Meta>
            <Item.Description>
              <p>Lender: {transaction.lender_name} </p>
              <p>Borrower: {transaction.borrower_name} </p>
            </Item.Description>
          </Item.Content>
        </Item>
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
  filtered_transactions: state.items.filtered_transactions
});

export default connect(mapStateToProps, {})(TransactionListComponent);