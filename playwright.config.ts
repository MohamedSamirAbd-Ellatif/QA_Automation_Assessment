import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  
  // FIX: Add retries as requested in Task A
  retries: 1, 

  // Global timeout for the entire test run (60 seconds)
  timeout: 60000, 

  expect: {
    // Timeout for assertions like expect(locator).toBeVisible()
    timeout: 10000, 
  },
  
  use: {
    // 1. ADD YOUR BASE URL HERE
    baseURL: 'https://www.automationexercise.com',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Extra time for navigation (useful for slow sites)
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});