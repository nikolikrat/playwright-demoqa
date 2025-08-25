# Playwright DemoQA Project

This project demonstrates end-to-end and API testing using [Playwright](https://playwright.dev/) on the [DEMOQA Book Store](https://demoqa.com/books) application.

## Features
- UI tests using the Page Object Model (POM)
- API tests with schema validation using [zod](https://github.com/colinhacks/zod)
- Environment variable support for sensitive data
- Pagination, search, and collection management scenarios

## Project Structure
```
├── pages/                # Page Object Model classes
├── tests/                # Test files (UI and API)
├── schemas/              # Zod schemas for API validation
├── .env                  # Environment variables (not committed)
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
```

## Setup
1. **Install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Set up environment variables:**
	 Create a `.env` file in the project root:
	 ```env
	 USER_NAME=your_username
	 USER_PASSWORD=your_password
	 ```
     Account can be created, authenticated and edited right in the [DEMOQA Book Store](https://demoqa.com/books)

## Running Tests
- **All tests:**
	```bash
	npx playwright test
	```
- **UI tests only:**
	```bash
	npx playwright test tests/*.spec.ts
	```
- **API tests only:**
	```bash
	npx playwright test tests/APItests.spec.ts
	```
- **UI mode:**
	```bash
	npx playwright test --ui
	```
- **Debug mode:**
	```bash
	npx playwright test --debug
	```

## Notes
- Ensure your `.env` file is not committed to version control.
- The project uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables.
- Update test data as needed for your use case, especially `chosenIsbn`

## Useful Links
- [Playwright Docs](https://playwright.dev/docs/intro)
- [DEMOQA Book Store](https://demoqa.com/books)
- [zod Docs](https://zod.dev/)
- [DEMOQA Swagger](https://demoqa.com/swagger/)