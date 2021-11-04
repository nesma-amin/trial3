import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import { Redirect } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class LogIn extends Component {
    state = {
        selectedUser:{},
        toHome: false,
    
      }
      handleAuthedUserSelect=(e)=> {
                this.setState(() => ({
                  selectedUser: e.value,
                    }));
            }
        
        

        handleAuthedUserSubmit=(e)=>
        {
          const { dispatch} = this.props
          e.preventDefault()
          console.log("this.state.selectedUser", this.state.selectedUser)
          dispatch(setAuthedUser(this.state.selectedUser))
        }
        render() {

          const { userIds } = this.props

        if (this.state.toHome === true) {
            return <Redirect to='/' />
          }

          const styles = {
              border: '1px solid rgba(0.5, 0.5, 0.5, 0.09)', 
              borderColor: 'blue',
              width:'550px',
              high:'850px'

         };
          return (
               <div className='center' style={styles}>
                    <div>Welcome to Database test</div>
                    <div >
                   <label>Name</label>
                   <input type="text" id="inputName"/>
                   <button>Add Name</button>
                    </div>
                    <div >
                    <button 
                    className='btn'
                    type='submit'
                    onClick={this.handleAuthedUserSubmit}
                    >LogIn
                    </button>
                    
                    
            
                <option value="" disabled>Please select</option>
                    </div>
                </div>
               // </Link>
          )
        }
      }
      
      function mapStateToProps ( {users}) {
          
      console.log("users",users)
        return {
          userIds:Object.keys(users)
            
          }
        }
        
      export default withRouter(connect(mapStateToProps)(LogIn))
  


   

