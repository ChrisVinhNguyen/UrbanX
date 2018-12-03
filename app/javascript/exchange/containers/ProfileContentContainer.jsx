import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Menu, Segment, Input } from 'semantic-ui-react';

import { getMyItems, getMyTransactions, filterItems } from '../actions/itemsActions' ;
import { getUserReviews } from '../actions/userActions'

import UserProfileInfo from '../components/UserProfileInfo';
import ItemListComponent from '../components/ItemListComponent';
import TransactionListComponent from '../components/TransactionListComponent';
import UserReviewsContainer from '../containers/UserReviewsContainer';


class ProfileContentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 'My_Items'
    };
  }

  componentWillMount() {
    this.props.getMyItems(this.props.userProfileId, this.props.cur_sort);
    this.props.getMyTransactions(this.props.userProfileId, 'All');
  }

  componentWillUpdate(prevProps) {
    if (prevProps.userProfileId !== this.props.userProfileId) {
      this.props.getMyItems(prevProps.userProfileId, this.props.cur_sort);
      this.props.getMyTransactions(prevProps.userProfileId, 'All');
      this.props.getUserReviews(prevProps.userProfileId);
      this.setState({
        activeTab: 'My_Items'
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    window.onpopstate = () => {
        this.props.filterItems('All', this.props.cur_sort);
      }
  }

  handleOnClick(activeTab) {
    this.setState({ activeTab: activeTab })
  }

  render() {

    const { activeTab } = this.state;

    return (
      <div className="profile-content-container">
        <Grid columns={2} divided>
          <Menu pointing>
            <Menu.Item
              name='My Items'
              active={activeTab === 'My_Items'}
              onClick={() => this.handleOnClick('My_Items')}
            />
            <Menu.Item
              name='My Transactions'
              active={activeTab === 'My_Transactions'}
              onClick={() => this.handleOnClick('My_Transactions')}
            />
            <Menu.Item
              name='My Reviews'
              active={activeTab === 'Reviews'}
              onClick={() => this.handleOnClick('Reviews')}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input disabled icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment>
            { this.state.activeTab == 'My_Items'? <ItemListComponent /> : null }
            { this.state.activeTab == 'My_Transactions'? <TransactionListComponent /> : null }
            { this.state.activeTab == 'Reviews'? <UserReviewsContainer reviewee_id={this.props.userProfileId} /> : null }
          </Segment>
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
