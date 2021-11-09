import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import {Form}  from 'react-bootstrap'

class CreateTemplate extends Component {
    state = {
        temp_name:'',
        temp_desc:'',
      }
   
      handleTemplateCreation= ()=>{
        //   let userData={};
        let template_data = {template_name:this.state.temp_name,
        template_desc:this.state.temp_desc,
        session_id:"Moaz",
        };

        console.log("template_data in user reg",template_data)
            fetch('http://localhost:5001/createTemplate', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ Data : template_data

                })
            })
            .then(response => response.json())
           
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
            case "template_name":
                this.setState({temp_name: input}, () => {
                    console.log(this.state.inputUser, 'inputuser');
                  });
            break;
            case "template_desc":
                this.setState({temp_desc: input})
                break;

            default:
                break;
        }

      }
    render(){
        return (
            <div className='center' >
            <div>Template Creation Form</div>

            <div >
            <table id="template_data">
            <tbody onChange={(event) =>this.setInputState(event)}>
            <tr>
            <td>
            <label>Template Name</label>
            </td>
            <td>
            <input type="text" id="template_name"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter Template Description</label>
            </td>
            <td>
            <input type="text" id="template_desc"/>
            </td>
            </tr>
            
            </tbody>
            </table>
                        
            <button 
            className='btn'
            type='submit'
            onClick={this.handleTemplateCreation}
            >Create Template
           </button>

            </div>
            </div>

            );
        }
        }
        
export default CreateTemplate;
// export default withRouter(connect(mapStateToProps)(userReg))