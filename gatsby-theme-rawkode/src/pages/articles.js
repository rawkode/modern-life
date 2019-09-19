import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
    <a href={`/article${article.slug}`}>
      <li key={article.id}>{article.title}</li>
    </a>
  ));

  return (
    <Layout>
      <h1>Articles</h1>
      <ul>{articles}</ul>
    </Layout>
  );
};
