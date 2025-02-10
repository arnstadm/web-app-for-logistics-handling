import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AdminLink from '../components/navbar/AdminLink';
import LoginRegLink from '../components/navbar/LoginRegLink';
import UserLink from '../components/navbar/UserLink';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      authenticated: false,
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logOut = e => {
    e.preventDefault();
    let path = `/`;
    localStorage.removeItem('usertoken');
    this.props.history.push(path);
  };
  render() {
    let user_level;
    if (localStorage.getItem('usertoken')) {
      const token = localStorage.getItem('usertoken');
      const decoded = jwt_decode(token);
      user_level = decoded.user_level;
    }

    return (
      <div>
        {localStorage.getItem('usertoken') ? (
          [
            user_level === 'Admin' ? (
              <AdminLink
                key='admin'
                toggle={this.toggle}
                logOut={this.logOut}
                isOpen={this.state.isOpen}
              />
            ) : (
                <UserLink
                  key='user'
                  toggle={this.toggle}
                  logOut={this.logOut}
                  isOpen={this.state.isOpen}
                />
              )
          ]
        ) : (
            <LoginRegLink
              key='reg'
              toggle={this.toggle}
              logOut={this.logOut}
              isOpen={this.state.isOpen}
            />
          )}
      </div>
    );
  }
}

export default withRouter(Navbar);
