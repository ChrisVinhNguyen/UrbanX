import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo'
import ItemListComponent from '../components/ItemListComponent'
import TransactionListComponent from '../components/TransactionListComponent'
import UserReviewsContainer from '../containers/UserReviewsContainer'
import { getMyItems , getMyTransactions, filterItems} from '../actions/itemsActions' 
import {getUserReviews} from '../actions/userActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProfileContentContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeTab: "My_Items" 
    }
  }

  componentWillMount() {
    this.props.getMyItems(this.props.userProfileId, this.props.cur_sort);
    this.props.getMyTransactions(this.props.userProfileId, 'All');
    console.log(this.props.userProfileId)
    console.log("=============================")
  }

  componentWillUpdate(prevProps){
    console.log('inside componentWillUpdate-------')
    console.log(prevProps)
    console.log(this.props)
    if (prevProps.userProfileId !== this.props.userProfileId) {
      this.props.getMyItems(prevProps.userProfileId, this.props.cur_sort);
      this.props.getMyTransactions(prevProps.userProfileId, 'All');
      this.props.getUserReviews(prevProps.userProfileId);
      this.setState({
        activeTab: "My_Items" 
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    window.onpopstate = ()=> {
        this.props.filterItems('All', this.props.cur_sort);
      }
  }

  handleOnClick(activeTab){
    console.log(activeTab);
    this.setState({
      activeTab:activeTab
    })
  }

  render() {
    console.log(this.props.viewingMyProfile)
      return (
        <div className="profile-content-container">
        <Grid columns={2} divided>
            <div className="ui pointing menu">
              <a className={`item ${this.state.activeTab == "My_Items"? "active" :""}`} onClick = {() => this.handleOnClick("My_Items")} >
                Items
              </a>
              {this.props.viewingMyProfile ?
              <a className={`item ${this.state.activeTab == "My_Transactions"? "active" :""}`} onClick = {() => this.handleOnClick("My_Transactions")}>
                Transactions
              </a>:null
              }
              <a className={`item ${this.state.activeTab == "Reviews"? "active" :""}`} onClick = {() => this.handleOnClick("Reviews")}>
                Reviews
              </a>
            </div>
            <div className="ui segment">
            { this.state.activeTab == "My_Items"? <ItemListComponent /> : null} 
            { this.state.activeTab == "My_Transactions"? <TransactionListComponent /> : null} 
            { this.state.activeTab == "Reviews"? <UserReviewsContainer reviewee_id = {this.props.userProfileId} /> : null} 
            </div>
          </Grid>
        </div>
  );
}
}
ProfileContentContainer.propTypes = {
  filterItems: PropTypes.func.isRequired,
  getMyItems: PropTypes.func.isRequired,
  getUserReviews: PropTypes.func.isRequired,
  getMyTransactions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cur_sort: state.items.cur_sort
});

export default connect(mapStateToProps, { filterItems, getMyItems, getUserReviews, getMyTransactions })(ProfileContentContainer);
