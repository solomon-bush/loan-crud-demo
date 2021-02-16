import React from "react";import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute'
import LoginPage from '../Views/login.js';
import RegisterPage from '../Views/register'
import BorrowerDash from '../Views/Borrower/dash'
import LoanCreate from '../Views/Loan/create'
import LoanInfo from '../Views/Loan/info'
import LoanPayment from '../Views/Loan/payment'
import AdminDash from '../Views/Admin/dash'
import AdminLoans from '../Views/Admin/loans'
import AdminUsers from '../Views/Admin/users'

 


 class BaseRouter extends React.Component{
    render(){
      return (
        <Router>
          <Switch>
            {/* Login */}
            <Route exact path='/' component={LoginPage}/>
            <Route exact path='/register' component={RegisterPage}/>
            
            
            {/* Borrower Routes */}
            <Route exact path='/borrower/:_id' component={BorrowerDash}/>
            <Route exact path='/borrower/:_id/loan/create' component={LoanCreate}/>
            <Route exact path='/borrower/:_id/loan/:_id' component={LoanInfo}/>
            <Route exact path='/borrower/:_id/loan/:_id/payment' component={LoanPayment}/>

            {/* Admin Routes */}
            <Route exact path='/admin/:_id' component={AdminDash}/>
            <Route exact path='/admin/:_id/loans' component={AdminLoans}/>
            <Route exact path='/admin/:_id/users' component={AdminUsers}/>
          </Switch>
        </Router>
      );
    }
  }
  
  export default BaseRouter;