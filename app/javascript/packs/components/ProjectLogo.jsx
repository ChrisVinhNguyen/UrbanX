import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Logo from '../images/doge-logo-transparent-background.png';

class ProjectLogo extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="project-logo" src={ Logo } alt="Project Logo" height="42" width="42"/>
        </Link>
      </div>
    )
  }
}

export default ProjectLogo;
