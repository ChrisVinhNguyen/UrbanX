import React, { Component } from 'react';
import { Search, Grid, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { filterItems, searchItems } from '../actions/itemsActions';


class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      openResultsMenu: false,
      value: ''
    }

    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      openResultsMenu: false,
      value: ''
    })
  }

  handleResultSelect(e, { result }) {
    this.setState({ openResultsMenu: false, value: result.title });
    this.props.filterItems('All', '', result.title)
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.setState({ openResultsMenu: false, value: this.state.value })
      this.props.filterItems('All', '', this.state.value)
    }
  }

  handleSearchChange(e, { value }){
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.props.searchItems(this.state.value)

      this.setState({
        isLoading: false,
        openResultsMenu: true
      })
    }, 300)
  }

  render() {
    const { isLoading, openResultsMenu, value } = this.state

    return (
      <Grid className="header-search-container">
        <Grid.Column>
          <Search
            className="header-search"
            loading={ isLoading }
            onResultSelect={ this.handleResultSelect }
            onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
            results={ this.props.filtered_item_names_for_search }
            value={ value }
            fluid
            open={ openResultsMenu }
            onKeyPress={ this.handleKeyPress }
            { ...this.props }
          />
        </Grid.Column>
      </Grid>
    )
  }
}

SearchBarContainer.propTypes = {
  filterItems: PropTypes.func.isRequired,
  searchItems: PropTypes.func.isRequired,
  filtered_item_names_for_search: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  filtered_item_names_for_search: state.items.filtered_item_names_for_search
});

export default connect(mapStateToProps, { filterItems, searchItems })(SearchBarContainer);
