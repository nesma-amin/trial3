import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import userReg from './UserReg'
import { Redirect } from 'react-router-dom'



class login extends Component {

    constructor() {
        super();
        this.handleAuthedUserSubmit = this.handleAuthedUserSubmit.bind(this);
      }
handleAuthedUserSubmit=()=>{
    // exports.login = function(req, res, next) {
    //     User.findOne({ email: req.body.email }, function(err, user) {
    //         // error occur
    //         if(err){
    //             return res.status(500).send({msg: err.message});
    //         }
    //         // user is not found in database i.e. user is not registered yet.
    //         else if (!user){
    //             return res.status(401).send({ msg:'The email address ' + req.body.email + ' is not associated with any account. please check and try again!'});
    //         }
    //         // comapre user's password if user is find in above step
    //         else if(!Bcrypt.compareSync(req.body.password, user.password)){
    //             return res.status(401).send({msg:'Wrong Password!'});
    //         }
    //         // check user is verified or not
    //         else if (!user.isVerified){
    //             return res.status(401).send({msg:'Your Email has not been verified. Please click on resend'});
    //         } 
    //         // user successfully logged in
    //         else{
    //             return res.status(200).send('User successfully logged in.');
    //         }
    //     });
    return <Redirect to='/AdminPage' />
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
                <div>Welcome to Login Page</div>
                <div >
                    <label>Name</label>
                    <input type="text" id="inputName"/>
                    <div></div>

                    <label>Password</label>
                    <input type="text" id="inputPassword"/>
                </div>
            <button 
            className='btn'
            type='submit'
            onClick={this.handleAuthedUserSubmit}
            >LogIn
           </button>

           <div>
               <label>Don't have account? </label>
               <Link to={`/userReg`} className='reg'> register</Link>
               <Link to={`/AdminPage`} className='admin'> Admin</Link>
               <Link to={`/FileUpload`} className='fileUpload'> File Upload</Link>



           </div>

           </div>

            );
        }
        }
        
export default login;