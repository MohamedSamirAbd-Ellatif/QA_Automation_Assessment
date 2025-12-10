import { BaseScreen } from './BaseScreen';

export class AccessibilityScreen extends BaseScreen {
    // Selector for the element we want to verify
    private nodeProvider = 'android=new UiSelector().text("Accessibility Node Provider")';

    async isNodeProviderVisible() {
        const el = await this.find(this.nodeProvider);
        // Wait for it to exist to avoid flakiness
        await el.waitForExist({ timeout: 5000 });
        return await el.isDisplayed();
    }
}