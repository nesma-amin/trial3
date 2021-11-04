import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'



class Nav extends Component {
  render(){
    const { authedUser } = this.props;

  return (
    <nav className='nav'>
      {authedUser&&
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderBoard' activeClassName='active'>
            Leader Board
          </NavLink>
          </li> */}
        
        <li>
            Logged User is:{authedUser}
          </li>
        <li>
          <NavLink to='/login' activeClassName='active'>
            LogOut
          </NavLink>
        </li>
      </ul>
  }
    </nav>
  )
} 
}
function mapStateToProps( {authedUser} ){
  return { 
    authedUser:authedUser?authedUser[0]:null
  };
}
export default withRouter(connect(mapStateToProps)(Nav))