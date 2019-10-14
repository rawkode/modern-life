const fs = require(`fs`);
const path = require(`path`);
const mkdirp = require(`mkdirp`);

const withDefaults = require(`./src/theme-defaults`);
const {
  createAbstractSchema,
  createAbstractNodes,
  createAbstractPages
} = require(`./src/abstracts/registerType`);

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState();
  const config = withDefaults(themeOptions);

  const dirs = [path.join(program.directory, config.abstracts.source, config.events.source)];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  createAbstractSchema(actions, schema);
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
    case config.abstracts.source:
      createAbstractNodes(node, config, getNode, createNodeId, actions);
      break;
    default:
      break;
  }
};

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const config = withDefaults(themeOptions);

  createAbstractPages(config, graphql, actions, reporter);
};
