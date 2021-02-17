import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ProtectedRoute from './ProtectedRoute'
import Login from '../Views/Login'
import Register from '../Views/Register'
import AdminDash from '../Views/AdminDash'
import MemberDash from '../Views/MemberDash'
import AdminLoanView from '../Views/AdminLoanView'
import AdminMemberView from '../Views/AdminMemberView'
import Unauthorized from '../Views/Unauthorized'
import {authPayload} from '../session'
import TopNav from '../Components/TopNav'
import { AppBar } from "@material-ui/core";


const useStyles = (theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    display: 'flex',
    height: "100vh"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});


class BaseRouter extends React.Component{
  componentDidMount(){
    if(localStorage.getItem('_id') && localStorage.getItem('role')){
      authPayload.next({auth:true, id: localStorage.getItem('_id'), role: localStorage.getItem('role')})
    }
  }
  render(){

    const { classes } = this.props;
    return (
      <Router className={classes.root}>
        <AppBar position='sticky' color='transparent'>
          <TopNav/>
        </AppBar>
        <main className={classes.content} style={{marginTop: '5vh'}}>
          <Switch>
            {/* Overide Root Path */}
            <Redirect exact from='/' to='/login'/> 
            {/* Unathorized */}
            <Route exact path='/unauthorized' component={Unauthorized}/>
            {/* Login */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register}/>
            {/* Member */}
            <ProtectedRoute exact path='/member/:_id' component={MemberDash} rbac={['member']} />

            {/* Admin */}
            <ProtectedRoute exact path='/admin/:_id' component={AdminDash} rbac={['admin']} />
            <ProtectedRoute exact path='/admin/:_id/member' component={AdminMemberView} rbac={['admin']} />
            <ProtectedRoute exact path='/admin/:_id/loan' component={AdminLoanView} rbac={['admin']} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default withStyles(useStyles)(BaseRouter);