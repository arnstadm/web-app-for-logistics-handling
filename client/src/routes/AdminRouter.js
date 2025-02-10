import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Register from '../containers/Register';
import Profile from '../containers/Profile';
import ImageUpload from '../containers/ImageUpload';
import Users from '../containers/Users';
import Items from '../containers/Items';
import Projects from '../containers/Projects';
import ItemTypes from '../containers/ItemTypes';
import Edit from '../containers/Edit';
import AddRemove from '../containers/AddRemove';

const AdminRouter = () => (
  <Switch key='adminrouter'>
    <Route exact path='/' component={Header} />
    <Route exact path='/Profile' component={Profile} />
    <Route exact path='/ImageUpload' component={ImageUpload} />
    <Route exact path='/Users' component={Users} />
    <Route exact path='/Items' component={Items} />
    <Route exact path='/Projects' component={Projects} />
    <Route exact path='/ItemTypes' component={ItemTypes} />
    <Route exact path='/register/:type' component={Register} />
    <Route exact path='/edit/:type/:id' component={Edit} />
    <Route exact path='/addremove' component={AddRemove} />
    <Redirect from='/login' to='/profile' />
  </Switch>
);

export default AdminRouter;
