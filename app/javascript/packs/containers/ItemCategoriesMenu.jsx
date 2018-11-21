import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'

class MainMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeCategory: "All"
    }
  }

  handleCategoryClick = (e, { name }) => this.setState({ activeCategory: name })

  render() {

    const { activeCategory } = this.state

    return (
      <Menu secondary fluid widths={11}>
        <Menu.Item
          name='All'
          active={activeCategory === 'All'}
          onClick={this.handleCategoryClick}
        >
          All
        </Menu.Item>

        <Menu.Item name='Electronics' active={activeCategory === 'Electronics'} onClick={this.handleCategoryClick}>
          Electronics
        </Menu.Item>

        <Menu.Item
          name='Sports'
          active={activeCategory === 'Sports'}
          onClick={this.handleCategoryClick}
        >
          Sports
        </Menu.Item>

        <Menu.Item
          name='Tools'
          active={activeCategory === 'Tools'}
          onClick={this.handleCategoryClick}
        >
          Tools
        </Menu.Item>

        <Menu.Item
          name='Music'
          active={activeCategory === 'Music'}
          onClick={this.handleCategoryClick}
        >
          Music
        </Menu.Item>

        <Menu.Item
          name='Arts'
          active={activeCategory === 'Arts'}
          onClick={this.handleCategoryClick}
        >
          Arts
        </Menu.Item>

        <Menu.Item
          name='Vehicles'
          active={activeCategory === 'Vehicles'}
          onClick={this.handleCategoryClick}
        >
          Vehicles
        </Menu.Item>

        <Menu.Item
          name='Clothing'
          active={activeCategory === 'Clothing'}
          onClick={this.handleCategoryClick}
        >
          Clothing
        </Menu.Item>

        <Menu.Item
          name='Accessories'
          active={activeCategory === 'Accessories'}
          onClick={this.handleCategoryClick}
        >
          Accessories
        </Menu.Item>

        <Menu.Item
          name='Books'
          active={activeCategory === 'Books'}
          onClick={this.handleCategoryClick}
        >
          Books
        </Menu.Item>

        <Menu.Item
          name='Others'
          active={activeCategory === 'Others'}
          onClick={this.handleCategoryClick}
        >
          Others
        </Menu.Item>

      </Menu>
    )
  }
}

export default MainMenu;
