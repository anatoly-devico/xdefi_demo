import allure from "@wdio/allure-reporter";

class Homepage {
  // Page selectors
  getBlockchainCarouselItem(item: string): string {
    return `//div[@class='blockchain-carousel__canvas']/div[@class='blockchain-carousel__item has-tooltip ']//img[@alt='${item}']`
  }

  getBlockchainCarouselLink(item: string): string {
    return `${this.getBlockchainCarouselItem(item)}//ancestor::node()[1]`
  }

  installXDEFIbtn(): string {
    return `//div[@class='site-header__utility']//div//a`
  }

  // Page actions
  async open() {
    allure.startStep(`Open Homepage`);
    await browser.url(browser.options.baseUrl);
    allure.endStep()
    return this
  }
}

export default new Homepage();
