import { remote, Browser } from 'webdriverio';
import { expect } from 'chai';
import { HomeScreen } from '../pages/HomeScreen';
import { AccessibilityScreen } from '../pages/AccessibilityScreen'; // New Import
import * as path from 'path';
import * as fs from 'fs';

describe('Task C: Mobile Automation (Android)', function() {
    this.timeout(50000);
    
    let driver: Browser;
    let homeScreen: HomeScreen;
    let accessibilityScreen: AccessibilityScreen;

    before(async () => {
        driver = await remote({
            logLevel: 'error',
            path: '/',
            port: 4723,
            capabilities: {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:deviceName': 'Android Emulator', 
                // Ensure this path is correct for your machine
                'appium:app': path.join(process.cwd(), 'mobile/app/ApiDemos.apk'),
            }
        });
        homeScreen = new HomeScreen(driver);
        accessibilityScreen = new AccessibilityScreen(driver);
    });

    // FIX: Screenshot on Failure (Task C requirement)
    afterEach(async function() {
        if (this.currentTest?.state === 'failed' && driver) {
            const screenshotDir = './mobile-reports/screenshots';
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }
            const cleanTitle = this.currentTest.title.replace(/\s+/g, '_');
            await driver.saveScreenshot(`${screenshotDir}/${cleanTitle}.png`);
            console.log(`\nScreenshot saved: ${screenshotDir}/${cleanTitle}.png`);
        }
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('should navigate to Accessibility screen and verify element', async () => {
        // 1. Action: Navigate using POM
        await homeScreen.openAccessibility();

        // 2. Assert: Verify using Second POM (Fixes "2 Screens" requirement)
        const isVisible = await accessibilityScreen.isNodeProviderVisible();
        expect(isVisible).to.be.true;
    });
});