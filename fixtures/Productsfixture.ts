import { test as base, expect, Page, Locator } from '@playwright/test'
import { ProductPage } from '../pages/ProductsPage'
import { LoginPage } from '../pages/LoginPage'
import dotnev from 'dotenv'
import path from 'path'

let url = process.env.SAUCEDEMO_URL as string

console.log('URL of the page is -->', url)

export type ProductPageFixture = {
    productsPage: ProductPage
}

export let test = base.extend<ProductPageFixture>({

    productsPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page)

        console.log('This setup run by fixture')
        //await loginPage.navigateTologinPage(url)
        await loginPage.navigateTologinPage(process.env.SAUCEDEMO_URL as string)
        await loginPage.performLogin(process.env.USER_NAME as string, process.env.PASSWORD as string)

        let productPage = new ProductPage(page)
        await productPage.verifyPageLoaded()

        await use(productPage)

        
        console.log('This teardown part')
    }
})

export { expect }