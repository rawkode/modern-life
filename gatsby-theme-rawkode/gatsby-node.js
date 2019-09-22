const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);

const withDefaults = require(`./src/theme-defaults`);
const {
  createArticleSchema,
  createArticleNodes,
  createArticlePages
} = require(`./src/articles/registerType`);

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const config = withDefaults(themeOptions);

  const dirs = [
    path.join(program.directory, config.articles.source),
    path.join(program.directory, config.assetPath),
    path.join(program.directory, config.pagePath)
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createArticleSchema(actions, schema);
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const config = withDefaults(themeOptions);

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  const parentNode = getNode(node.parent);
  const source = parentNode.sourceInstanceName;

  switch (source) {
    case config.articles.source:
      createArticleNodes(node, config, getNode, createNodeId, actions);
      break;
    default:
      break;
  }
};

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const config = withDefaults(themeOptions);

  createArticlePages(config, graphql, actions, reporter);
};
