import { Page } from "@playwright/test"

export class HomePage {
    constructor(private page: Page) { }

    textArea() { return this.page.getByTestId("text-area") }
    wordCount() { return this.page.getByTestId("word-count") }
    charCount() { return this.page.getByTestId("char-count") }
    repairButton() { return this.page.getByTestId("repair-button") }
    helpButton() { return this.page.getByTestId("help-button") }
    themeButton() { return this.page.getByTestId("theme-button") }
    copyButton() { return this.page.getByTestId("copy-button") }
    helpBox() { return this.page.getByTestId("help-box") }

    async goTo() { await this.page.goto("/") }

    async mockGrammarApiRoute(options: { status: number; body: unknown }) {
        await this.page.route('/api/grammar', async route => {
            await route.fulfill({
                status: options.status,
                contentType: 'application/json',
                body: JSON.stringify(options.body)
            });
        });
    }
}
