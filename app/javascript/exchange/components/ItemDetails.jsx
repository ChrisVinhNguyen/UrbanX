
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'

import pic from '../images/macbook.jpg';


class ItemDetails extends Component {
  render() {
    console.log(this.props.item_details)

    return (
      <Item>
      <p>
      {this.props.item_id}
      </p>
      
      <Divider/>
    </Item>
    <ItemReviewsContainer/>
    );
  }
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details
});

export default connect(mapStateToProps, {})(ItemDetails);