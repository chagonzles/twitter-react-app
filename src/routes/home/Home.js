/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Twit from 'twit';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import AppConstants from '../../constants/AppConstants';
import request from 'superagent';
import Tweet from 'react-tweet'
import {Row,Col,FormGroup,FormControl,ControlLabel,Button,Glyphicon} from 'react-bootstrap';
import Session from '../../core/Session';
import HomeTimeline from '../../components/Tweet/HomeTimeline';
import SearchTimeline from '../../components/Tweet/SearchTimeline';
import UserInfo from '../../components/Profile/UserInfo';

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetDiv: null,
      searchTweetText: 'ReactJS',
      searchTimelineDiv: null,
      showHomeTimeline: false
    }
    this._onSeachTweetTextChange = this._onSeachTweetTextChange.bind(this);
  }

  _onSeachTweetTextChange(e) {
      var text = e.target.value;
      this.setState({searchTweetText: text});
  }

  _getSearchTweets(e) {
    var e = e ? e.preventDefault() : '';  
    var tweetDiv = [];
    tweetDiv.push(<SearchTimeline query={this.state.searchTweetText} key={0}/>);
    this.setState({searchTimelineDiv: tweetDiv});
  }

  componentDidMount() {
    if(Session.getAccessToken() && Session.getAccessTokenSecret()) {
      this.setState({showHomeTimeline: true});
    } else {
      this.setState({showHomeTimeline: false});
      var tweetDiv = [];
      tweetDiv.push(<SearchTimeline query={this.state.searchTweetText} key={0}/>);
      this.setState({searchTimelineDiv: tweetDiv});   
    }  
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>

         { this.state.showHomeTimeline ?
            <Row>
              <Col sm={4}>
                <UserInfo />
              </Col>
              <Col sm={8}>
                <HomeTimeline />
              </Col>
            </Row>
           :
          this.state.searchTimelineDiv       
         }
         
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
