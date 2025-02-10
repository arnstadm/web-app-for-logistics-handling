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
//import { IoMdPricetags, IoMdHome } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faUser,
  faTags,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

class AdminLink extends Component {
  render() {
    return (
      <Navbar color='light' light expand='md' key='adminlink'>
        <NavbarBrand href='/'>
          {' '}
          <FontAwesomeIcon icon={faHome} /> Hjem
        </NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />
        <Collapse isOpen={this.props.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem eventkey={4}>
              <NavLink href='/profile'>
                <FontAwesomeIcon icon={faUser} /> Min profil
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={faUsers} /> Brukere
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href='/users'>Alle brukere</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/register/user'>Ny bruker</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FontAwesomeIcon icon={faTags} /> Artikler
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href='/items'>Varer</NavLink>
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
            <NavItem eventkey={5}>
              <NavLink href='#' onClick={this.props.logOut}>
                Logg ut <FontAwesomeIcon icon={faSignOutAlt} />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
export default AdminLink;
