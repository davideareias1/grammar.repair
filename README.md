# Grammar Repair

Grammar Repair is a lightning-fast tool for fixing grammar in emails and texts without altering your original meaning or tone.

## Why Grammar Repair?

Using general LLMs like ChatGPT for simple grammar checks often feels slow and overkill. They frequently rewrite sentences or change your voice entirely. Grammar Repair solves this by leveraging **Llama 3.3 (70B)** to provide instant, pure correction that preserves your exact words.

## Features

- **Instant Grammar Fix**: Automatically corrects grammar errors in seconds.
- **Clipboard Ready**: One-click copy functionality to get your fixed text back into your workflow.
- **Pure Correction**: Fixes grammar without changing your words or intended meaning.

## Setup

1. Clone the repository
2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Add your environment variables in `.env.local`:
   - `GROQ_API_KEY`: Your Groq API key (starts with `gsk_`)
   - `RATE_LIMIT`: Rate limit for the API (default: 6)

4. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

## Docker Setup

You can also run the project using Docker.

1.  Make sure you have Docker and Docker Compose installed.
2.  Set up your `.env.local` file as described in the Setup section.
3.  Run the application:

    ```bash
    docker-compose up --build
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) & [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Testing**: [Playwright](https://playwright.dev/)
