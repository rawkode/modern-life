const withDefaults = require(`./src/theme-defaults`);
const queries = require('./src/utils/algolia');

require('dotenv').config();

module.exports = themeOptions => {
  const options = withDefaults(themeOptions);

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
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.articles.source,
          name: options.articles.source
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.assetPath,
          name: options.assetPath
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: options.pagePath,
          name: `pages`
        }
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: options.pagePath
        }
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/Layout').default
          }
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
      // {
      //   resolve: `gatsby-plugin-algolia`,
      //   options: {
      //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
      //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
      //     queries,
      //     chunkSize: 10000
      //   }
      // },
      {
        resolve: 'gatsby-plugin-google-tagmanager',
        options: {
          id: 'GTM-5Q6RG35',
          includeInDevelopment: false,
          defaultDataLayer: { platform: 'gatsby' }
        }
      },
      `gatsby-plugin-styled-components`,
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-emotion`,
      `gatsby-plugin-theme-ui`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-robots-txt`,
      `gatsby-plugin-sitemap`
    ]
  };
};
