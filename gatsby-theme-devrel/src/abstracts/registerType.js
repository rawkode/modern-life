const path = require(`path`);
const crypto = require(`crypto`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { urlResolve } = require(`gatsby-core-utils`);
const slugify = require('slugify');

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

const createAbstractSchema = ({ createTypes }, schema) => {
  createTypes(`interface Abstract @nodeInterface {
      id: ID!
      title: String!
      slug: String!
      body: String!
      tags: [String]
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxAbstract`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`
        },
        slug: {
          type: `String!`
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        },
        tags: {
          type: `[String]`
        }
      },
      interfaces: [`Node`, `Abstract`]
    })
  );
};

const createSlug = (node, config) => {
  return urlResolve(
    config.abstracts.slugPrefix,
    slugify(node.frontmatter.id, {
      lower: true
    })
  );
};

const createFieldData = (node, slug) => {
  return {
    title: node.frontmatter.title,
    slug,
    tags: node.frontmatter.tags
  };
};

const createAbstractNodes = async (
  node,
  config,
  getNode,
  createNodeId,
  { createNode, createParentChildLink }
) => {
  const slug = createSlug(node, config);
  const fieldData = createFieldData(node, slug);
  const mdxAbstractId = node.frontmatter.id;

  await createNode({
    ...fieldData,
    // Required fields.
    id: mdxAbstractId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxAbstract`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData),
      description: `Mdx implementation of the Abstract interface`
    }
  });
  createParentChildLink({ parent: node, child: getNode(mdxAbstractId) });
};

// These templates are simply data-fetching wrappers that import components
const AbstractListTemplate = require.resolve(`./query-abstracts`);
const AbstractTemplate = require.resolve(`./query-abstract`);

const createAbstractPages = async (config, graphql, actions, reporter) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allAbstract(sort: { fields: [title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            title
            slug
            tags
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Abstracts and Abstract pages.
  const { allAbstract } = result.data;
  const abstracts = allAbstract.edges;

  // Create a page for each Article
  abstracts.forEach(({ node: abstract }, index) => {
    const previous = index === abstracts.length - 1 ? null : abstracts[index + 1];
    const next = index === 0 ? null : abstracts[index - 1];
    const { slug } = abstract;

    createPage({
      path: slug,
      component: AbstractTemplate,
      context: {
        id: abstract.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined
      }
    });
  });

  createPage({
    path: config.abstracts.slugPrefix,
    component: AbstractListTemplate,
    context: {}
  });
};

module.exports = {
  createAbstractSchema,
  createAbstractNodes,
  createAbstractPages
};
