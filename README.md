# QA Automation Assessment

## Overview
This repository contains the complete automation solution for the QA Lead Assessment. It implements a modern, scalable testing framework covering:

* **Web UI:** Playwright (TypeScript) with Page Object Model (POM).
* **API:** Playwright API Testing with schema validation and hybrid (API+UI) flows.
* **Mobile:** Appium + Mocha (Android) with POM and screenshot capture on failure.
* **CI/CD:** GitHub Actions pipeline for automated execution.

## Prerequisites

Before running the tests, ensure your environment is set up with:

* **Node.js:** v18.19+ (v20 Recommended)
* **Java JDK:** v11+ (Required for Appium/Android)
* **Android SDK & Emulator:** Required for Mobile tests.
* **Appium Server:** `npm install -g appium` (or run via npx)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd QA-Assessment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```

## Running Tests

### 1. Web & API Tests (Playwright)
Executes all Web UI and REST API tests.
* **Features:** Retries, Parallel execution (where applicable), HTML Reporting.
* **Command:**
    ```bash
    npm run test:web
    ```
* **Reports:** The report will be generated at `playwright-report/index.html`. To view it:
    ```bash
    npx playwright show-report
    ```

### 2. Mobile Tests (Android)
Executes Appium mobile automation tests.
* **Setup:** 1.  Start an Android Emulator.
    2.  Start the Appium server in a separate terminal:
        ```bash
        npx appium
        ```
* **Command:**
    ```bash
    npm run test:mobile
    ```
* **Reports:** HTML reports are generated in `mobile-reports/`.
* **Screenshots:** Screenshots of failed tests are saved in `mobile-reports/screenshots/`.

## Project Structure

```text
QA-Assessment/
├── .github/
│   └── workflows/      # CI/CD Pipeline configuration (GitHub Actions)
├── data/               # Data-driven test files (JSON)
├── fixtures/           # Playwright Test Fixtures (Page Object injection)
├── mobile/
│   ├── app/            # Mobile APK files (ApiDemos.apk)
│   ├── pages/          # Mobile Page Objects (HomeScreen, AccessibilityScreen)
│   └── specs/          # Mobile Test Definitions (Mocha)
├── pages/              # Web Page Objects (HomePage, LoginPage, etc.)
├── tests/              # Playwright Web & API Test Specs
│   ├── api.spec.ts     # Task B: API & Hybrid Tests
│   └── auth.spec.ts    # Task A: Web UI Authentication Tests
├── utils/              # Helper Utilities (ApiClient)
├── package.json        # Project scripts and dependencies
├── playwright.config.ts# Playwright configuration (Timeouts, BaseURL, Retries)
└── README.md           # Project Documentation