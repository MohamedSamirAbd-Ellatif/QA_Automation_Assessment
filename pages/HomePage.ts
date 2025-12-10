import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private signupLoginLink = this.page.getByRole('link', { name: ' Signup / Login' });
    private logoutLink = this.page.getByRole('link', { name: ' Logout' });
    private deleteAccountLink = this.page.getByRole('link', { name: ' Delete Account' });

    async navigateToSignupLogin() {
        // Click without waiting for the full page load loop
        await this.signupLoginLink.click({ noWaitAfter: true });
        
        // FIX: Change 'domcontentloaded' to 'commit'. 
        // 'commit' waits only for the server to respond with the new URL, ignoring slow ads/scripts.
        await this.page.waitForURL(/\/login/, { waitUntil: 'commit' });
    }
    
    async logout() {
        await this.logoutLink.click({ noWaitAfter: true });
        // FIX: Same fix here for logout
        await this.page.waitForURL(/\/login/, { waitUntil: 'commit' });
    }

    async deleteAccount() {
        await this.deleteAccountLink.click();
    }
}