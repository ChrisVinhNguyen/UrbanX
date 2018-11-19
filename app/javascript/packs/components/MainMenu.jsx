import React, { Component } from 'react';
import { Link } from "react-router-dom";

class MainMenu extends Component {
  render() {
    return (
      <div className="ui secondary  menu">
        <Link to="/" className="item active">Home</Link>
        <Link to="/about" className="item">About Us</Link>
        <Link to="/faq" className="item">FAQ</Link>
        <Link to="/contact-us" className="item">Contact Us</Link>
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
          <a className="ui item">
            Logout
          </a>
        </div>
      </div>
    )
  }
}

export default MainMenu;
