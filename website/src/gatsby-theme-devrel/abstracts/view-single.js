import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from 'gatsby-theme-rawkode/src/components/Layout';

export default ({ location, data }) => {
  const { abstract } = data;

  return (
    <Layout>
      <p>{abstract.title}</p>
      <MDXRenderer>{abstract.body}</MDXRenderer>
    </Layout>
  );
};
