import { test, expect } from '@playwright/test';
import { LoginPage } from "../page-objects/LoginPage/login.page";
import data from "../fixtures/test-data.json"

test('Check that user is able to Login to the platform', async ({page}) => {
  let loginPage = new LoginPage(page)
  await loginPage.gotoLoginPage()
  await loginPage.login(data.loginCredentials.email, data.loginCredentials.password)
  await loginPage.verifyLoginSuccess(data.urls.chats)
});

test('Check that user is not able to Login to the platform', async ({page}) => {
  let loginPage = new LoginPage(page)
  await loginPage.gotoLoginPage()
  await loginPage.login(data.loginCredentials.email, data.loginCredentials.notValidPassword)
  await loginPage.verifyErrorMessage(data.urls.login, 'Wrong Email or password')
})
