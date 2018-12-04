import React, { Component } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';

import Logo from '../images/logo2.png';

import '../stylesheets/project-logo.scss';

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
        <Link to="/" onClick={ this.handleOnClick }>
          <svg viewBox="0 0 400 200">
            <symbol id="s-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".35em">Urbanx</text>
            </symbol>
            <use class="text" href="#s-text"></use>
            <use class="text" href="#s-text"></use>
            <use class="text" href="#s-text"></use>
            <use class="text" href="#s-text"></use>
            <use class="text" href="#s-text"></use>
          </svg>
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
