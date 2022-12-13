import {getRandom} from "../helpers/random_numbers_generator";
import AllureReporter from "@wdio/allure-reporter";

export class Wdio {

  async click(selector: string, waitTime = browser.options.waitforTimeout) {
    await $(selector).waitForDisplayed({timeout: waitTime});
    await $(selector).waitForEnabled({timeout: waitTime});
    await $(selector).click();
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

  async waitForNewTabVisibleAfterClick(
    selector: string,
    tabName: string,
    waitTime = browser.options.waitforTimeout,
  ) {
    let windowHandles, tabId, title;
    windowHandles = await browser.getWindowHandles();
    await this.click(selector);
    await browser.waitUntil(
      async () => {
        let handles = await browser.getWindowHandles()
        return handles.length > windowHandles.length;
      },
      {timeout: browser.options.waitforTimeout},
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
      {timeout: browser.options.waitforTimeout}
    );
  }
}

export const wdio = new Wdio();
