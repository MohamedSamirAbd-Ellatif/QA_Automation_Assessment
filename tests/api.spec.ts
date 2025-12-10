import { test, expect } from '../fixtures/pomFixtures';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const userData = require('../data/users.json');

test.describe('Task B: API & Hybrid Testing', () => {
  const randomEmail = `api_test_${Date.now()}@example.com`;
  
  // Dynamic user object for this run
  const testUser = { 
    ...userData.newUser, 
    email: randomEmail 
  };

  test('API: Can register and verify login (Happy Path & Schema Check)', async ({ apiClient }) => {
    // 1. Create Account via API
    const createRes = await apiClient.createAccount(testUser);
    expect(createRes.status).toBe(200);
    
    // FIX: Schema/Type validation (Task B requirement)
    expect(createRes.body).toEqual(expect.objectContaining({
        responseCode: 201,
        message: expect.any(String)
    }));
    expect(createRes.body.message).toBe('User created!');

    // 2. Verify Login via API
    const loginRes = await apiClient.verifyLogin(testUser.email, testUser.password);
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.message).toBe('User exists!');
  });

  // FIX: Negative Scenario (Task B requirement)
  test('API: Login fails with invalid credentials', async ({ apiClient }) => {
    const loginRes = await apiClient.verifyLogin('wrong_user@test.com', 'wrong_pass');
    
    // Validate that the API returns the correct error code/message
    expect(loginRes.status).toBe(200); 
    expect(loginRes.body.responseCode).toBe(404);
    expect(loginRes.body.message).toBe('User not found!');
  });

  test('Hybrid: Register via API then Login via UI', async ({ page, apiClient, homePage, loginPage }) => {
    // 1. Arrange: Create user via API
    const createRes = await apiClient.createAccount(testUser);
    expect(createRes.status).toBe(200);

    // 2. Act: Login via UI
    await homePage.navigateTo('/login');
    await loginPage.login(testUser.email, testUser.password);

    // 3. Assert: UI contains expected text
    await expect(page.getByText(`Logged in as ${testUser.name}`)).toBeVisible();
  });
});