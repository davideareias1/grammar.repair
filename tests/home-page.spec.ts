import { test, expect } from "@playwright/test"
import { HomePage } from "./fixtures/HomePage"

test.describe("E2E Tests", () => {
    test.describe("Check Elements", () => {

        test("TextArea", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.textArea()).toBeVisible()
        })

        test("WordCount", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.wordCount()).toBeVisible()
        })

        test("CharCount", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.charCount()).toBeVisible()
        })

        test("RepairButton", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.repairButton()).toBeVisible()
        })

        test("HelpButton", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.helpButton()).toBeVisible()
        })

        test("ThemeButton", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.themeButton()).toBeVisible()
        })

        test("CopyButton", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.copyButton()).toBeHidden()
        })

        test("HelpBox", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.helpBox()).toBeHidden()
        })
    })

    //---------------------- Repair Button ----------------------
    test.describe("Repair Button", () => {
        test("Disabled when no text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.repairButton()).toBeDisabled()
        })
        test("Enabled when text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello, world!")
            await expect(p.repairButton()).toBeEnabled()
        })
        test("Disabled when sending request", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello, world!")
            await p.repairButton().click()
            await expect(p.repairButton()).toBeDisabled()
        })
        test("Disabled when rate limited", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()

            await p.mockGrammarApiRoute({
                status: 429,
                body: { message: "Too many requests", reset: 60 }
            });

            await p.textArea().fill("Hello world")
            await p.repairButton().click()

            await expect(p.repairButton()).toBeDisabled()
            await expect(p.textArea()).toBeDisabled()
        })
        test("Disabled when too many words", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello world".repeat(1000))
            await expect(p.repairButton()).toBeDisabled()
        })
        test("Disabled when too many characters", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello world".repeat(1000))
            await expect(p.repairButton()).toBeDisabled()
        })
    })

    //---------------------- Copy Button ----------------------
    test.describe("Copy Button", () => {
        test("Visible when text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello, world!")
            await expect(p.copyButton()).toBeVisible()
        })
        test("Invisible when no text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.copyButton()).toBeHidden()
        })
        test("Copy text to clipboard Functionality", async ({ page, context }) => {
            // Grant clipboard permissions
            await context.grantPermissions(['clipboard-read', 'clipboard-write']);

            const p = new HomePage(page);
            await p.goTo();

            const testText = "Hello, world! This is a test.";
            await p.textArea().fill(testText);

            await p.copyButton().click();

            await page.waitForTimeout(100);

            // Read from clipboard and verify
            const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
            expect(clipboardText).toBe(testText);

        })
        test("Copy text to clipboard UI State", async ({ page, context }) => {
            // Grant clipboard permissions
            await context.grantPermissions(['clipboard-read', 'clipboard-write']);

            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello, world!")
            await p.copyButton().click()
            await expect(p.copyButton()).toContainText("Copied!")
            await page.waitForTimeout(2500)
            await expect(p.copyButton()).toContainText("Copy")
        })
    })
    //---------------------- Help Button / Help Box ----------------------
    test.describe("Help Box", () => {
        test("Visible when help button is hovered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.helpButton().hover()
            await expect(p.helpBox()).toBeVisible()
        })
        test("Invisible when help button is not hovered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.helpBox()).toBeHidden()
        })
    })

    //---------------------- Theme Button ----------------------
    test.describe("Theme Button", () => {
        test("Toggle theme between light and dark", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()

            // Get initial theme state
            const initialHasDarkClass = await page.locator('html').evaluate((el) => el.classList.contains('dark'))

            await p.themeButton().click()

            await page.waitForTimeout(100)

            // Verify theme has changed
            const newHasDarkClass = await page.locator('html').evaluate((el) => el.classList.contains('dark'))
            expect(newHasDarkClass).toBe(!initialHasDarkClass)

            await expect(p.themeButton()).toBeVisible()
        })
    })

    //---------------------- Word/Character Count ----------------------
    test.describe("Word Counter", () => {
        test("Word Count", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.wordCount()).toContainText("0")
            await p.textArea().fill("Hello, world!")
            await expect(p.wordCount()).toContainText("2")
            await p.textArea().clear()
            await expect(p.wordCount()).toContainText("0")
        })
        test("Character Count", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.charCount()).toContainText("0")
            await p.textArea().fill("Hello, world!")
            await expect(p.charCount()).toContainText("13")
            await p.textArea().clear()
            await expect(p.charCount()).toContainText("0")
        })
    })

    //---------------------- Text Area ----------------------
    test.describe("Text Area", () => {
        test("Text Area is writable", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.textArea()).toBeEditable()
        })
        test("Placeholder text is displayed when no text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await expect(p.textArea()).toContainText("Paste your text or write it here")
        })
        test("Placeholder text is not displayed when text is entered", async ({ page }) => {
            const p = new HomePage(page)
            await p.goTo()
            await p.textArea().fill("Hello, world!")
            await expect(p.textArea()).not.toContainText("Paste your text or write it here")
        })
    })
})