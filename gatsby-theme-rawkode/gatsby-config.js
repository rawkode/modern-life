module.exports = {
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `pages`,
        name: `pages`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 704
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false
            }
          },
          `gatsby-remark-embed-video`
        ]
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
