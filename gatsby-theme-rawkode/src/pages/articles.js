import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { Styled } from 'theme-ui';
import Layout from '../components/Layout';

export default () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
        }
      }

      allArticle(limit: 10) {
        nodes {
          title
          slug
          excerpt
          date(formatString: "YYYY-MM-DD")
          tags
          id
          body
        }
      }
    }
  `);

  const articles = data.allArticle.nodes.map(article => (
    <Styled.a as={Link} to={`/article${article.slug}`}>
      {article.title}
    </Styled.a>
  ));

  return (
    <Layout>
      <h1>Articles</h1>
      <ul>{articles}</ul>
    </Layout>
  );
};
