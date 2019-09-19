const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);
const crypto = require(`crypto`);
const Debug = require(`debug`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);

const debug = Debug(`gatsby-theme-rawkode`);
const withDefaults = require(`./src/theme-defaults`);

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const { contentPath, assetPath } = withDefaults(themeOptions);

  const dirs = [path.join(program.directory, contentPath), path.join(program.directory, assetPath)];

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`);
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

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

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
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

// Create fields for article slugs and source
// This will change with schema customization with work
exports.onCreateNode = async ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNode, createParentChildLink } = actions;
  const { contentPath, basePath } = withDefaults(themeOptions);

  console.log(`Type: ${node.internal.type}`);
  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === `Mdx` && source === contentPath) {
    let slug;
    if (node.frontmatter.slug) {
      if (path.isAbsolute(node.frontmatter.slug)) {
        // absolute paths take precedence
        slug = node.frontmatter.slug;
      } else {
        // otherwise a relative slug gets turned into a sub path
        slug = urlResolve(basePath, node.frontmatter.slug);
      }
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: contentPath
      });

      slug = urlResolve(basePath, filePath);
    }
    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || []
    };

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
  }
};

// These templates are simply data-fetching wrappers that import components
const ArticleTemplate = require.resolve(`./src/articles/query-article.js`);
const ArticlesTemplate = require.resolve(`./src/articles/query-articles.js`);

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { basePath } = withDefaults(themeOptions);

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
      path: `article${slug}`,
      component: ArticleTemplate,
      context: {
        id: article.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined
      }
    });
  });

  // // Create the Articles page
  createPage({
    path: basePath,
    component: ArticlesTemplate,
    context: {}
  });
};
