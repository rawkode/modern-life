import React from 'react';
import { Styled } from 'theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default ({ location, data }) => {
  const { event } = data;

  return (
    <div>
      <Styled.p>{event.title}</Styled.p>
      <Styled.p>{event.country}</Styled.p>
    </div>
  );
};
