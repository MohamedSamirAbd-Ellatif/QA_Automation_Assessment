import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ApiClient } from '../utils/ApiClient';

type Pages = {
    homePage: HomePage;
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    apiClient: ApiClient; // <--- Added this
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    // New Fixture for API Client
    apiClient: async ({ request, baseURL }, use) => {
        await use(new ApiClient(request, baseURL || 'https://automationexercise.com'));
    },
});

export { expect } from '@playwright/test';