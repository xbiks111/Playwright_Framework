import { test as base, expect, Page, Locator } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

export type LoginFixture= {
    loginPageFixture: LoginPage 
}

export let test =base.extend <LoginFixture>({
   
    loginPageFixture: async({page}, use)=> {
     
        let loginPageObj = new LoginPage(page)
        await loginPageObj.navigateTologinPage('https://www.saucedemo.com/')
        await use(loginPageObj) 
    }


})

export{expect}