import React from 'react';
import request from 'superagent';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';
import {Row,Col,Image} from 'react-bootstrap';
import AppConstants from '../../constants/AppConstants';
import Session from '../../core/Session';

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    var self = this;
    request.get('/api/twitter/account/verify_credentials')
           .query({accessToken: Session.getAccessToken(), accessTokenSecret: Session.getAccessTokenSecret()})
           .end(function(err,res){
              if(res) {
                var user = res.body.response;
                self.setState({user: user});
                console.log('user ',user);
              }
    });
  }
  render() {
    if(this.state.user) {
      var name = this.state.user.name ? this.state.user.name : '';
      var profileImage = this.state.user.profile_image_url ? this.state.user.profile_image_url : null;
      var screenName = this.state.user.screen_name ? this.state.user.screen_name : '';
      var tweetsCount = this.state.user.statuses_count ? this.state.user.statuses_count : 0;
      var followingCount = this.state.user.friends_count ? this.state.user.friends_count : '';
      var followersCount = this.state.user.followers_count ? this.state.user.followers_count : 0;
    }
    return (
      <div className={s.userInfoContainer}>
        <Image className={s.thumbnail} src={profileImage} circle responsive/>
        <div className={s.fullName}>{name}</div>
        <div className={s.userName}>{screenName ? '@' +screenName : ''}</div>
        <Row className={s.userStats}> 
          <Col xs={4}>
            <div className={s.statName}>Tweets</div>
            <div className={s.statValue}>{tweetsCount}</div>
          </Col>
          <Col xs={4}>
            <div className={s.statName}>Following</div>
            <div className={s.statValue}>{followingCount}</div>
          </Col>
          <Col xs={4}>
            <div className={s.statName}>Followers</div>
            <div className={s.statValue}>{followersCount}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(UserInfo);
