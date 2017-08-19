/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Session from '../../core/Session';
import history from '../../history';

class Auth extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    accessTokenSecret: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props!', this.props);
    Session.setUser('charrr');
    Session.setAccessToken(this.props.accessToken);
    Session.setAccessTokenSecret(this.props.accessTokenSecret);

    console.log('Session!!', Session.getAccessToken());
    history.replace('/');
  }

  render() {
    return (
        <div style={{height: '500px'}}>
        </div>
      
    );
  }
}

export default Auth;
