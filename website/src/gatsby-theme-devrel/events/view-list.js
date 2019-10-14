import React from 'react';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import Layout from 'gatsby-theme-rawkode/src/components/Layout';
import ListItem from 'gatsby-theme-devrel/src/events/view-list-item';

export default ({ location, data }) => {
  const { allEvent } = data;

  return (
    <Layout>
      <Styled.h1>Events</Styled.h1>

      {allEvent.edges.map(({ node }) => (
        <ListItem node={node} />
      ))}
    </Layout>
  );
};
