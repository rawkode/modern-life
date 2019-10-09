import { graphql } from 'gatsby';
import ArticlesPage from './view-list';

export default ArticlesPage;

export const query = graphql`
  query ArticlesQuery {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    allArticle(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          excerpt
          slug
          title
          tags
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
