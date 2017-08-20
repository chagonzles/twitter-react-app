import React from 'react';
import Twit from 'twit';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';
import AppConstants from '../../constants/AppConstants';
import request from 'superagent';
import Tweet from 'react-tweet'
import {Row,Col,FormGroup,FormControl,ControlLabel,Button,Glyphicon} from 'react-bootstrap';
import Session from '../../core/Session';
import UserTimeline from '../../components/Tweet/UserTimeline';
import UserInfo from '../../components/Profile/UserInfo';

class Profile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Row>
            <Col sm={4}>
              <UserInfo />
            </Col>
            <Col sm={8}>
              <UserTimeline />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);
