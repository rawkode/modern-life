import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import Layout from '../components/Layout';
import ListItem from './view-list-item';

export default ({ location, data }) => {
  const { allArticle } = data;

  return (
    <Layout>
      {allArticle.edges.map(({ node }) => (
        <ListItem
          title={node.title}
          tags={node.tags}
          excerpt={node.excerpt}
          date={node.date}
          uri={node.slug}
        />
      ))}
    </Layout>
  );
};
