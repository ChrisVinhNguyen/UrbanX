
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import pic from '../images/macbook.jpg';
import ActiveStorageProvider from 'react-activestorage-provider';

export class UploadButton extends Component {

  render(){
  	var path = '/items/' + this.props.item_id;
  	return (
  	

	<ActiveStorageProvider
	  	endpoint={{
	    path: path,
	    model: 'Item',
	    attribute: 'images',
	    method: 'PUT',
	  }}

  multiple={true}
  onSubmit={item => this.setState({ images: item.images })}
  render={({ handleUpload, uploads, ready }) => (
    <div>
      <input
        type="file"
        disabled={!ready}
        onChange={e => handleUpload(e.currentTarget.files)}
      />
 
      {uploads.map(upload => {
        switch (upload.state) {
          case 'waiting':
            return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
          case 'uploading':
            return (
              <p key={upload.id}>
                Uploading {upload.file.name}: {upload.progress}%
              </p>
            )
          case 'error':
            return (
              <p key={upload.id}>
                Error uploading {upload.file.name}: {upload.error}
              </p>
            )
          case 'finished':
            return <p key={upload.id}>Finished uploading {upload.file.name}</p>
        }
      })}
    </div>
	)}
	/>
  		)
  }
	
}




export default UploadButton;