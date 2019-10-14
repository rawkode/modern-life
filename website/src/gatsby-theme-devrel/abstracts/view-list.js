import React from 'react';
import { Link } from 'gatsby';
import { Styled } from 'theme-ui';
import Layout from 'gatsby-theme-rawkode/src/components/Layout';
import ListItem from 'gatsby-theme-devrel/src/abstracts/view-list-item';

export default ({ location, data }) => {
  const { allAbstract } = data;

  return (
    <Layout>
      <Styled.h1>Public Speaking</Styled.h1>
      <Styled.p>
        I am more than happy to come and speak at your event. Please find a list of abstracts I have
        available.
      </Styled.p>

      <Styled.p>
        Even if one of the below doesnt pique your interest, get in touch and we can tailor
        something unique to your audience.
      </Styled.p>

      <Styled.h2>Abstracts</Styled.h2>

      {allAbstract.edges.map(({ node }) => (
        <ListItem title={node.title} uri={node.slug} />
      ))}
    </Layout>
  );
};
