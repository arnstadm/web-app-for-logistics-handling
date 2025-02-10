import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons'


class LoginRegLink extends Component {
  render() {
    return (
      <Navbar color='light' light expand='md' key='loginreglink'>
        <NavbarBrand href='/'><FontAwesomeIcon icon={faHome} />  Hjem</NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />
        <Collapse isOpen={this.props.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem eventkey={1}>
              <NavLink href='/login'><FontAwesomeIcon icon={faSignInAlt} /> Logg inn</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default LoginRegLink;
