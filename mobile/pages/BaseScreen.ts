import { Browser } from 'webdriverio';

export class BaseScreen {
    protected driver: Browser;

    constructor(driver: Browser) {
        this.driver = driver;
    }

    async find(selector: string) {
        return await this.driver.$(selector);
    }
}
