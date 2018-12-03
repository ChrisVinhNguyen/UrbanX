import React, { Component } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';

import Logo from '../images/logo_inverted.png';

class ProjectLogo extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.filterItems('All', this.props.cur_sort);
  }

  render() {
    return (
      <div className="project-logo">
        <Link to="/">
          <img src={ Logo } alt="Project Logo" height="66" width="160" onClick={this.handleOnClick} />
        </Link>
      </div>
    )
  }
}

ProjectLogo.propTypes = {
  filterItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cur_sort: state.items.cur_sort
});

export default connect(mapStateToProps, { filterItems })(ProjectLogo);
