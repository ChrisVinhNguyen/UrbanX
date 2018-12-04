import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid, Message } from 'semantic-ui-react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import {getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';
import { UploadMultipleButton }  from '../components/UploadMultipleButton.js'
import { Dropdown } from 'semantic-ui-react'
import { displayFlash } from '../actions/flashActions';
import { ITEMNAME_MISSING, DESCRIPTION_MISSING, CATEGORY_MISSING, QUANTITY_MISSING, CONDITION_MISSING, VALUE_MISSING, QUANTITY_NOTNUMBER, VALUE_NOTNUMBER } from '../constants/formErrors';


import '../stylesheets/item-edit-form-container.scss';


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
      images: [],

      nameError: false,
      descriptionError: false,
      categoryError: false,
      quantityError: false,
      conditionError: false,
      valueMissingError: false,
      valueNotNumberError: false,

      errorMessages: [],
      formError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateItemState = this.updateItemState.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state)
  }

  handleSubmit(e) {
    const errorMessages = this.handleFormErrors();

    if (errorMessages.length > 0) {
      this.setState({
        formError: true,
        errorMessages: errorMessages
      })
      return
    } else {
      this.setState({ formError: false })
    }

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
    console.log("doing PUT")
    $.ajax({
      url: `/items/${this.props.match.params.id}`,
      method: 'PUT',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
            'X-CSRFToken': $('meta[name="token"]').attr('content')
        }
    }).then(
    (response) => {
        this.props.getItem(response.id)
      }
    );

    console.log(this.props.match.params.id)
    this.props.history.push("/items_list/" + this.props.match.params.id)

    this.displayMessage('Item edited successfully', 'positive');
  }

  handleFormErrors() {
    let errorMessages = [];
    this.setState({
      nameError: false,
      descriptionError: false,
      categoryError: false,
      quantityError: false,
      conditionError: false,
      valueError: false,
    });

    if (this.state.name === '') {
      this.setState({ nameError: true })
      errorMessages.push(ITEMNAME_MISSING);
    }
    if (this.state.description === '') {
      this.setState({ descriptionError: true })
      errorMessages.push(DESCRIPTION_MISSING);
    }
    if (this.state.category === '') {
      this.setState({ categoryError: true })
      errorMessages.push(CATEGORY_MISSING);
    }
    if (this.state.quantity === '') {
      this.setState({ quantityError: true })
      errorMessages.push(QUANTITY_MISSING);
    }
    if (isNaN(this.state.quantity)) {
      this.setState({ quantityError: true })
      errorMessages.push(QUANTITY_NOTNUMBER);
    }
    if (this.state.condition === '') {
      this.setState({ conditionError: true })
      errorMessages.push(CONDITION_MISSING);
    }
    if (this.state.value === '') {
      this.setState({ valueError: true })
      errorMessages.push(VALUE_MISSING);
    }
    if (isNaN(this.state.value)) {
      this.setState({ valueError: true })
      errorMessages.push(VALUE_NOTNUMBER);
    }
    return errorMessages;
  }

  updateItemState(files){
    this.state.images = files
    console.log(this.state.images)
    console.log("this is the edit item form images statee ^ ")

  }
  deleteImage(image_attachment, index){
    console.log("deleting image")
    var data = image_attachment
// delete_image_attachment
      $.ajax({
      url:`/items/${image_attachment}/delete_image`,
      method: 'DELETE',
      data: data
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );

    this.displayMessage('Image deleted successfully', 'positive');
  }

  displayMessage(flash_message, pos_or_neg) {
    this.props.displayFlash(flash_message, true, pos_or_neg);
  }

  render() {
    const { name, description, category, quantity,condition,value, user_id, nameError,
      descriptionError, categoryError, quantityError, conditionError, 
      valueError,errorMessages, formError  } = this.state
    var categoryOptions = [
      {text: 'Electronics', value: 'Electronics'}, {text: 'Books', value: 'Books'}, {text: 'Sports', value: 'Sports'}, {text: 'Tools', value: 'Tools'}, {text: 'Arts', value: 'Arts'},{text: 'Music', value: 'Music'}, {text: 'Vehicles', value: 'Vehicles'}, {text: 'Clothing', value: 'Clothing'}, {text: 'Accessories', value: 'Accessories'}, {text: 'Others', value: 'Others'}
    ]

    var conditionOptions = [
      {text: 'Brand New', value: 'Brand New'}, {text: 'Excellent', value: 'Excellent'}, {text: 'Good', value: 'Good'}, {text: 'Fair', value: 'Fair'}, {text: 'Worn Out', value: 'Worn out'}
    ]

    const errorMessageContent = this.state.errorMessages.map(message => {
      const keyVal = uuid();
      return (
        <li key={ keyVal }>{message}</li>
      )
    });

    const errorMessage = (
      <Message
        error
        header='Form Error(s)'
        content={
          <ul>
            {errorMessageContent}
          </ul>
        }
      />
    );

    let imageHtml;

    if (this.props.item_details.image_attachments_id){

      console.log("----")
      console.log("----")
      imageHtml = this.props.item_details.images.map((imageSrc, index) => {
        return (
          <div >
            <img src={imageSrc} width="400"/>
            <Button onClick={() => {this.deleteImage(this.props.item_details.image_attachments_id[index], index)}}>
              Delete
            </Button>
          </div>
        )
      })

    }
    return (
      <div className="item-edit-form-container">
        <h1 className="item-edit-form-title">Edit Item</h1>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form className="item-edit-form" error={formError}>
                <Form.Field>
                  <label>Name</label>
                  <Form.Input placeholder='Name' name='name' value={ name } onChange={ this.handleChange } error={nameError}/>
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <Form.Input placeholder='Description' name='description' value={ description } onChange={ this.handleChange } error={descriptionError}/>
                </Form.Field>
                <Form.Field>
                  <label>Category</label>
                  <Dropdown 
                    options={categoryOptions}
                    selection
                    name='category'
                    value={category}
                    onChange={ this.handleChange } 
                    error={categoryError}/>
                </Form.Field>
                <Form.Field>
                  <label>Quantity</label>
                  <Form.Input placeholder='Quantity' name='quantity' value={ quantity } onChange={ this.handleChange } error={quantityError}/>
                </Form.Field>
                <Form.Field>
                  <label>Condition</label>
                  <Dropdown 
                    options={conditionOptions}
                    placeholder='Choose a category'
                    selection
                    name='condition'
                    value={condition}
                    onChange={ this.handleChange } 
                    error={conditionError}/>
                </Form.Field>
                <Form.Field>
                  <label>Value</label>
                  <Form.Input placeholder='Value' name='value' value={ value } onChange={ this.handleChange } error={valueError}/>
                </Form.Field>
                <UploadMultipleButton updateItemState={this.updateItemState}/>
                {imageHtml ? (imageHtml) :  <div></div> }

                <Form.Button content='Submit' onClick= {this.handleSubmit} error={formError} />
                { errorMessages.length > 0 ? errorMessage : null }
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

export default connect(mapStateToProps, {getItem, displayFlash })(ItemEditFormContainer)
