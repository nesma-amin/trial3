import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import userReg from './UserReg'
// import { Redirect } from 'react-router-dom'



class AccountVerify extends Component {


    componentDidMount(){
        const queryParams = new URLSearchParams(window.location.search);
// const email = queryParams.get('email');
console.log(" Account verify email",queryParams)
        document.addEventListener('DOMContentLoaded',  ()=> {
            fetch('http://localhost:5001/verifyAccount', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email : "engnosy@hotmail.com"})
            })
            .then(response => response.json())
      });
      }
render(){
    const styles = {
        border: '1px solid rgba(0.9, 0.9, 0.5, 0.09)', 
        borderColor: 'black',
        width:'500px',
        high:'900px',
        margin:'auto',
        align:'center',

   };
    return (
            <div className='center' style={styles}>
                <div >
                    <label> Your account Verified</label>

                </div>


           <div>
               <Link to={`/AdminPage`} className='admin'> Home</Link>



           </div>

           </div>

            );
        }
        }
        
export default AccountVerify;