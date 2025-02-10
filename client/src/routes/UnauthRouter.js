import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Profile from '../containers/Profile';

const UnauthRouter = () => (
  <Switch key='unauthrouter'>
    <Route exact path='/' component={Header} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={SignUp} />
    <Route exact path='/profile' component={Profile} />
  </Switch>
);

export default UnauthRouter;
