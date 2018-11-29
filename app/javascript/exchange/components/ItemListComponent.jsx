import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ItemSummary from './ItemSummary'
import ItemSortDropdownContainer from '../containers/ItemSortDropdownContainer'


class ItemListComponent extends Component {
  render() {
    let items = this.props.filtered_items.map(item => {
      return (
        <Grid.Column key={ item.id }>
          <ItemSummary key={ item.id } item={ item } />
        </Grid.Column>
      );
    });

    return (
      <div className="item-list-component">
        <ItemSortDropdownContainer />
        <Grid columns={3} divided>
          <Grid.Row>
            {items}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

ItemListComponent.propTypes = {
  filtered_items: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  filtered_items: state.items.filtered_items,
  cur_sort: state.items.cur_sort
});

export default connect(mapStateToProps, {})(ItemListComponent);