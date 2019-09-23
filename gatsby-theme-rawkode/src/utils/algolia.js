const articleQuery = `{
    articles: allArticle(sort: { fields: [date, title], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
}`;

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest
  }));
const settings = { attributesToSnippet: [`excerpt:20`] };

const queries = [
  {
    query: articleQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Articles`,
    settings
  }
];

module.exports = queries;
