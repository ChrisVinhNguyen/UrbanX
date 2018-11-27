import React, { Component } from 'react';
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { updateTransaction } from '../actions/itemsActions' 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import pic from '../images/macbook.jpg';


class TransactionSummary extends Component {
  handleLend(e, transaction, due_date) {
    transaction.expiry_date = due_date;
    transaction.status = 'lent';
    this.props.updateTransaction(transaction);
  }

  render() {
    let dueDate;
    let due_date;
    
    if (this.props.transaction.status == 'pending' && this.props.transaction.lender_id == this.props.currentUserId) {
      dueDate = (
                    <Form className="new-item-form" onSubmit={ e => this.handleLend(e, this.props.transaction, due_date) }>
                      <Form.Field>
                        <label>Due Date</label>
                          <Form.Input type="date" placeholder="Due Date"
                           name="due_date" value={ due_date } />
                      </Form.Field>

                      <Form.Button floated="right" content="Submit">
                        Lend
                      </Form.Button>
                    </Form>
                )
    }
    else {
      dueDate = null;
    }

    return (
      
      <Item key={ this.props.transaction.id }>
        <Item.Image as='a' size = 'medium' src={pic} />

        <Item.Content>
          <Item.Header size = 'medium'>
            <strong>{this.props.transaction.item_name}</strong>
          </Item.Header>
          <Item.Meta>
            <p>Status: {this.props.transaction.status} </p>
          </Item.Meta>
          <Item.Description>
            <p>Lender: {this.props.transaction.lender_name} </p>
            <p>Borrower: {this.props.transaction.borrower_name} </p>

            {dueDate}
          </Item.Description>
        </Item.Content>
      </Item>

    );
  }
} 

TransactionSummary.propTypes = {
  updateTransaction: PropTypes.func.isRequired
}

export default connect(()=> { return {} }, { updateTransaction })(TransactionSummary);
