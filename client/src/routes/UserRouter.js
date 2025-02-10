import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Profile from '../containers/Profile';
import ImageUpload from '../containers/ImageUpload';
import Register from '../containers/Register';
import Items from '../containers/Items';
import Projects from '../containers/Projects';
import ItemTypes from '../containers/ItemTypes';
import AddRemove from '../containers/AddRemove';

const UserRouter = () => (
  <Switch key='userrouter'>
    <Route exact path='/' component={Header} />

    <Route exact path='/Profile' component={Profile} />
    <Route exact path='/ImageUpload' component={ImageUpload} />
    <Route exact path='/Items' component={Items} />
    <Route exact path='/Projects' component={Projects} />
    <Route exact path='/ItemTypes' component={ItemTypes} />
    <Route exact path='/register/:type' component={Register} />
    <Route exact path='/addremove' component={AddRemove} />
    <Redirect from='/login' to='/profile' />
  </Switch>
);

export default UserRouter;
