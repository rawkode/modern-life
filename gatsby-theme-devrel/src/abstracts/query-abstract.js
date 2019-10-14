import { graphql } from 'gatsby';
import AbstractPage from './view-single';

export default AbstractPage;

export const query = graphql`
  query AbstractQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    abstract(id: { eq: $id }) {
      id
      slug
      title
      body
    }
    previous: abstract(id: { eq: $previousId }) {
      id
      slug
      title
    }
    next: abstract(id: { eq: $nextId }) {
      id
      slug
      title
    }
  }
`;
