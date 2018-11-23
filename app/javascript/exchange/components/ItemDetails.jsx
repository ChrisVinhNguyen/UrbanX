
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import ItemReviewsContainer from '../containers/ItemReviewsContainer'
import { getItem } from '../actions/itemsActions';


import pic from '../images/macbook.jpg';


class ItemDetails extends Component {
  componentDidMount(){
    this.props.getItem(this.props.match.params.id)
  }
  render() {
    console.log(this.props.item_details)
    console.log(this.props)

    return (
      <div>
        <Item>
          <p>
            {this.props.item_id}
          </p>
        </Item>
        <ItemReviewsContainer current_viewed_item_id={this.props.match.params.id} test="test"/>
          <p>
            Reviews
          </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details
});

export default connect(mapStateToProps, {getItem})(ItemDetails);