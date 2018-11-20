import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Logo from '../images/logo2.png';

class ProjectLogo extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="project-logo" src={ Logo } alt="Project Logo" height="66" width="160"/>
        </Link>
      </div>
    )
  }
}

export default ProjectLogo;
