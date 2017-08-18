import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Twitter-App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {/**<NavItem eventKey={1} href="#">Link</NavItem>
                            <NavItem eventKey={2} href="#">Link</NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                              <MenuItem eventKey={3.1}>Action</MenuItem>
                              <MenuItem eventKey={3.2}>Another action</MenuItem>
                              <MenuItem eventKey={3.3}>Something else here</MenuItem>
                              <MenuItem divider />
                              <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>**/}
            </Nav>
            <Nav pullRight>
              <Button bsStyle="success" className={s.signInButton}>Sign in With Twitter</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withStyles(s)(Header);
