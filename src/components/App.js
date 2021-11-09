import React, { Component } from 'react'
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
// import BrowserRouter  from 'react-router-dom'

import{connect} from 'react-redux'
import Dashboard from './Dashboard'
import UserReg from './UserReg'
// import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import AdminPage from './AdminPage'
import Login from './Login'
// import NotFound from './NotFound'
import CreateTemplate from './CreateTemplate'
import AccountVerify from './AccountVerify'
import FileUpload from './FileUpload'
import TemplateNewEntry from './TemplateNewEntry'


// import { withRouter } from 'react-router-dom'



class App extends Component {
  componentDidMount(){
    // this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        
        <Router>
          <div className='container'> 
             <Nav /> 
             <Switch>
             <Route exact path='/' render={() => (
                <Login />
              )} />
              <Route exact path='/AdminPage' render={() => (
                <AdminPage />
              )} />
               <Route exact path='/home' render={() => (
                <Dashboard />
              )} />
              <Route exact path='/userReg' render={() => (
                <UserReg />
              )} />
              <Route exact path='/AccountVerify' render={() => (
                <AccountVerify />
              )} />
               <Route exact path='/FileUpload' render={() => (
                <FileUpload />
              )} />
              <Route exact path='/CreateTemplate' render={() => (
                <CreateTemplate />
              )} />
              <Route exact path='/Dashboard' render={() => (
                <Dashboard />
              )} />
              <Route exact path='/TemplateNewEntry' render={() => (
                <TemplateNewEntry />
              )} />
              
              
        </Switch>
      </div>
    </Router>
     
                

             /* <Switch> 
               {      
                this.props.loading === true
                //exact removed, now all pathes lead to login if not authedUser
                  ? <Route path='/'  component={Login}/> 
                  : 
                      <Fragment>
                      <Route path='/home' exact component={Dashboard} />
                      <Route path='/useReg' component={userReg} />
                      <Route path='/' component={Login} />
                      <Route path='/logIn' component={LogOut} />
                      <Route path='/question/:id' component={QuestionPage} />
                      <Route path='/answeredQuestion/:id' component={AnsweredQuestion} />
                      <Route path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                      <Route path='/new' component={NewQuestion} />

                      
                      </Fragment>
                }
                <Route path='/notFound'  component={NotFound} /> */
                 /* </Switch>  */
      // </Router>        
    )
  }
}

function mapStateToProps( {authedUser} ){
  return { 
      loading: authedUser === null 
  };
}
export default connect(mapStateToProps)(App)
