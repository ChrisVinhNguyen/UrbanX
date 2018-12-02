import React, { Component } from 'react';
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TransactionSummaryActionContainer from '../containers/TransactionSummaryActionContainer.jsx';

import '../stylesheets/transaction-summary.scss';

import pic from '../images/macbook.jpg';


class TransactionSummary extends Component {
  render() {
    let returnDate = null;
    let lendDate = null;
    let dueDate = null;
    let dateContainer = null;
    let itemName = null;


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

    if (this.props.transaction.deleted) {
      itemName = <strong>{this.props.transaction.item_name} (Removed by owner)</strong>;
    }
    else {
      itemName = (
                  <Link to={ `/items_list/${this.props.transaction.item_id}` }>
                    <strong>{this.props.transaction.item_name}</strong>
                  </Link>
                );
    }

    return (
      
      <Item key={ this.props.transaction.id }>
        <Item.Image as='a' size = 'medium' src={this.props.transaction.image? this.props.transaction.image : pic} />

        <Item.Content>
          <Item.Header size = 'medium'>
            {itemName}
          </Item.Header>
          <Item.Meta>
          </Item.Meta>
          <Item.Description>
            <div className="transaction-summary">
              <p>
                Status: {this.props.transaction.status == 'lent' ? 'In progress'
                 : this.props.transaction.status.charAt(0).toUpperCase() + this.props.transaction.status.slice(1)} 
              </p>
              <p>
                Lender: {this.props.transaction.lender_name} 
              </p>
              <p>
                Borrower: {this.props.transaction.borrower_name}
              </p>
              {lendDate}
              {dueDate}
              {returnDate}
            </div>

            <TransactionSummaryActionContainer transaction = {this.props.transaction} />
          </Item.Description>
        </Item.Content>
      </Item>

    );
  }
} 

const mapStateToProps = state => ({
  cur_status: state.items.cur_status
});

export default connect(mapStateToProps, {})(TransactionSummary);
