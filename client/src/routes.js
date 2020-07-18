import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/home';
import AdminLogin from './components/admin/login';
import AdminDashboard from './components/admin/dashboard';
import UserLogin from './components/user/login';
import UserDashboard from './components/user/dashboard';
import UserExam from './components/user/dashboard/exam';
import UserResult from './components/user/dashboard/result';

const Routes = ()=>{
  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/user/login" component={UserLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/user/dashboard" component={UserDashboard} />
      <Route path="/user/exam" component={UserExam} />
      <Route path="/user/result" component={UserResult} />
    </Switch>
  );
}

export default Routes;