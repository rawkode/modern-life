import { graphql } from 'gatsby';
import EventPage from './view-single';

export default EventPage;

export const query = graphql`
  query EventQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    event(id: { eq: $id }) {
      id
      slug
      title
      startDate
      endDate
      country
      city
      url
      hashtags
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
