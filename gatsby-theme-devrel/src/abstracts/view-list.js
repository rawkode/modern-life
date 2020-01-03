import React from 'react';
import ListItem from './view-list-item';

export default ({ location, data }) => {
  const { allAbstract } = data;

  const items = allAbstract.edges.map(({ node }) => (
    <ListItem title={node.title} tags={node.tags} uri={node.slug} />
  ));

  return <div>{items}</div>;
};
