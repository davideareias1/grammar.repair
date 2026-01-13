import { test, expect } from "@playwright/test"
import { HomePage } from "./fixtures/HomePage"

test.describe.serial("AI Grammar Quality Audit", () => {
    // Add delay between tests to respect rate limits
    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(10000);
    });

    test("Typo", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("Hello, wolrd!")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("Hello, world!")
    })

    test("Their/They're confusion", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("Their going to the store tomorrow.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("They are going to the store tomorrow.")
    })

    test("Its/It's confusion", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("Its a beautiful day outside.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("It's a beautiful day outside.")
    })

    test("Your/You're confusion", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("Your welcome to join us.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("You're welcome to join us.")
    })

    test("Subject-verb agreement", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("The group of students were late to class.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("The group of students was late to class.")
    })

    test("Then/Than confusion", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("She is smarter then her brother.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("She is smarter than her brother.")
    })

    test("Double negative", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("I don't have no money left.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("I don't have any money left.")
    })

    test("Affect/Effect confusion", async ({ page }) => {
        const p = new HomePage(page)
        await p.goTo()
        await p.textArea().fill("The weather will effect our travel plans.")
        await p.repairButton().click()
        await expect(p.textArea()).toContainText("The weather will affect our travel plans.")
    })
})
