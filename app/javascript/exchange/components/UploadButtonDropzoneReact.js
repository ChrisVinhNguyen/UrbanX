
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import pic from '../images/macbook.jpg';
import ActiveStorageProvider from 'react-activestorage-provider';
import { DirectUpload } from "activestorage"
// import "../../utils/direct_uploads.js"
import Dropzone from 'react-dropzone'



export class UploadButtonDropzoneReact extends Component {

    constructor(props){
      super(props);
      this.state= {
        files:[]
      }
    }

    onDrop = (files) => {

        this.setState({
          files
        });
        const input = document.querySelector('input[type=file]')
        const url = input.dataset.directUploadUrl
        console.log(input)
        console.log(url)


        var currentFiles = this.state.files;

        // Push file(s) from function parameters to `currentFiles` array
        const newFiles = files;
        currentFiles.push(newFiles);

        if (files.length) {
          let formPayLoad = new FormData();

          // I'm using "avatar" here for the attribute name of the model that
          // will store the image. Change the first parameter of the 'append' function
          // below to be the name of the attribute name that fits your Rails model.
          formPayLoad.append("images", files[files.length - 1]);
          console.log("payload")
          console.log(formPayLoad.values())

          // Pass the data to your own defined upload function
          // that makes the call to your API. Make sure you put the
          // formPayLoad in the body of the request.
          // this.props.upload(formPayLoad);
    }



        Array.from(files).forEach(file => this.uploadFile(file))
    }

    onCancel= (event) => {
        this.setState({
          files: []
        });
    }

    uploadFile = (file) =>{
        // your form needs the file_field direct_upload: true, which
        //  provides data-direct-upload-url
        const input = document.querySelector('input[type=file]')

        const url = input.dataset.directUploadUrl
        console.log(url)
        console.log(input.dataset)
        const upload = new DirectUpload(file, url)
        console.log("uploadFile")
        console.log(upload)
       
        upload.create((error, blob) => {
          if (error) {
            // Handle the error
          } else {
            // Add an appropriately-named hidden input to the form with a
            //  value of blob.signed_id so that the blob ids will be
            //  transmitted in the normal upload flow
            console.log ("start creating blob")
            const hiddenField = document.createElement('input')
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("value", blob.signed_id);
            hiddenField.name = input.name
            document.querySelector('form').appendChild(hiddenField)
            console.log ("done creating blob")
          }
        })
    }


    render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
              inputProps={{direct_upload: true}}
              multiple = {true}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );

  }

}


export default UploadButtonDropzoneReact;