import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Styled } from 'theme-ui';

import Layout from 'gatsby-theme-rawkode/src/components/Layout';

export default ({ location, data }) => {
  const { abstract } = data;

  return (
    <Layout>
      <Styled.h1>{abstract.title}</Styled.h1>
      <MDXRenderer>{abstract.body}</MDXRenderer>
    </Layout>
  );
};
