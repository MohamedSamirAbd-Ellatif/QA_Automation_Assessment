import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Signup selectors
    private signupNameInput = this.page.locator('form[action="/signup"] input[name="name"]');
    private signupEmailInput = this.page.locator('form[action="/signup"] input[name="email"]');
    private signupButton = this.page.locator('form[action="/signup"] button[type="submit"]');

    // Login selectors
    private loginEmailInput = this.page.locator('form[action="/login"] input[name="email"]');
    private loginPasswordInput = this.page.locator('form[action="/login"] input[name="password"]');
    private loginButton = this.page.locator('form[action="/login"] button[type="submit"]');

    async initiateSignup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async login(email: string, pass: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(pass);
        await this.loginButton.click();
    }
}