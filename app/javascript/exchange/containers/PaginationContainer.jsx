import React, { Component } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Pagination} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { filterItems,getMyItems } from '../actions/itemsActions';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';



class PaginationContainer extends Component {
  constructor(){
    super()
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick (e, { activePage }) {
    console.log(activePage)
    if(this.props.location.pathname.includes('user_profiles_show')){
      var current_user_profile_id = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1]
      this.props.getMyItems(current_user_profile_id, this.props.cur_sort, activePage);
    }
    else{
      this.props.filterItems(this.props.cur_category, this.props.cur_sort, this.props.search_value, activePage);
    }
  } 

  render() {
  	console.log(this.props.total_pages)
    return (
     	<Pagination defaultActivePage={1} totalPages={this.props.total_pages} onPageChange={this.handlePageClick}/>
    )
  }
}

PaginationContainer.propTypes = {
  filterItems: PropTypes.func.isRequired,
  getMyItems: PropTypes.func.isRequired,
  cur_category: PropTypes.string.isRequired,
  total_pages: PropTypes.number.isRequired,
  search_value: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  cur_category: state.items.cur_category,
  cur_sort: state.items.cur_sort,
  total_pages: state.items.total_pages,
  search_value: state.items.search_value
});

export default withRouter(connect(mapStateToProps, { filterItems,getMyItems })(PaginationContainer));
