import React, { Component } from 'react';
import { Button, Icon, Image, Form, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { updateTransaction, deleteTransaction } from '../actions/itemsActions' 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class TransactionSummaryLendContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      due_date: '',
      status: this.props.transaction.status
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLend = this.handleLend.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state.due_date)
  }

  handleLend(e, transaction) {
    transaction.expiry_date = this.state.due_date;
    transaction.status = 'lent';
    this.props.updateTransaction(transaction, this.props.userProfileId, this.props.cur_status);

  }

  handleReturn(e, transaction) {
    transaction.status = 'completed';
    this.props.updateTransaction(transaction, this.props.userProfileId, this.props.cur_status);

  }

  handleDelete(e, transaction) {
    this.props.deleteTransaction(transaction, this.props.userProfileId, this.props.cur_status);
  }

  render() {
    let dueDateForm = null;
    let declineButton = null;
    let returnButton = null;

    let due_date = this.state.due_date;

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

      declineButton = (
                        <Button floated="right" onClick={ e => this.handleDelete(e, this.props.transaction) }>
                          Decline
                        </Button>
                      );
    }
    else if (this.props.transaction.status == 'pending' && this.props.transaction.borrower_id == this.props.currentUserId) {
      declineButton = (
                        <Button floated="right" onClick={ e => this.handleDelete(e, this.props.transaction) }>
                          Cancel
                        </Button>
                      );
    }
    else if (this.props.transaction.status == 'lent' && this.props.transaction.lender_id == this.props.currentUserId) {
      returnButton = (
                      <Button floated="right" onClick={ e => this.handleReturn(e, this.props.transaction) }>
                        Returned
                      </Button>
                      );
    }

    return (
	    	<div>
	    		{returnButton}
		        {dueDateForm}
		        {declineButton}
		    </div>
    		);
	}
}

TransactionSummaryLendContainer.propTypes = {
  updateTransaction: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  cur_status: state.items.cur_status,
  currentUserId: state.user.user_info.user_id,
  userProfileId: state.user.user_info.user_profile_id
});

export default connect(mapStateToProps, { updateTransaction, deleteTransaction })(TransactionSummaryLendContainer);