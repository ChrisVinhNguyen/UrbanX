
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import pic from '../images/macbook.jpg';
import ActiveStorageProvider from 'react-activestorage-provider';
import DropzoneComponent from 'react-dropzone-component';
import { DirectUpload } from "activestorage"
import Dropzone from 'react-dropzone'


export class UploadButton extends Component {

    constructor(props){
      super(props);
      this.state= {
        files:[],
        directUpload:[]

      }

      this.djsConfig = {
            addRemoveLinks: true,
            params: {
                myParameter: "I'm a parameter!"
            },
            uploadMultiple: true,
            autoProcessQueue: false,
            paramName: "images"


      };

      this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            showFiletypeIcon: true,
            postUrl: '/items'
      };


      this.dropzone = null;
    }

    onDrop(acceptedFiles, rejectedFiles) {
  // do stuff with files...
  console.log("do stuff with files")
    }

    onDrop = (files) => {
    // Get existing files from state
    // (or just the empty array if there are no files in state)
    console.log(" on drop")
    this.updateFilesState(files)
  }



    render(){
      
      const config = this.componentConfig;
      const djsConfig = this.djsConfig;

      var eventHandlers = { init: dz => this.dropzone = dz,
                            addedfile: (files) => this.updateFilesState(files),
                            removedfile: (file) => console.log(file),
                            drop: (files) => this.updateFilesState(files)

      }



      return(

              <DropzoneComponent  onSubmit={this.onSubmit.bind(this)} config={config}
                                  eventHandlers={eventHandlers}
                                  djsConfig={djsConfig}  >
                                <div class="dz-message" data-dz-message><span>Upload Images</span></div>
                                
                </DropzoneComponent>


      )
    }
//<button onClick={this.handlePost.bind(this)}>Upload</button>

    handlePost() {
      console.log("files are:")
      console.log(this.state.files)
      // this.props.updateItemState(this.state.files)
       this.dropzone.processQueue();
    }

    onSubmit(files) {
        console.log("inside onbusbmit uploadbtn")
        if (files.length) {
            let formPayLoad = new FormData();

            // I'm using "avatar" here for the attribute name of the model that
            // will store the image. Change the first parameter of the 'append' function
            // below to be the name of the attribute name that fits your Rails model.
            formPayLoad.append("images", files[files.length - 1]);

            // Pass the data to your own defined upload function
            // that makes the call to your API. Make sure you put the
            // formPayLoad in the body of the request.

            // this.props.upload(formPayLoad);

            this.props.updateItemState(files)
            this.dropzone.processQueue();
            console.log("done processQueue")
            //this.setState({files: []})



    }
  }
    updateFilesState(files){
        var currentFiles = this.state.files;
         console.log(currentFiles)
        // Push file(s) from function parameters to `currentFiles` array
        const newFiles = files;
        console.log(newFiles)
        currentFiles.push(newFiles);
        

        // Assign files dropped into component into state
        this.setState({
         files: currentFiles
        });
        console.log(this.state.files)
        this.props.updateItemState(files, this.dropzone.processQueue)
        console.log("done updateFilesState")


    }

    makeDirectUploadObject(file){
        const url = element.dataset.directUploadUrl
        const upload = new DirectUpload(file, url)

        upload.create((error, blob) => {
          if (error) {
            // Handle the error
          } else {
            // Add an appropriately-named hidden input to the form with a value of blob.signed_id
            $('<input>').attr({
              type: 'hidden',
              name: 'item[images][]',
              value: blob.signed_id
            }).appendTo('form');
          }
        })

    }
	
}




export default UploadButton;