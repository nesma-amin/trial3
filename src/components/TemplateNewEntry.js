import React, { Component } from 'react'

class TemplateNewEntry extends Component {
    constructor() {
        super();
    
        this.id = ''
    }
    state = {
        selectedFile:'',
        entry_text:'',
        insertedId:'',
      }
    //   state = {
    //     inputUser:'',
    //     logo:''
    
    //   }
    // updateInsrtedId=(data) =>{
    //     console.log("data:",data)
    //     const id=data.id
    //     console.log("id",id)
    //     this.setState(() => ({ insertedId:id
    //               }))
    // }
      handleNewEntry= ()=>{
        //   let userData={};
         //handle uploaded file
         let entry_id=0
         let that= this
         const url_string = window.location;
const url = new URL(url_string);
const url_temp_id = url.searchParams.get("temp_id");
const url_project_name = url.searchParams.get("project_name");
     console.log("this.state.insertedId",that.state.insertedId)
let template_data 
         const formData = new FormData();
         console.log("selcted file", this.state.selectedFile)
         formData.append('upload_file', this.state.selectedFile);
         fetch(
             `http://localhost:5001/attachmentupload`,
             {
                 method: 'POST',
                 body: formData,
             }
         )
             .then((response) => response.json())
             .then(function (data) {
                console.log('Success:', data.data.id);
                entry_id = data.data.id
                that.setState({ insertedId: entry_id})
        // this.id=data.data.id
    }).catch((error) => {
                 console.error('Error:', error);
    }).then(function(){
    //handle url inputs
    template_data = {
    // entry_id:this.state.insertedId,
    entry_id:that.state.insertedId,
    template_id:url_temp_id,
    project_unique_name:url_project_name,
    session_id:"Moaz",
    entry_text:that.state.entry_text,
    }

    console.log("Entry data to be saved",template_data)

    fetch('http://localhost:5001/updateTemplateEntry', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({ Data : 
            template_data})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // window.location.reload();
        }
    })
  

             })
        //handle url inputs
        // let template_data = {
        //     // entry_id:this.state.insertedId,
        //     entry_id:this.state.insertedId,
        //     template_id:url_temp_id,
        //     project_unique_name:url_project_name,
        //     session_id:"Moaz",
        //     entry_text:this.state.entry_text,
        //     };

        // console.log("Entry data to be saved",template_data)

        //     fetch('http://localhost:5001/updateTemplateEntry', {
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         method: 'PATCH',
        //         body: JSON.stringify({ Data : 
        //             template_data})
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.success) {
        //             // window.location.reload();
        //         }
        //     })
          
    }
    fileChangeHandler=(event)=>{
        this.setState(() => ({
          selectedFile: event.target.files[0]
        }))
      }
      setInputState=(e)=>
      {
          const input=e.target.value;
        //   let pwdAlart;
        //   let mailAlart;
        console.log("event data",e)
        console.log("event data value",e.target.value)
        console.log("data ID",e.target.id)
        switch(e.target.id)
        {
            case "template_id":
                this.setState({temp_id: input}, () => {
                    console.log(this.state.inputUser, 'inputuser');
                  });
            break;
            case "project_name":
                this.setState({project_name: input})
                break;
            case "entry_text":
                this.setState({entry_text: input})
                break;
            default:
                break;
        }

      }
    render(){
        return (
            <div className='center' >
            <div>Add new entry</div>

            <div >
            <table id="entry_data">
            <tbody onChange={(event) =>this.setInputState(event)}>
            <tr>
            <td>
            <label>Entery Details</label>
            </td>
            <td>
            <textarea name="text" id="entry_text" rows="14" cols="30" wrap="soft"> </textarea>
            {/* <input type="text" style={{height:"200px",width:"250px"}} id="entry_text"/> */}
            </td>
            </tr>
            <tr>
            <td>
            <label>Attach file</label>
            </td>
            <td>
                  <input type="file" name="upload_file1" id="upload_file1" readOnly={true} 
          onChange={(event) => this.fileChangeHandler(event)}/>
        {/* <input type="submit" name="upload" value="Upload" onClick={this.uploadFile}/> */}

            </td>
            </tr>
            
            </tbody>
            </table>
                        
            <button 
            className='btn'
            type='submit'
            onClick={this.handleNewEntry}
            > Add Entry
           </button>

            </div>
            </div>

            );
        }
        }
        
export default TemplateNewEntry;
// export default withRouter(connect(mapStateToProps)(userReg))