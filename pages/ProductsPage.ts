import { test, expect, Page, Locator } from '@playwright/test'

export class ProductPage {

    readonly page: Page
    readonly pageTitle: Locator
    readonly sortDropdown: Locator
    readonly inventoryItem: Locator
    readonly cartItems: Locator
    readonly shoppingCartButton: Locator
    // readonly openItemDetails : Locator   

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.locator('[data-test="title"]')
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
        this.inventoryItem = page.locator('.inventory_item')
        this.cartItems = page.locator('[data-test="shopping-cart-link"]')
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]')
        // this.openItemDetails = page.locator('[data-test="inventory-item-name"]')
    }

    async verifyPageLoaded() {
        expect(await this.pageTitle.innerText()).toContain('Products')

    }

    async sortBy(optionValue: string) {
        await this.sortDropdown.selectOption(optionValue)
    }

    async addItemToCart(itemName: string) {
        let itemCart = this.inventoryItem.filter({ hasText: itemName })
        await itemCart.getByRole('button', { name: 'Add to cart' }).click()
    }

    async removeItemFromCart(itemName: string) {
        let itemCard = this.inventoryItem.filter({ hasText: itemName })
        await itemCard.getByRole('button', { name: 'Remove' }).click()
    }   

    async openItemDetails(itemName: string) {
        let itemCart = this.inventoryItem.filter({ hasText: itemName })
        await itemCart.locator('[data-test="inventory-item-name"]').click()
    }

    async getAllProductNames() {
        return await this.inventoryItem.locator('[data-test="inventory-item-name"]').allInnerTexts()
    }


    async getAllProductCarts() {

    }

    async openCart() {
        await this.shoppingCartButton.click()
    }


    async getProductsCount(){
      return  await this.inventoryItem.count()
    }



}