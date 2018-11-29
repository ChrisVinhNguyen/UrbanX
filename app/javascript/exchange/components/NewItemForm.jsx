import React, { Component } from 'react'

class NewItemForm extends React.Component{ 

	constructor(props) {
	    super(props);
	    this.state = {
	      name: props.item.name,
	      description: props.item.description,
	      category: props.item.category,
	      quantity: props.item.quantity,
	      condition: props.item.condition,
	      value: props.item.value,
	      images: []
	    };
	    this.handleNameChange = this.handleNameChange.bind(this);
	    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	    this.handleImageChange = this.handleImageChange.bind(this);
  	}	

  	handleNameChange(e) {
  		this.setState({ name: e.target.value });
	}

	handleDescriptionChange(e) {
  		this.setState({ description: e.target.value });
	}
	handleImageChange(e) {
		console.log("HANDLING IMAGE CHANGE!!!")
  		this.setState({ images: e.target.value });
	}
	handleCategoryChange(e) {
  		this.setState({ category: e.target.value });
	}
	handleQuantityChange(e) {
  		this.setState({ quantity: e.target.value });
	}
	handleConditionChange(e) {
  		this.setState({ condition: e.target.value });
	}
	handleValueChange(e) {
  		this.setState({ value: e.target.value });
	}


	render() {
	    return (
	      <div>
	        <label>Name</label>
	        <input
	          type="text"
	          name="item[name]"
	          value={this.state.name}
	          onChange={this.handleNameChange}
	        />

	        <label>Description</label>
	        <input
	          type="text"
	          name="post[description]"
	          value={this.state.description}
	          onChange={this.handleDescriptionChange}
	        />

	        <label>Category</label>
	        <input
	          type="text"
	          name="post[category]"
	          value={this.state.category}
	          onChange={this.handleCategoryChange}
	        />

	        <label>Quantity</label>
	        <input
	          type="text"
	          name="post[quantity]"
	          value={this.state.quantity}
	          onChange={this.handleQuantityChange}
	        />

	        <label>Condition</label>
	        <input
	          type="text"
	          name="post[condition]"
	          value={this.state.Condition}
	          onChange={this.handleConditionChange}
	        />

	        <label>Value</label>
	        <input
	          type="text"
	          name="post[value]"
	          value={this.state.value}
	          onChange={this.handleValueChange}
	        />


	        <label>Upload images</label>
	        <input
	          type="file"
	          name="item[images]"
	          value={this.state.images}
	          onChange={this.handleImageChange}
	        />




	        <input type="submit" value="Submit" />
	      </div>
	    );
  	}	








}