import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Styled } from 'theme-ui';

import Layout from 'gatsby-theme-rawkode/src/components/Layout';

export default ({ location, data }) => {
  const { event } = data;

  return (
    <Layout>
      <Styled.h1>{event.title}</Styled.h1>
      <Styled.p>
        Location: {event.city}, {event.country}
      </Styled.p>
      <Styled.p>Website: {event.url ? event.url : 'None'}</Styled.p>

      <Styled.p>Hashtags: {event.hashtags ? event.hashtags : 'None'}</Styled.p>
    </Layout>
  );
};
