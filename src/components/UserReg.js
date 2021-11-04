import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import { withRouter } from 'react-router-dom'
// import {Form}  from 'react-bootstrap'

class userReg extends Component {
    state = {
        username:'',
        pwd:'',
        realName:'',
        nationalID:'',
        email:'',
        mobile:'',
        userCode:'',
        companyCode:'',
        regDate:'',

    
      }
   
      handleUserReg= ()=>{
        //   let userData={};
        let userData = {username:this.state.username,
        password:this.state.pwd,
        realName:this.state.realName,
        nationalID:this.state.nationalID,
        email:this.state.email,
        mobile: this.state.mobile,
        userCode:this.state.userCode,
        companyCode:this.state.companyCode,
        registrationDate:this.state.regDate,
        verified:'0x00'};

        console.log("userData in user reg",userData)
            fetch('http://localhost:5001/insert', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ Data : userData

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
            case "username":
                this.setState({username: input}, () => {
                    console.log(this.state.inputUser, 'inputuser');
                  });
            break;
            case "pwd":
                this.setState({pwd: input})
                break;
            case "confPwd":
                // pwdAlart = document.querySelector('#pwdAlart');
                // if(this.state.pwd===this.state.confPwd)
                // {
                //     pwdAlart.hidden = true;

                // }
                // else{
                //     this.setState({pwd: " "})
                //     pwdAlart.hidden = false;
                //     }
                break;
            case "realName":
                this.setState({realName: input})
                break;
            case "nationalID":
                this.setState({nationalID: input})
                break;
            case "email":
                this.setState({email: input})
                break;
            case "confMail":
                // mailAlart = document.querySelector('#mailAlart');
                // if(this.state.pwd!=this.state.confMail)
                // {
                //     this.setState({mail: " "})
                //     mailAlart.hidden = false;
                // }
                // else{
                //     mailAlart.hidden = true;
                // }
                break;
            case "mobile":
                this.setState({mobile: input})
                break;
            case "userCode":
                this.setState({userCode: input})
                break;
            case "companyCode":
                this.setState({companyCode: input})
                break;

            default:
                break;
        }

      }
    render(){
        return (
            <div className='center' >
            <div>Welcome to Register Page</div>

            <div >
            <table id="table">
            <tbody onChange={(event) =>this.setInputState(event)}>
            <tr>
            <td>
            <label>User Name</label>
            </td>
            <td>
            <input type="text" id="username"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter Password</label>
            </td>
            <td>
            <input type="text" id="pwd"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Re-enter Password</label>
            </td>
            <td>
            <input type="text" id="confPwd"/>
            <label hidden id ="pwdAlart" style={{color: "red"}} >Password missmatch</label>
            </td>
            </tr>
            <tr>
            <td>
            <label>Your Real Name</label>
            </td>
            <td>
            <input type="text" id="realName"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter your National ID</label>
            </td>
            <td>
            <input type="text" id="nationalID"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter your email</label>
            </td>
            <td>
            <input type="text" id="email"/>
            </td>
            </tr>
            <tr>
            <td>
            <label>Re-enter your email</label>
            </td>
            <td>
            <input type="text" id="confMail"/>  
            <label hidden id ="mailAlart" style={{color: "red"}} >Email missmatch</label>         
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter your Mobile Number</label>
            </td>
            <td>
            <input type="text" id="mobile"/>                
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter your User Code</label>
            </td>
            <td>
            <input type="text" id="userCode"/>                
            </td>
            </tr>
            <tr>
            <td>
            <label>Enter your Company Code</label>
            </td>
            <td>
            <input type="text" id="companyCode"/>  
            </td>
            </tr>
            </tbody>
            </table>
                        
            <button 
            className='btn'
            type='submit'
            onClick={this.handleUserReg}
            >Register
           </button>

            </div>
            </div>

            );
        }
        }
        
export default userReg;
// export default withRouter(connect(mapStateToProps)(userReg))