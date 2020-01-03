import React from 'react';
import ListItem from 'gatsby-theme-devrel/src/abstracts/view-list-item';
import Layout from 'gatsby-theme-rawkode/src/components/Layout';

export default ({ location, data }) => {
  const { allAbstract } = data;

  const items = allAbstract.edges.map(({ node }) => (
    <ListItem title={node.title} tags={node.tags} uri={node.slug} />
  ));

  return <Layout>{items}</Layout>;
};
