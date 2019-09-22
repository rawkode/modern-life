import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import Layout from '../components/Layout';

export default ({ location, data }) => {
  const { allArticle } = data;

  return (
    <Layout>
      {allArticle.edges.map(({ node }) => (
        <li>
          <Styled.a as={Link} to={node.slug}>
            {node.title}
          </Styled.a>
        </li>
      ))}
    </Layout>
  );
};
