module.exports = themeOptions => {
  return {
    basePath: themeOptions.basePath || `/`,
    mdxLayout: themeOptions.mdxLayout || 'Nothing',
    abstracts: {
      source: themeOptions.abstracts.source || `content/abstracts`,
      slugPrefix: themeOptions.abstracts.slugPrefix || `abstract`
    },
    events: {
      source: themeOptions.events.source || `content/events`,
      slugPrefix: themeOptions.events.slugPrefix || `event`
    }
  };
};
