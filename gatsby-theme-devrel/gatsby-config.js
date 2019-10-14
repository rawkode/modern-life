const emoji = require(`remark-emoji`);

const withDefaults = require(`./src/theme-defaults`);

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.abstracts.source,
          name: options.abstracts.source
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.events.source,
          name: options.events.source
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          defaultLayouts: {
            default: withDefaults.mdxLayout
          },
          remarkPlugins: [emoji]
        }
      },
      `gatsby-plugin-styled-components`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-react-helmet`
    ]
  };
};
