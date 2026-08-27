import {test,expect}  from '../fixtures/Productsfixture'
import { ProductPage } from '../pages/ProductsPage'

import { ExcelReader } from '../utils/excelReader'

//console.log(JSON.parse(ExcelReader.read('SauceDemoTestData.xlsx', 'Products')))

//console.log(ExcelReader.read('SauceDemoTestData.xlsx','Products'))

let productCases = ExcelReader.read('SauceDemoTestData.xlsx','Products')

//console.log(JSON.stringify(productCases))

console.log(JSON.stringify(ExcelReader.getRowByTestCaseId('SauceDemoTestData.xlsx','Products', 'PROD-01')))


test.describe('SauceDemo Products Scenarios', async()=>{

test('PORD-01 - Verify product page is displayed and products count  ', async({productsPage, page})=>{

    await productsPage.verifyPageLoaded()
     let expectedProdutCount = Number(ExcelReader.getCellValue('SauceDemoTestData.xlsx','Products','PROD-01', 'ProductsCount'))


        let actualProductsCount = await productsPage.getProductsCount()

        console.log(`expected count from excel ${expectedProdutCount} Actual count from applications is ${actualProductsCount}`)
        expect(actualProductsCount).toBe(expectedProdutCount)

})




})