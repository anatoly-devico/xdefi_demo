import {expect} from "chai";
import {wdio} from "../../core/wdio";

class ChromeWebStorePage {
  private title(): string {
    return '.e-f-w-Va > h1'
  }

  async checkTitle(title: string) {
    await expect(
      await wdio.getText(this.title()),
      `Extension title should be equal to ${title}`,
    ).to.be.equal(title);
  }
}

export default new ChromeWebStorePage();