import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getMyTransactions } from '../actions/itemsActions';

import PropTypes from 'prop-types';



class TransactionFilterContainer extends Component {
  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect (e, { value }) {
    // let cur_list = this.props.original_list;
    // console.log(this.props.original_list);
    console.log(this.props.filtered_transactions);

    if (value == 'All') {
      this.props.getMyTransactions(this.props.userProfileId, value);
    }

    else if (value == 'Pending') {
      this.props.getMyTransactions(this.props.userProfileId, 'pending');
    }

    else if (value == 'In progress') {
      this.props.getMyTransactions(this.props.userProfileId, 'lent');
    }

    else if (value == 'Overdue') {
      this.props.getMyTransactions(this.props.userProfileId, 'overdue');
    }

    else if (value == 'Completed') {
      this.props.getMyTransactions(this.props.userProfileId, 'completed');
    }

    console.log(this.props.filtered_transactions);
    // // console.log(this.props.cur_sort);
  } 

  render() {
    let sortOptions = [
      {
        text: 'All',
        value: 'All'
      },
      {
        text: 'Pending',
        value: 'Pending'
      },
      {
        text: 'In progress',
        value: 'In progress'
      },
      {
        text: 'Overdue',
        value: 'Overdue'
      },
      {
        text: 'Completed',
        value: 'Completed'
      }
    ];
    let cur_selected;
    if (this.props.cur_status == 'All') {
      cur_selected = sortOptions[0].value;
    }
    else if (this.props.cur_status == 'pending') {
      cur_selected = sortOptions[1].value;
    }
    else if (this.props.cur_status == 'lent') {
      cur_selected = sortOptions[2].value;
    }
    else if (this.props.cur_status == 'overdue') {
      cur_selected = sortOptions[3].value;
    }
    else if (this.props.cur_status == 'completed') {
      cur_selected = sortOptions[4].value;
    }
    return (
      <div>
        <p align="right">
          <Dropdown selection defaultValue={cur_selected} direction="left" options={sortOptions} onChange={ this.handleSelect }/>
        </p>
      </div>
    )
  }
}

TransactionFilterContainer.propTypes = {
  filtered_transactions: PropTypes.array.isRequired,
  cur_status: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  filtered_transactions: state.items.filtered_transactions,
  cur_status: state.items.cur_status
});

export default connect(mapStateToProps, { getMyTransactions })(TransactionFilterContainer);
