import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const withDefaults = require(`../theme-defaults`);

export default ({ location, data }) => {
  const { abstract } = data;

  return (
    <div>
      <p>{abstract.title}</p>
      <MDXRenderer>{abstract.body}</MDXRenderer>
    </div>
  );
};
