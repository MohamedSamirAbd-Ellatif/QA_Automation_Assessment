import { BaseScreen } from './BaseScreen';

export class HomeScreen extends BaseScreen {
    // Android UIAutomator selector strategies
    private accessibilityBtn = 'android=new UiSelector().text("Accessibility")';
    private graphicsBtn = 'android=new UiSelector().text("Graphics")';

    async openAccessibility() {
        const btn = await this.find(this.accessibilityBtn);
        await btn.click();
    }
}
