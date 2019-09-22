module.exports = themeOptions => {
  return {
    basePath: themeOptions.basePath || `/`,
    articles: {
      source: `content/articles` || themeOptions.articles.source,
      slugPrefix: `article` || themeOptions.articles.slugPrefix
    },
    assetPath: themeOptions.assetPath || `content/assets`,
    pagePath: themeOptions.pagePath || `content/pages`
  };
};
