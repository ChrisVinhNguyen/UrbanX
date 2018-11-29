import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortItems, filterItems } from '../actions/itemsActions';

import PropTypes from 'prop-types';



class ItemSortDropdownContainer extends Component {
  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  // componentWillMount() {
  //   this.state.original_list = this.props.filtered_items;
  // }

  handleSelect (e, { value }) {
    console.log(this.props.filtered_items);
    let cur_list = this.props.filtered_items;

    if (value == 'Default') {
      this.props.filterItems(this.props.cur_category);
      this.props.sortItems(this.props.filtered_items, value);
    }

    else if (value == 'Newest') {
      const sorted_list = cur_list.sort(
        (a, b) => new Date(String(b.date_posted).split('T')[0]) - new Date(String(a.date_posted).split('T')[0]));

      console.log(sorted_list);
      this.props.sortItems(sorted_list, value);
    }

    else if (value == 'Oldest') {
      const sorted_list = cur_list.sort(
        (a, b) => new Date(String(a.date_posted).split('T')[0]) - new Date(String(b.date_posted).split('T')[0]));

      console.log(sorted_list);
      this.props.sortItems(sorted_list, value);
    }

    console.log(this.props.filtered_items);
    console.log(this.props.cur_sort);
  } 

  render() {
    // const { cur_category } = this.props;

    // const menuItems = sortOptions.map(ITEM_CATEGORIES, (value, key) => {
    //   const keyVal = uuid();
    //   return (
    //     <Menu.Item
    //       key={ keyVal }
    //       name={ value }
    //       active={ cur_category === value }
    //       onClick={ this.handleCategoryClick }
    //     >
    //       { value }
    //     </Menu.Item>
    //   )
    // });
    let sortOptions = [
      {
        text: 'Default',
        value: 'Default'
      },
      {
        text: 'Newest',
        value: 'Newest'
      },
      {
        text: 'Oldest',
        value: 'Oldest'
      }
      // {
      //   text: 'Average Rating',
      //   value: 'Average Rating'
      // }
    ];
    return (
      <div>
        <p align="right">
          Sort by{'  '}
          <Dropdown inline defaultValue={sortOptions[0].value} direction="left" options={sortOptions} onChange={ this.handleSelect }/>
        </p>
      </div>
    )
  }
}

ItemSortDropdownContainer.propTypes = {
  filtered_items: PropTypes.array.isRequired,
  cur_sort: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  filtered_items: state.items.filtered_items,
  cur_sort: state.items.cur_sort,
  cur_category: state.items.cur_category
});

export default connect(mapStateToProps, { sortItems, filterItems })(ItemSortDropdownContainer);
