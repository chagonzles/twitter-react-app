import React from 'react';
import request from 'superagent';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';
import AppConstants from '../../constants/AppConstants';
import Session from '../../core/Session';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this._signInTwitter = this._signInTwitter.bind(this);
  }

  _signInTwitter() {
    window.location.assign(AppConstants.WEB_APP_URL + "/api/twitter/request-token");
  }

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
            { Session.getAccessToken() && Session.getAccessTokenSecret() &&
                <Nav>
                  <NavItem>Home</NavItem>
                  <NavItem>Profile</NavItem>
                </Nav>
            }
            <Navbar.Form pullRight>
              { Session.getAccessToken() && Session.getAccessTokenSecret() ?
                  <Button bsStyle="success" className={s.signInButton} onClick={this._signInTwitter}>Sign in Another Account</Button>
                  :
                  <Button bsStyle="success" className={s.signInButton} onClick={this._signInTwitter}>Sign in With Twitter</Button>
              }
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withStyles(s)(Header);
