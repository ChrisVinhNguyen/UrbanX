import React, { Component } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';

import Logo from '../images/logo2.png';

class ProjectLogo extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.filterItems('All');
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

export default connect(() => { return {} }, { filterItems })(ProjectLogo);
