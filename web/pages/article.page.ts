import {expect} from "chai";
import {wdio} from "../../core/wdio";

class ArticlePage {
  // Page selectors
  private title(): string {
    return `//h1[@class='hkb-article__title']`
  }

  // Page actions
  async checkTitle(title: string) {
    expect(
      await wdio.getText(this.title()),
      `Article title should be equal to ${title}`,
    ).to.be.equal(title);
  }
}

export default new ArticlePage();