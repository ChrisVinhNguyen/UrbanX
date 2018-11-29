import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo'
import ItemListComponent from '../components/ItemListComponent'
import TransactionListComponent from '../components/TransactionListComponent'
import UserReviewsContainer from '../containers/UserReviewsContainer'
import { getMyItems , getMyTransactions} from '../actions/itemsActions' 
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
    this.props.getMyItems(this.props.userProfileId);
    this.props.getMyTransactions(this.props.userProfileId);
    console.log(this.props.userProfileId)
    console.log("=============================")
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
              <a className={`item ${this.state.activeTab == "My_Transactions"? "active" :""}`} onClick = {() => this.handleOnClick("My_Transactions")}>
                Transactions
              </a>
              <a className={`item ${this.state.activeTab == "Reviews"? "active" :""}`} onClick = {() => this.handleOnClick("Reviews")}>
                Reviews
              </a>
              <div className="right menu">
                <div className="item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..."/>
                    <i className="search link icon"></i>
                  </div>
                </div>
              </div>
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
  getMyItems: PropTypes.func.isRequired,
  getMyTransactions: PropTypes.func.isRequired,
}


export default connect(() => {return {}}, { getMyItems, getMyTransactions })(ProfileContentContainer);
