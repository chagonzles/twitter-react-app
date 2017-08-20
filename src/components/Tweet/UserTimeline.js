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

class UserTimeline extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetDiv: null,
      showHomeTimeline: false,
      searchTweetText: ''
    }
    this._onPostTweetTextChange = this._onPostTweetTextChange.bind(this);
  }

  _onPostTweetTextChange(e) {
      var text = e.target.value;
      this.setState({searchTweetText: text});
  }

  _getTweets(e) {
    var e = e ? e.preventDefault() : ''; 
    var self = this;
    request.get('/api/twitter/user_timeline')
           .query({accessToken: Session.getAccessToken(), accessTokenSecret: Session.getAccessTokenSecret()})
           .end(function(err,res){
              if(res) {
                var tweets = res.body.response;
                var tweetDiv = [];
                tweets.forEach((tweet,index)=>(
                    tweetDiv.push(<Tweet data={tweet} key={index}/>)
                ))
                self.setState({tweetDiv: tweetDiv});
                console.log('tweets ', tweetDiv);
              }
    });
  }

  _postTweets() {
    var e = e ? e.preventDefault() : ''; 
  }

  componentDidMount() {
    this._getTweets();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            // <form onSubmit={this._getTweets.bind(this)}>
            //           <FormGroup controlId="formControlsTextarea">
            //             <Row>
            //               <Col sm={10}>
            //                 <ControlLabel><h4>Compose New Tweet</h4></ControlLabel>
            //                 <FormControl placeholder="What's happening?" componentClass="textarea" onChange={this._onPostTweetTextChange} value={this.state.searchTweetText}/>
            //               </Col>
            //               <Col sm={2}>
            //                 <Button bsStyle="primary" type="submit" className={s.tweetButton} disabled={!this.state.searchTweetText} block>
            //                    <span>Tweet</span>
            //                 </Button>
            //               </Col>
            //             </Row>
            //           </FormGroup>
            // </form> 
          }
          
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

export default withStyles(s)(UserTimeline);
