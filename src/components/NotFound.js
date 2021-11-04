import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

class NotFound extends Component {
    
        render() {

       
          return (
               <div className='center' >
                    <h2>404 page not found</h2>

                </div>
          )
        }
      }

        
      export default withRouter(connect()(NotFound))
  


   

