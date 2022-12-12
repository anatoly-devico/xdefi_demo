import {expect} from "chai";
import {wdio} from "../../core/wdio";

class ChromeWebStorePage {
  title(): string {
    return '.e-f-w-Va > h1'
  }
}

export default new ChromeWebStorePage();