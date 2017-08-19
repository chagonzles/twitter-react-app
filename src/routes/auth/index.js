/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Auth from './Auth';

const title = 'Authenticating';

function action(context) {
  console.log('context ', context)
  return {
    title,
    component: (
      <Layout>
        <Auth title={title} accessToken={context.params.accessToken} accessTokenSecret={context.params.accessTokenSecret}/>
      </Layout>
    ),
  };
}

export default action;
