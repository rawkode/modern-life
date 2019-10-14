module.exports = themeOptions => {
  return {
    basePath: themeOptions.basePath || `/`,
    articles: {
      source: themeOptions.articles.source || `content/articles`,
      slugPrefix: themeOptions.articles.slugPrefix || `blog`
    },
    assetPath: themeOptions.assetPath || `content/assets`,
    pagePath: themeOptions.pagePath || `content/pages`
  };
};
