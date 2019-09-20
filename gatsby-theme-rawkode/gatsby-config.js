const withDefaults = require(`./src/theme-defaults`);

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);
  const { mdx = true } = themeOptions;

  return {
    siteMetadata: {
      title: `Rawkode by Rawkode`,
      name: `Rawkode`,
      siteUrl: `https://rawkode.com`,
      description: `Rawkode's GatsbyJS Theme (Modified Document by Code Bushi)`,
      social: [
        {
          name: `github`,
          url: `https://github.com/rawkode`
        },
        {
          name: `twitter`,
          url: `https://twitter.com/rawkode`
        }
      ],
      sidebarConfig: {
        forcedNavOrder: ['/'],
        ignoreIndex: false
      }
    },
    plugins: [
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          defaultLayout: `./src/components/Layout.js`,
          gatsbyRemarkPlugins: [
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 1380,
                linkImagesToOriginal: false
              }
            },
            { resolve: `gatsby-remark-copy-linked-files` },
            { resolve: `gatsby-remark-smartypants` }
          ],
          remarkPlugins: [require(`remark-slug`)]
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.contentPath || `content/articles`,
          name: options.contentPath || `content/articles`
        }
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `Rawkode`,
          short_name: `Rawkode`,
          start_url: `/`,
          background_color: `#182952`,
          theme_color: `#a2466c`,
          display: `standalone`,
          icon: 'src/site-icon.png'
        }
      },
      `gatsby-plugin-sharp`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-react-helmet`
    ]
  };
};
