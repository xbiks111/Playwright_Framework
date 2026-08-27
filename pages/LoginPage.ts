import { test, expect, Page, Locator } from '@playwright/test'

export class LoginPage {

    private readonly page: Page
    private readonly userNameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly erroMessage: Locator
    private readonly ProductPageTittle: Locator


    constructor(page: Page) {
        this.page = page
        this.userNameInput = this.page.locator('#user-name')
        this.passwordInput = this.page.locator('#password')
        this.loginButton = this.page.locator('#login-button')
        this.erroMessage = this.page.locator('[data-test="error"]') 
        this.ProductPageTittle = this.page.locator('[data-test="title"]') 
    }

    async navigateTologinPage(url: string): Promise<void> {
        await this.page.goto(url)
        await expect(this.page).toHaveURL(url)
        await expect(this.page).toHaveTitle(await this.page.title())
    }
    async enterUserName(username: string): Promise<void> {
        await this.userNameInput.fill(username)
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }
    async performLogin(username:string, password:string): Promise<void> {
       await  this.enterUserName(username)
       await this.enterPassword(password)
       await this.clickLoginButton()
    }

    async getErrorText():Promise<string>{
       return await this.erroMessage.innerText()
       
    }

    async validateLandingPage():Promise<boolean>{

       return await this.ProductPageTittle.isVisible()
    }


}