const {expect} = require("@playwright/test");
exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.password_field = page.locator('[type="password"]');
        this.email_field = page.locator('[type="email"]');
        this.login_button = page.locator('button.bg-primary')
        this.error_message = page.locator('div.v-messages')
        this.site_page = page.locator('div.site-page')
    }

    async gotoLoginPage() {
        await this.page.goto('/login');
    }

    async login(username, password){

        await this.email_field.fill(username);
        await this.password_field.fill(password);
        await this.login_button.click()
    }

    async verifyLoginSuccess(url){
        await expect(this.page).toHaveURL(url);
        await expect(this.site_page).toBeVisible({timeout: 10000});
        await this.page.waitForTimeout(10000)
    }

    async verifyErrorMessage(url, errorMessage) {
        await expect(this.page).toHaveURL(url);
        await expect(this.error_message).toContainText(errorMessage, {timeout: 10000})
        await expect(this.error_message).toBeVisible({timeout: 10000})
    }
}