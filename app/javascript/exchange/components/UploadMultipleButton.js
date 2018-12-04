
import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import { Rating, Divider } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ActiveStorageProvider from 'react-activestorage-provider';
import DropzoneComponent from 'react-dropzone-component';
import { DirectUpload } from "activestorage"
import Dropzone from 'react-dropzone'


export class UploadMultipleButton extends Component {

    constructor(props){
      super(props);
      this.state= {
        files:[]

      }

      this.djsConfig = {
            addRemoveLinks: false,
            uploadMultiple: true,
            autoProcessQueue: false,
            autoQueue: false,
            maxFileSize: 15,
            paramName: "images",
            acceptedFiles: "image/*"


      };

      this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            showFiletypeIcon: true,
            postUrl: '/items'
      };
    }


    render(){
      
      const config = this.componentConfig;
      const djsConfig = this.djsConfig;

      var eventHandlers = { init: dz => this.dropzone = dz,
                            addedfile: (files) => this.updateFilesState(files),
                            removedfile: (file) => this.removeFile(file),
                            drop: (files) => this.updateFilesState(files)

      }
      return(

              <DropzoneComponent config={config}
                                  eventHandlers={eventHandlers}
                                  djsConfig={djsConfig}  >
                                <div className="dz-message" data-dz-message><span>Upload Images</span></div>
                                
              </DropzoneComponent>
      )
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
        this.props.updateItemState(this.state.files)
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
      console.log(this.state.files)
      this.props.updateItemState(this.state.files)
    }
  
}




export default UploadMultipleButton;