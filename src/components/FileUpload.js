

import React, { Component } from 'react'


class FileUpload extends Component {
  constructor() {
    super();

    this.url = 'http://localhost:5001'
    // this.loadHTMLTable = this.loadHTMLTable.bind(this);
    // this.insertRowIntoTable =this.insertRowIntoTable.bind(this);
    // this.handleRowEditDelet=this.handleRowEditDelet.bind(this);
    // this.deleteRowById = this.deleteRowById.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    

  }
  state = {
    inputUser:'',
    selectedFile:'',
    logo:''

  }

////////////////////////////////File Upload//////////////////////////////////////////////
///Handle File Upload:
fileChangeHandler=(event)=>{
    this.setState(() => ({
      selectedFile: event.target.files[0]
    }))
  }

uploadFile=(event)=>{
    const formData = new FormData();
    console.log("selcted file", this.state.selectedFile)
    formData.append('upload_file1', this.state.selectedFile);
    console.log("formData",formData)
          fetch(
              `${this.url}/fileupload`,
              {
                  method: 'POST',
                  body: formData,
              }
          )
              .then((response) => response.json())
              .then((result) => {
        //   this.setState(() => ({
        //     logo: result.filename
        //   }))
                  console.log('Success:', result);
          // window.alert('Success:', result)
              })
              .catch((error) => {
                  console.error('Error:', error);
              });
      };
  
      componentDidMount(){
    document.addEventListener('DOMContentLoaded',  ()=> {
    fetch(`${this.url}/imageDownload`)
    .then(response => response.json())
    .then((result) => {
                console.log('Success:', result);
                  this.setState(() => ({
                    logo: result.data[29].name
                  })) 
                 });
  });
    }

render(){
    return (
  <div className='center' >
  <div>Welcome to Database test</div>
  
  {/* <form name="upload_form" enctype="multipart/form-data" action="php-files-upload-save-mysql.php" method="POST"> */}
  <form name= "upload_form">
      <fieldset>
          <legend>Files Save into MySQL database using PHP</legend>
          <section>
              <label>Browse a file</label>
              <label>
                  <input type="file" name="upload_file1" id="upload_file1" readOnly={true} 
          onChange={(event) => this.fileChangeHandler(event)}/>
              </label>
              <div id="moreFileUpload"></div>
              {/* <div style="clear:both;"></div>
              <div id="moreFileUploadLink" style="display:none;margin-left: 10px;"> */}
        <div id="moreFileUploadLink" >
                  {/* <a href="javascript:void(0);" id="attachMore">Attach another file</a> */}
\
              </div>
        <label>{this.state.logo}</label>
        <img src={`${this.url}/upload/${this.state.logo}`} style={{height:"150px"}}alt="Logo" />
        <input type="submit" name="upload" value="Upload" onClick={this.uploadFile}/>
          </section>
      </fieldset>
      <div>&nbsp;</div>
  </form>
  
         
      </div>
    );
  }
  }
  
  export default FileUpload;
      