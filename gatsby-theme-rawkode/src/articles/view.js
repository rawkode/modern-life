import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';

export default ({ location, data }) => {
  const { article, previous, next } = data;

  return (
    <Layout>
      <MDXRenderer>{article.body}</MDXRenderer>;
    </Layout>
  );
};
