
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ActiveStorageProvider from 'react-activestorage-provider';
import DropzoneComponent from 'react-dropzone-component';
import { DirectUpload } from "activestorage"
import Dropzone from 'react-dropzone'


export class UploadSingleButton extends Component {

    constructor(props){
      super(props);
      this.state= {
        file: null

      }

      this.djsConfig = {
            addRemoveLinks: false,
            params: {
                myParameter: "I'm a parameter!"
            },
            uploadMultiple: false,
            autoProcessQueue: false,
            autoQueue: false,
            maxFileSize: 15,
            paramName: "images",
            acceptedFiles: "image/*"


      };

      this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            showFiletypeIcon: true,
            postUrl: '/user_profile'
      };


      this.dropzone = null;
    }

    render(){
      
      const config = this.componentConfig;
      const djsConfig = this.djsConfig;

      var eventHandlers = { init: dz => this.dropzone = dz,
                            addedfile: (file) => this.updateFileState(file),
                            removedfile: (file) => this.removeFile(file),
                            drop: (file) => this.updateFileState(file)

      }



      return(

              <DropzoneComponent config={config}
                                  eventHandlers={eventHandlers}
                                  djsConfig={djsConfig}  >
                                <div class="dz-message" data-dz-message><span>Upload Image</span></div>
                                
                </DropzoneComponent>


      )
    }


    updateFileState(file){
      
        this.setState({
         file: file
        });
        console.log(this.state.file)
        this.props.updateImageState(this.state.file)
        console.log("done updateFilesState")


    }

    removeFile(file){
      var currentFiles = this.state.files;

      for( var i = 0; i < currentFiles.length-1; i++){ 
        if ( currentFiles[i].size == file.size) {
          console.log("found")
          currentFiles.splice(i, 1); 
        }
      }

      console.log("after removing")
      console.log(this.state.file)
      this.props.updateItemState(this.state.file)
    }
  
}




export default UploadSingleButton;