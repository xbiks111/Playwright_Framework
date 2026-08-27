import { test, expect } from '../fixtures/Login.fixture'
import { LoginPage } from '../pages/LoginPage'
import dotnev from 'dotenv'
import path from 'path'

// reading the environment file 
import { JsonReader } from '../utils/jsonReader'



//reading the environmnet file 
dotnev.config({path: path.resolve(__dirname,'../test.env')})
console.log(__dirname)
console.log(path.resolve(__dirname,'../test.env'))
let url = process.env.SAUCEDEMO_URL as string
let usernme= process.env.USER_NAME  as string
let password = process.env.PASSWORD as string


//reading data from JSON

let testData = JsonReader.read<any>('sauceDemoData.json')

let lockedUser = testData.credentials.lockedUser
let erroMessage =  testData.expectedMessages.lockedUser

test.describe('Suace Demo Login test', async () => {

    test('Login with Valid Credential', async ({ loginPageFixture, page }) => {

        await loginPageFixture.performLogin(usernme, password)
        await page.waitForTimeout(3000)
        await expect(page).toHaveURL(/inventory\.html/)
        expect(await loginPageFixture.validateLandingPage()).toBeTruthy()

    })

    test('Shoud not Login with loggedin user', async({loginPageFixture, page})=>{
       
        await loginPageFixture.performLogin(lockedUser,password)
        expect(await loginPageFixture.getErrorText()).toContain(erroMessage)

        // this is for git

    })




})