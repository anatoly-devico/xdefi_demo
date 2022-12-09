import {wdio} from "../../core/wdio"
import {expect} from "chai"
import allure from "@wdio/allure-reporter";
import {blockchainsCarousel} from "../fixtures/homepage";
import {chromeWebStoreXdefiUrl, extensionTitle, xdefiTabName} from "../fixtures/chrome_web_store";
import articlePage from "./article.page"
import chromeWebStore from "./chrome_web_store.page"
import {blockchainTitles} from "../fixtures/articles";

class Homepage {
  // Page selectors
  private getBlockchainCarouselItem(item: string): string {
    return `//div[@class='blockchain-carousel__canvas']/div[@class='blockchain-carousel__item has-tooltip ']//img[@alt='${item}']`
  }

  private getBlockchainCarouselLink(item: string): string {
    return `${this.getBlockchainCarouselItem(item)}//ancestor::node()[1]`
  }

  private installXDEFIbtn(): string {
    return `//div[@class='site-header__utility']//div//a`
  }

  // Page actions
  async open() {
    allure.startStep(`Open Homepage`);
    await wdio.openUrl(await wdio.getBaseUrl());
    allure.endStep()
    return this
  }

  async verifyBlockchainCarouselBtns() {
    let buttons = Object.keys(blockchainsCarousel);
    for (const blockchain of buttons) {
      allure.startStep(`Check ${blockchain} button`)
      let selector = await this.getBlockchainCarouselLink(blockchain)
      await wdio.waitForVisible(selector);
      await expect(await wdio.getAttribute(selector, 'href')).to.be.equal(blockchainsCarousel[blockchain].link);
      await expect(await wdio.getAttribute(await this.getBlockchainCarouselItem(blockchain), 'src')).to.be.equal(blockchainsCarousel[blockchain].iconLink);
      await wdio.click(selector);
      await expect(await wdio.getUrl()).to.be.equal(blockchainsCarousel[blockchain].link);
      await articlePage.checkTitle(blockchainTitles.get(blockchain))
      await wdio.endStepWithScreenShot();
      await wdio.back()
    }
    return this;
  }

  async checkInstallationBtn() {
    let childGUID;
    allure.startStep(`Check install XDEFI button`)
    const parentGUID = await wdio.getWindowHandle();
    await wdio.waitForNewTabVisibleAfterClick(this.installXDEFIbtn(), xdefiTabName)
    const allGUIDs = await wdio.getWindowHandles();
    // check all GUID's and see which one is the child
    for (let i = 0; i < allGUIDs.length; i++) {
      if (allGUIDs[i] !== parentGUID) {
        childGUID = allGUIDs[i];
      }
    }
    await wdio.switchToWindowByHandle(childGUID);
    await expect(await wdio.getUrl()).to.be.equal(chromeWebStoreXdefiUrl);
    await chromeWebStore.checkTitle(extensionTitle)
    await wdio.endStepWithScreenShot();
    await wdio.closeWindow();
    // switch to parent window/tab
    await wdio.switchToWindowByHandle(parentGUID);
    return this;
  }
}

export default new Homepage();
