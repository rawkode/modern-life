import { graphql } from 'gatsby';
import EventsPage from './view-list';

export default EventsPage;

export const query = graphql`
  query EventsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allEvent(sort: { fields: [startDate, title], order: ASC }, limit: 1000) {
      edges {
        node {
          id
          slug
          title
          startDate(formatString: "MMM DD, YYYY")
          endDate(formatString: "MMM DD, YYYY")
          country
          city
          url
          hashtags
        }
      }
    }
  }
`;
