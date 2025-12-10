import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    private genderMale = this.page.locator('#id_gender1');
    private passwordInput = this.page.locator('#password');
    private firstNameInput = this.page.locator('#first_name');
    private lastNameInput = this.page.locator('#last_name');
    private addressInput = this.page.locator('#address1');
    private countryDropdown = this.page.locator('#country');
    private stateInput = this.page.locator('#state');
    private cityInput = this.page.locator('#city');
    private zipInput = this.page.locator('#zipcode');
    private mobileInput = this.page.locator('#mobile_number');
    private createAccountBtn = this.page.getByRole('button', { name: 'Create Account' });
    private accountCreatedMsg = this.page.getByText('Account Created!');
    private continueBtn = this.page.getByRole('link', { name: 'Continue' });

    async fillAccountDetails(userData: any) {
        await this.genderMale.check();
        await this.passwordInput.fill(userData.password);
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.addressInput.fill(userData.address);
        await this.countryDropdown.selectOption(userData.country);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipInput.fill(userData.zipcode);
        await this.mobileInput.fill(userData.mobileNumber);
    }

    async submitAccountCreation() {
        await this.createAccountBtn.click();
    }

    async verifyAccountCreated() {
        await this.accountCreatedMsg.waitFor({ state: 'visible' });
    }

    async proceed() {
        await this.continueBtn.click();
    }
}