import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {getRandom} from "../helpers/random_numbers_generator";
import AllureReporter from "@wdio/allure-reporter";

chai.should();
chai.use(chaiAsPromised);

export class Wdio {

  element(selector: string) {
    return $(selector);
  }

  elements(selector: string) {
    return $$(selector);
  }

  async click(selector: string, waitTime = this.defaultWaitTime) {
    await this.waitForVisible(selector, waitTime);
    await this.waitForEnabled(selector, waitTime);
    await this.element(selector).click();
  }

  async openUrl(url: string) {
    await browser.url(url);
  }

  async getBaseUrl() {
    return browser.options.baseUrl;
  }

  async takeScreenshot() {
    const screenShot = browser.takeScreenshot();
    const image = new Buffer(await screenShot, 'base64');
    const fileName = `Screenshot - ${getRandom(6)}`;
    await AllureReporter.addAttachment(fileName, image, 'image/png');
  }

  async endStepWithScreenShot() {
    await this.takeScreenshot();
    await AllureReporter.endStep();
  }

  async waitForVisible(selector: string, waitTime = this.defaultWaitTime) {
    return await this.element(selector).waitForDisplayed({timeout: waitTime});
  }

  async waitForEnabled(selector: string, waitTime = this.defaultWaitTime) {
    return await this.element(selector).waitForEnabled({timeout: waitTime});
  }

  get defaultWaitTime() {
    return browser.options.waitforTimeout;
  }

  async getUrl() {
    return browser.getUrl();
  }

  async getAttribute(selector: string, attribute: string) {
    return await this.element(selector).getAttribute(attribute)
  }

  async getWindowHandle() {
    return browser.getWindowHandle();
  }

  async getWindowHandles() {
    return await browser.getWindowHandles();
  }

  async wait(waitTime: number) {
    await browser.pause(waitTime);
  }

  async back() {
    await browser.back();
  }

  async switchToWindowByHandle(handle: string) {
    await browser.switchToWindow(handle);
  }

  async closeWindow() {
    await browser.closeWindow();
  }

  async waitForNewTabVisibleAfterClick(
    selector: string,
    tabName: string,
    waitTime = this.defaultWaitTime,
  ) {
    let windowHandles, tabId, title;
    windowHandles = await this.getWindowHandles();
    await this.click(selector);
    await browser.waitUntil(
      async () => {
        let handles = await this.getWindowHandles()
        return handles.length > windowHandles.length;
      },
      {timeout: this.defaultWaitTime},
    );
    (await browser.getWindowHandles()).forEach(handle => {
      if (!windowHandles.includes(handle)) {
        tabId = handle;
      }
    });
    await browser.switchToWindow(tabId);
    await browser.waitUntil(
      async () => {
        title = await browser.getTitle();
        return tabName.includes(title);
      },
      {timeout: this.defaultWaitTime}
    );
  }

  async getText(selector: string) {
    return await this.element(selector).getText();
  }
}

export const wdio = new Wdio();
