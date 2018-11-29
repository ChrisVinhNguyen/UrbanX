import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import NewItemForm from './NewItemForm';


const Hello = props => (
 		<div className = 'item_details_wrapper'>
 		<h5 className='item_details'>
 		
 		{props.message}
 		</h5>
 		<NewItemForm item={props.item}/>
 		</div>
  	)


document.addEventListener('DOMContentLoaded', () => {
  
  const node = document.getElementById('item_details')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(<Hello {...data} />,node);
});



