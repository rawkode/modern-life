import React from 'react';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import Layout from 'gatsby-theme-rawkode/src/components/Layout';
import ListItem from 'gatsby-theme-devrel/src/abstracts/view-list-item';

export default ({ location, data }) => {
  const { allAbstract } = data;

  return (
    <Layout>
      <Styled.h1>Abstracts</Styled.h1>

      {allAbstract.edges.map(({ node }) => (
        <ListItem title={node.title} uri={node.slug} />
      ))}
    </Layout>
  );
};
