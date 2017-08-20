import React from 'react';
import Search from './Search';
import Layout from '../../components/Layout';

const title = 'Search';

function action() {
  return {
    title,
    component: (
      <Layout>
        <Search title={title} />
      </Layout>
    ),
  };
}

export default action;
