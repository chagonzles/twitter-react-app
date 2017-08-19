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
import s from './Tweet.css';
import AppConstants from '../../constants/AppConstants';
import request from 'superagent';
import Tweet from 'react-tweet'
import {Row,Col,FormGroup,FormControl,ControlLabel,Button,Glyphicon,Image} from 'react-bootstrap';
import Session from '../../core/Session';
import spinner from './spinner.gif';

class HomeTimeline extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetDiv: null
    }
  }

  _getTweets() {
    var self = this;
    request.get('api/twitter/home_timeline')
           .query({accessToken: Session.getAccessToken(), accessTokenSecret: Session.getAccessTokenSecret()})
           .end(function(err,res){
              if(res) {
                var tweets = res.body.response;
                console.log('res ',res);
                var tweetDiv = [];
                tweets.forEach((tweet,index)=>(
                    tweetDiv.push(<Tweet data={tweet} key={index}/>)
                ))
                self.setState({tweetDiv: tweetDiv});
              }
    });
  }

  componentDidMount() {
    this._getTweets();
     var self = this;
     setInterval(function() {
       self._getTweets(); 
     }, 70000);    
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.tweetDiv ?
            this.state.tweetDiv
            :
            <Row>
              <Col sm={4} smOffset={4}>
                <Image src={spinner} className={s.spinner}/>
              </Col>
            </Row>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HomeTimeline);
