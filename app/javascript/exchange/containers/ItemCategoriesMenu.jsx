import React, { Component } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import { ITEM_CATEGORIES } from '../constants/itemCategories';


class ItemCategoriesMenu extends Component {
  constructor(){
    super()
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentWillMount() {
    this.props.filterItems('All');
  }

  handleCategoryClick (e, { name }) {
    this.props.filterItems(name, this.props.cur_sort);
    this.props.history.push("/");
  } 

  render() {
    const { cur_category } = this.props;

    const menuItems = _.map(ITEM_CATEGORIES, (value, key) => {
      const keyVal = uuid();
      return (
        <Menu.Item
          key={ keyVal }
          name={ value }
          active={ cur_category === value }
          onClick={ this.handleCategoryClick }
        >
          { value }
        </Menu.Item>
      )
    });

    return (
      <Menu secondary fluid widths={11} className="item-categories-menu">
        { menuItems }
      </Menu>
    )
  }
}

ItemCategoriesMenu.propTypes = {
  filterItems: PropTypes.func.isRequired,
  cur_category: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  cur_category: state.items.cur_category,
  cur_sort: state.items.cur_sort
});

export default withRouter(connect(mapStateToProps, { filterItems })(ItemCategoriesMenu));
