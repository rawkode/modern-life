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

const createEventSchema = ({ createTypes }, schema) => {
  createTypes(`interface Event @nodeInterface {
      id: ID!
      title: String!
      slug: String!
      startDate: Date! @dateformat
      endDate: Date @dateformat
      country: String
      city: String
      url: String
      hashtags: [String]
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxEvent`,
      fields: {
        id: { type: `ID!` },
        title: {
          type: `String!`
        },
        slug: {
          type: `String!`
        },
        startDate: { type: `Date!`, extensions: { dateformat: {} } },
        endDate: { type: `Date`, extensions: { dateformat: {} } },
        country: { type: `String` },
        city: { type: `String` },
        url: { type: `String` },
        hashtags: { type: `[String]` }
      },
      interfaces: [`Node`, `Event`]
    })
  );
};

const createSlug = (node, config) => {
  const date = new Date(node.frontmatter.startDate);

  return urlResolve(
    config.events.slugPrefix,
    date.getFullYear().toString(),
    `0${date.getMonth() + 1}`.slice(-2),
    `0${date.getDate()}`.slice(-2),
    slugify(node.frontmatter.title, {
      lower: true
    })
  );
};

const createFieldData = (node, slug) => {
  return {
    title: node.frontmatter.title,
    startDate: node.frontmatter.startDate,
    endDate: node.frontmatter.endDate,
    country: node.frontmatter.country,
    city: node.frontmatter.city,
    url: node.frontmatter.url,
    hashtags: node.frontmatter.hashtags,
    slug
  };
};

const createEventNodes = async (
  node,
  config,
  getNode,
  createNodeId,
  { createNode, createParentChildLink }
) => {
  const slug = createSlug(node, config);
  const fieldData = createFieldData(node, slug);
  const mdxEventId = createNodeId(`${node.id} >>> MdxEvent`);

  await createNode({
    ...fieldData,
    // Required fields.
    id: mdxEventId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxEvent`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData),
      description: `Mdx implementation of the Event interface`
    }
  });

  createParentChildLink({ parent: node, child: getNode(mdxEventId) });
};

// These templates are simply data-fetching wrappers that import components
const EventListTemplate = require.resolve(`./query-events.js`);
const EventTemplate = require.resolve(`./query-event.js`);

const createEventPages = async (config, graphql, actions, reporter) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allEvent(sort: { fields: [startDate], order: ASC }, limit: 1000) {
        edges {
          node {
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
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // Create Events and Event pages.
  const { allEvent } = result.data;
  const events = allEvent.edges;

  // Create a page for each Article
  events.forEach(({ node: event }, index) => {
    const previous = index === events.length - 1 ? null : events[index + 1];
    const next = index === 0 ? null : events[index - 1];
    const { slug } = event;

    createPage({
      path: slug,
      component: EventTemplate,
      context: {
        id: event.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined
      }
    });
  });

  createPage({
    path: config.events.slugPrefix,
    component: EventListTemplate,
    context: {}
  });
};

module.exports = {
  createEventSchema,
  createEventNodes,
  createEventPages
};
