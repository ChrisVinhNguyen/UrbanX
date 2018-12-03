import React, { Component } from 'react';
import { Button, Checkbox, Form, Grid, Message } from 'semantic-ui-react';
import axios from 'axios';
import { newItem,getItem } from '../actions/itemsActions';
import { connect } from 'react-redux';
import { UploadMultipleButton }  from '../components/UploadMultipleButton.js';
import { Router, Route, Link, Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import * as actions from '../actions/itemsActions';
import '../stylesheets/item-create-form-container.scss';
import { ITEMNAME_MISSING, DESCRIPTION_MISSING, CATEGORY_MISSING, QUANTITY_MISSING, CONDITION_MISSING, VALUE_MISSING, QUANTITY_NOTNUMBER, VALUE_NOTNUMBER } from '../constants/formErrors';

class ItemCreateFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      category: '',
      quantity: '',
      condition: '',
      value: '',
      user_id: '',
      images: [], 

      nameError: false,
      descriptionError: false,
      categoryError: false,
      quantityError: false,
      conditionError: false,
      valueError: false,
      valueError: false,

      errorMessages: [],
      formError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.updateItemState = this.updateItemState.bind(this);
  }

  handleChange(e, { name, value }) {
    console.log(this.state)
    this.setState({ [name]: value })
  }

  handleCategoryChange = (e, { value }) => this.setState({ ['category']: value })

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
    let newItemId 

    $.ajax({
      url:'/items',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false,
    }).then(
      (response) => {this.props.history.push("/items_list/" + response),
        this.props.getItem(response)
        console.log("after history")
      }
    )
    console.log(this.state.response)

    //this.props.history.push("/items_list/93");

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
    console.log("this is the new item form images statee ^ ")

  }

  render() {
    const { name, description, category, quantity,
      condition,value, user_id, nameError,
      descriptionError, categoryError, quantityError, conditionError, 
      valueError,errorMessages, formError} = this.state

    var categoryOptions = [
      {text: 'Electronics', value: 'Electronics'}, {text: 'Books', value: 'Books'}, {text: 'Sports', value: 'Sports'}, {text: 'Tools', value: 'Tools'}, {text: 'Arts', value: 'Arts'}, {text: 'Music', value: 'Music'}, {text: 'Vehicles', value: 'Vehicles'}, {text: 'Clothing', value: 'Clothing'}, {text: 'Accessories', value: 'Accessories'}, {text: 'Others', value: 'Others'}
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

    return (
      <div className="new-item-form-container">
        <h1 className="new-item-form-title">New Item Form</h1>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form className="new-item-form" onSubmit={ this.handleSubmit} error={formError}>
                <Form.Field>
                  <label>Name</label>
                  <Form.Input placeholder='Name' name='name' value={ name } onChange={ this.handleChange } error={nameError} />
                </Form.Field>
                <Form.Field>
                  <label>Description</label>
                  <Form.Input placeholder='Description' name='description' value={ description } onChange={ this.handleChange } error={descriptionError} />
                </Form.Field>
                <Form.Field>
                  <label>Category</label>
                  <Dropdown 
                    options={categoryOptions}
                    placeholder='Choose a category'
                    selection
                    name='category'
                    value={category}
                    onChange={ this.handleChange } 
                    error={categoryError}/>
                </Form.Field>
                <Form.Field>
                  <label>Quantity</label>
                  <Form.Input placeholder='Quantity' name='quantity' value={ quantity } onChange={ this.handleChange } error={quantityError} />
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
                { errorMessages.length > 0 ? errorMessage : null }
                <Form.Button content='Submit' />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item_id: state.items.item_id
});

export default connect(mapStateToProps, { newItem, getItem })(ItemCreateFormContainer);
