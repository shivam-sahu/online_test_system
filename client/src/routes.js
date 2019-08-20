import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/home';
import AdminLogin from './components/admin/login';
import AdminDashboard from './components/admin/dashboard'

const Routes = ()=>{
  return(
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/admin/login" component={AdminLogin}/>
      <Route path="/admin/dashboard" component={AdminDashboard}/>
    </Switch>
  );
}

export default Routes;