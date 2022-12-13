class ArticlePage {
  // Page selectors
  title(): string {
    return `//h1[@class='hkb-article__title']`
  }
}

export default new ArticlePage();