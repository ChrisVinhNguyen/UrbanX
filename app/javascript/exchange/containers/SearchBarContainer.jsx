import React, { Component } from 'react';
import faker from 'faker'
import _ from 'lodash'
import { Search, Grid } from 'semantic-ui-react'

const source = _.times(20, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar()
}))


class SearchBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }

    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: ''
    })
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title });
  }

  handleSearchChange(e, { value }){
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid className="header-search-container">
        <Grid.Column>
          <Search
            className="header-search"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default SearchBarContainer;
