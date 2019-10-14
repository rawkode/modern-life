import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import ListItem from './view-list-item';

export default ({ location, data }) => {
  const { allAbstract } = data;

  return (
    <div>
      {allAbstract.edges.map(({ node }) => (
        <ListItem title={node.title} uri={node.slug} />
      ))}
    </div>
  );
};
