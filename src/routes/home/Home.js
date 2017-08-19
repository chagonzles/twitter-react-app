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

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      tweetDiv: null,
      searchTweetText: 'Game of Thrones'
    }
    this._onSeachTweetTextChange = this._onSeachTweetTextChange.bind(this);
  }

  _onSeachTweetTextChange(e) {
      var text = e.target.value;
      this.setState({searchTweetText: text});
  }

  _getTweets(e) {
    var e = e ? e.preventDefault() : '';  
    console.log('get tweets!', this.state.searchTweetText);
    var self = this;
    
    request.get('api/twitter/tweets')
           .query({q: this.state.searchTweetText})
           .end(function(err,res){
              if(res) {
                var tweets = res.body.response.statuses;
                var tweetDiv = [];
                tweets.forEach((tweet,index)=>(
                    tweetDiv.push(<Tweet data={tweet} key={index}/>)
                ))
                self.setState({tweetDiv: tweetDiv});
                console.log('tweets ', tweetDiv);
              }
    });
  }

  componentDidMount() {
    this._getTweets();
    // var self = this;
    // setInterval(function() {
    //   self._getTweets(); 
    // }, 10000);    
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this._getTweets.bind(this)}>
            <FormGroup controlId="formControlsTextarea">
              <Row>
                <Col sm={10}>
                  <ControlLabel>Search for Tweets</ControlLabel>
                  <FormControl placeholder="Search for.." onChange={this._onSeachTweetTextChange} value={this.state.searchTweetText}/>
                </Col>
                <Col sm={2}>
                  <Button bsStyle="primary" type="submit" className={s.searchButton} disabled={!this.state.searchTweetText} block>
                    <Glyphicon glyph="search"/> <span>Search</span>
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </form>
          {this.state.tweetDiv}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
