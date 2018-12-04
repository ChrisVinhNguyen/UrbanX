import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortItems, filterItems } from '../actions/itemsActions';

import PropTypes from 'prop-types';

import '../stylesheets/item-sort-dropdown-container.scss';


class ItemSortDropdownContainer extends Component {
  constructor(props){
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }


  handleSelect (e, { value }) {
    let cur_list = this.props.original_list;

    if (value == 'Default') {
      this.props.sortItems(cur_list, value);
    } else if (value == 'Newest') {
      this.props.sortItems(cur_list, value);
    } else if (value == 'Oldest') {
      this.props.sortItems(cur_list, value);
    }
  } 

  render() {
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
    ];

    let cur_selected;

    if (this.props.cur_sort == 'Default') {
      cur_selected = sortOptions[0].value;
    } else if (this.props.cur_sort == 'Newest') {
      cur_selected = sortOptions[1].value;
    } else if (this.props.cur_sort == 'Oldest') {
      cur_selected = sortOptions[2].value;
    }
    
    return (
      <div className="sort-container">
        <p align="right">
          Sort by{'  '}
          <Dropdown inline defaultValue={cur_selected} direction="left" options={sortOptions} onChange={ this.handleSelect }/>
        </p>
      </div>
    )
  }
}

ItemSortDropdownContainer.propTypes = {
  original_list: PropTypes.array.isRequired,
  cur_sort: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  original_list: state.items.original_list,
  cur_sort: state.items.cur_sort
});

export default connect(mapStateToProps, { sortItems, filterItems })(ItemSortDropdownContainer);
