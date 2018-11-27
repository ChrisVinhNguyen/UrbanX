import React, { Component } from 'react';
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { updateTransaction } from '../actions/itemsActions' 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import pic from '../images/macbook.jpg';


class TransactionSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      due_date: '',
      status: this.props.transaction.status
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLend = this.handleLend.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state.due_date)
  }

  handleLend(e, transaction) {
    transaction.expiry_date = this.state.due_date;
    transaction.status = 'lent';
    this.props.updateTransaction(transaction, this.props.currentUserId);

  }

  handleReturn(e, transaction) {
    transaction.status = 'completed';
    this.props.updateTransaction(transaction, this.props.currentUserId);

  }

  render() {
    let dueDateForm = null;
    let returnButton = null;
    let returnDate = null;
    let lendDate = null;
    let dueDate = null;
    let due_date = this.state.due_date;

    if (this.props.transaction.status != 'pending') {
      lendDate = (
                <p>Lend Date: {String(this.props.transaction.lend_date).split('T')[0]} </p>
                );

      dueDate = (
                <p>Due Date: {String(this.props.transaction.expiry_date).split('T')[0]} </p>
                );
      if (this.props.transaction.status == 'completed') {
        returnDate = (
                    <p>Return Date: {String(this.props.transaction.return_date).split('T')[0]} </p>
                    );
      }
    }

    if (this.props.transaction.status == 'pending' && this.props.transaction.lender_id == this.props.currentUserId) {
      dueDateForm = (
                    <Form className="new-item-form" onSubmit={ e => this.handleLend(e, this.props.transaction) }>
                      <Form.Field>
                        <label>Due Date</label>
                          <Form.Input type="date" placeholder="Due Date"
                           name="due_date" value={ due_date } onChange={ this.handleChange }/>
                      </Form.Field>

                      <Form.Button floated="right" content="Submit">
                        Lend
                      </Form.Button>
                    </Form>
                );
    }
    else if (this.props.transaction.status == 'lent' && this.props.transaction.lender_id == this.props.currentUserId) {
      returnButton = (
                      <Button floated="right" onClick={  e => this.handleReturn(e, this.props.transaction) }>
                        Returned
                      </Button>
                      );
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
            {lendDate}
            {dueDate}
            {returnDate}

            {returnButton}
            {dueDateForm}
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
