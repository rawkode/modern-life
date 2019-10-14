import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import ListItem from './view-list-item';

export default ({ location, data }) => {
  const { allEvent } = data;

  return (
    <div>
      {allEvent.edges.map(({ node }) => (
        <ListItem node={node} />
      ))}
    </div>
  );
};
