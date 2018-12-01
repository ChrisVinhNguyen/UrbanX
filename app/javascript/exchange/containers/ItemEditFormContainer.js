import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';
import { UploadMultipleButton }  from '../components/UploadMultipleButton.js'

class ItemEditFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item_details.name,
      description: this.props.item_details.description,
      category: this.props.item_details.category,
      quantity: this.props.item_details.quantity,
      condition: this.props.item_details.condition,
      value: this.props.item_details.value,
      user_id: this.props.item_details.user_id,
      images: []


    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateItemState = this.updateItemState.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    let item = this.state;
    item.user_id =this.props.currentUserId;
    // this.props.newItem(item);
    
    const formData = new FormData();
    // formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
    formData.append('item[name]', this.state.name);
    formData.append('item[description]', this.state.description);
    formData.append('item[category]', this.state.category);
    formData.append('item[quantity]', this.state.quantity);
    formData.append('item[condition]', this.state.condition);
    formData.append('item[value]', this.state.value);

    for (const image of this.state.images) {
      formData.append('item[images][]', image, image.name);
    }

    // console.log("below is form data")
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    // debugger
    console.log("doing PATCH")
    $.ajax({
      url:'/items',
      method: 'PATCH',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
            'X-CSRFToken': $('meta[name="token"]').attr('content')
        }
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );
  }
  updateItemState(files){
    this.state.images = files
    console.log(this.state.images)
    console.log("this is the edit item form images statee ^ ")

  }
  deleteImage(image_blob_id, index){
    console.log("deleting image")
    console.log(image_blob_id)
    const formData = new FormData()
    formData.append('image_blob_id',image_blob_id)
    var data = image_blob_id
// delete_image_attachment
      $.ajax({
      url:`/items/${image_blob_id}/delete_image_blob`,
      method: 'DELETE',
      data: data
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );
  }

  render() {
    const { name, description, category, quantity,condition,value, user_id  } = this.state
    let numImages = 0
    let url =""
    let image_blob_id = 0
    let imageHtml;

    if (this.props.item_details.image_blob_ids){
      numImages = this.props.item_details.image_blob_ids.length
      url = this.props.item_details.image
      image_blob_id = this.props.item_details.image

      imageHtml = this.props.item_details.images.map((imageSrc, index) => {
        return (
          <div >
            <img src={imageSrc} />
            <Button onClick={() => {this.deleteImage(this.props.item_details.image_blob_ids[index], index)}}>
              Delete
            </Button>
          </div>
        )
      })

    }
    return (
      <div className="new-item-form-container">
        <h1 className="new-item-form-title">Sign Up Form</h1>
        <Form className="new-item-form" >
          <Form.Field>
            <label>Name</label>
            <Form.Input placeholder='Name' name='name' value={ name } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Form.Input placeholder='Description' name='description' value={ description } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Category</label>
            <Form.Input placeholder='Category' name='category' value={ category } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Quantity</label>
            <Form.Input placeholder='Quantity' name='quantity' value={ quantity } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Condition</label>
            <Form.Input placeholder='Condition' name='condition' value={ condition } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Value</label>
            <Form.Input placeholder='Value' name='value' value={ value } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <UploadMultipleButton updateItemState={this.updateItemState}/>
          {imageHtml ? (imageHtml) :  <div></div> }
          <Form.Button content='Submit' onClick= {this.handleSubmit} />
        </Form>
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  item_details: state.items.item_details,
  currentUserId: state.user.user_info.user_profile_id,
  my_transactions_for_current_item: state.items.my_transactions_for_current_item
});

export default connect(mapStateToProps, {getItem })(ItemEditFormContainer)
