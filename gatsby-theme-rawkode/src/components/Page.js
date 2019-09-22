import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from './Layout';
import SEO from './SEO';

const Page = ({ data, location }) => {
  const { mdx } = data;

  console.log(data);

  return (
    <Layout location={location}>
      <SEO title={mdx.frontmatter.title} />
      <Heading>{mdx.frontmatter.title}</Heading>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  );
};

const Heading = styled.h1`
  padding-top: 0;
  margin-top: 0;
  &::before {
    display: none !important;
  }
`;

Page.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`;

export default Page;
