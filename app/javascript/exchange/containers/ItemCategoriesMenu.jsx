import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';
import PropTypes from 'prop-types';



class ItemCategoriesMenu extends Component {
  constructor(){
    super()
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  componentWillMount() {
    this.props.filterItems('All');
  }

  handleCategoryClick (e, { name }) {
    this.props.filterItems(name);
  } 

  render() {

    const { cur_category } = this.props;

    return (
      <Menu secondary fluid widths={11}>
        <Menu.Item
          name='All'
          active={cur_category === 'All'}
          onClick={this.handleCategoryClick}
        >
          All
        </Menu.Item>

        <Menu.Item name='Electronics' active={cur_category === 'Electronics'} onClick={this.handleCategoryClick}>
          Electronics
        </Menu.Item>

        <Menu.Item
          name='Sports'
          active={cur_category === 'Sports'}
          onClick={this.handleCategoryClick}
        >
          Sports
        </Menu.Item>

        <Menu.Item
          name='Tools'
          active={cur_category === 'Tools'}
          onClick={this.handleCategoryClick}
        >
          Tools
        </Menu.Item>

        <Menu.Item
          name='Music'
          active={cur_category === 'Music'}
          onClick={this.handleCategoryClick}
        >
          Music
        </Menu.Item>

        <Menu.Item
          name='Arts'
          active={cur_category === 'Arts'}
          onClick={this.handleCategoryClick}
        >
          Arts
        </Menu.Item>

        <Menu.Item
          name='Vehicles'
          active={cur_category === 'Vehicles'}
          onClick={this.handleCategoryClick}
        >
          Vehicles
        </Menu.Item>

        <Menu.Item
          name='Clothing'
          active={cur_category === 'Clothing'}
          onClick={this.handleCategoryClick}
        >
          Clothing
        </Menu.Item>

        <Menu.Item
          name='Accessories'
          active={cur_category === 'Accessories'}
          onClick={this.handleCategoryClick}
        >
          Accessories
        </Menu.Item>

        <Menu.Item
          name='Books'
          active={cur_category === 'Books'}
          onClick={this.handleCategoryClick}
        >
          Books
        </Menu.Item>

        <Menu.Item
          name='Others'
          active={cur_category === 'Others'}
          onClick={this.handleCategoryClick}
        >
          Others
        </Menu.Item>

      </Menu>
    )
  }
}

ItemCategoriesMenu.propTypes = {
  filterItems: PropTypes.func.isRequired,
  cur_category: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  cur_category: state.items.cur_category
});

export default connect(mapStateToProps, { filterItems })(ItemCategoriesMenu);
