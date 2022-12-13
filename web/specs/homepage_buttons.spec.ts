import Homepage from '../pages/home.page'
import {blockchainsCarousel} from "../fixtures/homepage";
import allure from "@wdio/allure-reporter";
import {wdio} from "../../core/wdio";
import {expect} from "chai";
import ArticlePage from "../pages/article.page";
import ChromeWebStorePage from "../pages/chrome_web_store.page";
import {blockchainTitles} from "../fixtures/articles";
import {chromeWebStoreXdefiUrl, extensionTitle, xdefiTabName} from "../fixtures/chrome_web_store";

describe('Check carousel and installation buttons on homepage', () => {

  beforeEach(async () => {
    await Homepage.open()
  })

  let buttons = Object.keys(blockchainsCarousel);
  for (const blockchain of buttons) {
    it(`should check ${blockchain} button on carousel of supported blockchains`, async () => {
        allure.startStep(`Check ${blockchain} button`)
        let selector = await Homepage.getBlockchainCarouselLink(blockchain)
        await $(selector).waitForDisplayed({timeout: browser.options.waitforTimeout});
        allure.addStep(`Check ${blockchain} link`)
        await expect(await $(selector).getAttribute('href')).to.be.equal(blockchainsCarousel[blockchain].link);
        allure.addStep(`Check ${blockchain} icon link`)
        await expect(await $(await Homepage.getBlockchainCarouselItem(blockchain)).getAttribute('src')).to.be.equal(blockchainsCarousel[blockchain].iconLink);
        allure.addStep(`Click on ${blockchain} button`)
        await wdio.click(selector);
        allure.addStep(`Check ${blockchain} article url`)
        await expect(await browser.getUrl()).to.be.equal(blockchainsCarousel[blockchain].link);
        allure.addStep(`Check ${blockchain} article title`)
        expect(
          await $(ArticlePage.title()).getText(),
          `Article title should be equal to ${blockchainTitles.get(blockchain)}`,
        ).to.be.equal(blockchainTitles.get(blockchain));
        await wdio.endStepWithScreenShot();
        allure.addStep(`Return to parent page`)
        await browser.back();
    })
  }

  it('should open Chrome web store after click on "Install XDEFI Wallet" button', async () => {
    let childGUID;
    allure.startStep(`Check install XDEFI button`)
    const parentGUID = await browser.getWindowHandle();
    allure.addStep(`Click on "Install XDEFI" button`)
    await wdio.waitForNewTabVisibleAfterClick(Homepage.installXDEFIbtn(), xdefiTabName)
    const allGUIDs = await browser.getWindowHandles();
    for (let i = 0; i < allGUIDs.length; i++) {
      if (allGUIDs[i] !== parentGUID) {
        childGUID = allGUIDs[i];
      }
    }
    await browser.switchToWindow(childGUID);
    allure.addStep(`Check URL of newly opened page (Chrome Web Store)`)
    await expect(await browser.getUrl()).to.be.equal(chromeWebStoreXdefiUrl);
    allure.addStep(`Check title of newly opened page`)
    await expect(
      await $(ChromeWebStorePage.title()).getText(),
      `Extension title should be equal to ${extensionTitle}`,
    ).to.be.equal(extensionTitle);
    await wdio.endStepWithScreenShot();
    allure.startStep(`Return to parent page`)
    await browser.closeWindow();
    await browser.switchToWindow(parentGUID);
    await wdio.endStepWithScreenShot();
  })
})
