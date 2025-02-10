import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faTags,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

class UserLink extends Component {
  render() {
    return (
      <Navbar color='light' light expand='md' key='userlink'>
        <NavbarBrand href='/'>
          <FontAwesomeIcon icon={faHome} /> Hjem
        </NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />
        <Collapse isOpen={this.props.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem eventkey={2}>
              <NavLink href='/profile'>
                <FontAwesomeIcon icon={faUser} /> Min profil
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Artikler
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href='/items'>
                    <FontAwesomeIcon icon={faTags} /> Varer
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/register/item'>Ny vare</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/projects'>Prosjekter</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/register/project'>Nytt prosjekt</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/itemtypes'>Varetyper</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/register/itemtype'>Ny varetype</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/addremove'>Last opp bilde</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem eventkey={3}>
              <NavLink href='#' onClick={this.props.logOut}>
                Logg ut <FontAwesomeIcon icon={faSignOutAlt} />
              </NavLink>
            </NavItem>{' '}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default UserLink;
