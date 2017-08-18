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

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      twitter: null
    }
  }

  componentDidMount() {
    request.get('api/twitter')
          .end(function(err,res){
            console.log('res',res);
    })
  }

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
