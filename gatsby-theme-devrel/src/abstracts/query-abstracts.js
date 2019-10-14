import { graphql } from 'gatsby';
import AbstractsPage from './view-list';

export default AbstractsPage;

export const query = graphql`
  query AbstractsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allAbstract(sort: { fields: [title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`;
