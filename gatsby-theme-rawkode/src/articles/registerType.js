const path = require(`path`);
const crypto = require(`crypto`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

const mdxResolverPassthrough = fieldName => async (source, args, context, info) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName
  });
  return result;
};

const createArticleSchema = ({ createTypes }, schema) => {
  createTypes(`interface Article @nodeInterface {
      id: ID!
      title: String!
      body: String!
      slug: String!
      date: Date! @dateformat
      tags: [String]!
      keywords: [String]!
      excerpt: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxArticle`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`
        },
        slug: {
          type: `String!`
        },
        date: { type: `Date!`, extensions: { dateformat: {} } },
        tags: { type: `[String]!` },
        keywords: { type: `[String]!` },
        excerpt: {
          type: `String!`,
          args: {
            pruneLength: {
              type: `Int`,
              defaultValue: 140
            }
          },
          resolve: mdxResolverPassthrough(`excerpt`)
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        }
      },
      interfaces: [`Node`, `Article`]
    })
  );
};

const createSlug = (node, parentNode, getNode, config) => {
  if (!node.frontmatter.slug) {
    return urlResolve(
      config.articles.slugPrefix,
      createFilePath({ node: parentNode, getNode, basePath: config.articles.slugPrefix })
    );
  }

  if (path.isAbsolute(node.frontmatter.slug)) {
    return node.frontmatter.slug;
  }

  const date = new Date(node.frontmatter.date);

  return urlResolve(
    config.articles.slugPrefix,
    date.getFullYear().toString(),
    date.getMonth().toString(),
    date.getDay().toString(),
    node.frontmatter.slug
  );
};

const createFieldData = (node, slug) => {
  return {
    title: node.frontmatter.title,
    tags: node.frontmatter.tags || [],
    slug,
    date: node.frontmatter.date,
    keywords: node.frontmatter.keywords || []
  };
};

const createArticleNodes = async (
  node,
  config,
  getNode,
  createNodeId,
  { createNode, createParentChildLink }
) => {
  const parentNode = getNode(node.parent);

  const slug = createSlug(node, parentNode, getNode, config);
  const fieldData = createFieldData(node, slug);
  const mdxArticleId = createNodeId(`${node.id} >>> MdxArticle`);

  await createNode({
    ...fieldData,
    // Required fields.
    id: mdxArticleId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxArticle`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData),
      description: `Mdx implementation of the Article interface`
    }
  });
  createParentChildLink({ parent: node, child: getNode(mdxArticleId) });
};

// These templates are simply data-fetching wrappers that import components
const ArticleListTemplate = require.resolve(`./query-articles.js`);
const ArticleTemplate = require.resolve(`./query-article.js`);

const createArticlePages = async (config, graphql, actions, reporter) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allArticle(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Articles and Article pages.
  const { allArticle } = result.data;
  const articles = allArticle.edges;

  // Create a page for each Article
  articles.forEach(({ node: article }, index) => {
    const previous = index === articles.length - 1 ? null : articles[index + 1];
    const next = index === 0 ? null : articles[index - 1];
    const { slug } = article;

    createPage({
      path: slug,
      component: ArticleTemplate,
      context: {
        id: article.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined
      }
    });
  });

  createPage({
    path: `${config.articles.slugPrefix}s`,
    component: ArticleListTemplate,
    context: {}
  });
};

module.exports = {
  createArticleSchema,
  createArticleNodes,
  createArticlePages
};
