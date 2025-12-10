import { test, expect } from '../fixtures/pomFixtures'; 
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const userData = require('../data/users.json');

test.describe('Task A: User Authentication Flows', () => {
    // FIX: Force these tests to run in order (Register -> Login)
    test.describe.configure({ mode: 'serial' });

    const randomEmail = `test${Date.now()}@example.com`;

    test('User can register successfully', async ({ homePage, loginPage, registrationPage, page }) => {
        await homePage.navigateTo('/');
        await homePage.navigateToSignupLogin(); 
        
        await loginPage.initiateSignup(userData.newUser.name, randomEmail);
        await registrationPage.fillAccountDetails(userData.newUser);
        await registrationPage.submitAccountCreation();
        await registrationPage.verifyAccountCreated();
        await registrationPage.proceed();
        await homePage.logout();
    });

    test('User can login with existing credentials', async ({ homePage, loginPage, page }) => {
        await homePage.navigateTo('/');
        await homePage.navigateToSignupLogin();
        
        // This will now work reliably because 'serial' mode ensured registration finished first
        await loginPage.login(randomEmail, userData.newUser.password);
        
        await expect(page.getByText(`Logged in as ${userData.newUser.name}`)).toBeVisible();
    });
});