import React, { Component } from 'react'

class NewItemForm extends React.Component{ 

	constructor(props) {
		console.log("finally")
	    super(props);
	    this.state = {
	      name: props.item.name,
	      description: props.item.description,
	      category: props.item.category,
	      quantity: props.item.quantity,
	      condition: props.item.condition,
	      value: props.item.value,
	      images: null
	    };
	    this.handleImageChange=this.handleImageChange.bind(this);
  	}




  	handleNameChange = (e) => {
  		this.setState({ name: e.target.value });
	}

	handleDescriptionChange = (e) => {
  		this.setState({ description: e.target.value });
	}
	handleImageChange = (e) => {
		debugger
  		// this.setState({ images: Object.values(e.currentTarget.files) });
  		this.setState({ image: e.currentTarget.files[0] });
  		console.log(this.state.image)
  		console.log("handleImageChange")
	}
	handleCategoryChange = (e) => {
  		this.setState({ category: e.target.value });
	}
	handleQuantityChange = (e) => {
  		this.setState({ quantity: e.target.value });
	}
	handleConditionChange = (e) => {
  		this.setState({ condition: e.target.value });
	}
	handleValueChange =(e) => {
  		this.setState({ value: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		// formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
		formData.append('item[name]', this.state.name);
		formData.append('item[description]', this.state.description);
		formData.append('item[category]', this.state.category);
		formData.append('item[quantity]', this.state.quantity);
		formData.append('item[condition]', this.state.condition);
		formData.append('item[value]', this.state.value);
		formData.append('item[image]', this.state.image);

		
		console.log(this.state)
		console.log(formData)
		console.log("below is form data")
		for (var pair of formData.entries()) {
		    console.log(pair[0]+ ', ' + pair[1]); 
		}
		debugger
		$.ajax({
			url:'/items',
			method: 'POST',
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


	render() {
		
		console.log(this.state)
	    return (
	      <form  onSubmit={this.handleSubmit.bind(this)}>
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
	          name="item[description]"
	          value={this.state.description}
	          onChange={this.handleDescriptionChange}
	        />

	        <label>Category</label>
	        <input
	          type="text"
	          name="item[category]"
	          value={this.state.category}
	          onChange={this.handleCategoryChange}
	        />

	        <label>Quantity</label>
	        <input
	          type="text"
	          name="item[quantity]"
	          value={this.state.quantity}
	          onChange={this.handleQuantityChange}
	        />

	        <label>Condition</label>
	        <input
	          type="text"
	          name="item[condition]"
	          value={this.state.Condition}
	          onChange={this.handleConditionChange}
	        />

	        <label>Value</label>
	        <input
	          type="text"
	          name="item[value]"
	          value={this.state.value}
	          onChange={this.handleValueChange}
	        />

	         <label>Upload images</label>
	         <input
	          type="file"
	          name="item[image]"
	          multiple={false}
	          onChange={this.handleImageChange}
	        />






	        <input type="submit" value="Submit" />
	      </form>
	    );
  	}	



}

export default NewItemForm;


const getCSRFToken = () => {
  const tokenDom = document.querySelector("meta[name=csrf-token]")
  if (tokenDom) {
     const csrfToken = tokenDom.content
     axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }
}



 // <label>Upload images</label>
	//         <input
	//           type="file"
	//           name="item[images]"
	//           multiple={true}
	//           value={this.state.images}
	//           onChange={this.handleImageChange}
	//           direct_upload={true}
	//         />