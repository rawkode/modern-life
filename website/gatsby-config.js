module.exports = {
  siteMetadata: {
    title: `Rawkode's Modern Life`,
    name: `David McKay`,
    siteUrl: `https://rawkode.com`,
    description: `David McKay (@rawkode) is a software and technology professional, from Glasgow, Scotland`,
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
      forcedNavOrder: ['/introduction', '/codeblock'],
      ignoreIndex: true
    }
  },
  plugins: [
    {
      resolve: `gatsby-theme-devrel`,
      options: {
        mdxLayout: require.resolve(`../gatsby-theme-rawkode/src/components/Layout.js`),
        abstracts: {
          source: `content/abstracts`,
          slugPrefix: `abstracts`
        },
        events: {
          source: `content/events`,
          slugPrefix: `events`
        }
      }
    },
    {
      resolve: `gatsby-theme-rawkode`,
      options: {
        articles: {
          source: `content/articles`,
          slugPrefix: `articles`
        },
        assetPath: `content/assets`,
        pagePath: `content/pages`
      }
    }
  ]
};
