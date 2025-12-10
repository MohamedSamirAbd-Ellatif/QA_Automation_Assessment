import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  /**
   * Helper to register a user via API (form-data required for this specific site)
   */
  async createAccount(user: any) {
    const response = await this.request.post(`${this.baseUrl}/api/createAccount`, {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '10',
        birth_year: '1990',
        firstname: user.firstName,
        lastname: user.lastName,
        company: 'Test Corp',
        address1: user.address,
        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber
      }
    });

    // Parse response just to be safe, though 200 check is primary
    const text = await response.text();
    return { status: response.status(), body: JSON.parse(text) };
  }

  /**
   * Helper to delete a user (cleanup)
   */
  async deleteAccount(email: string, password: string) {
    const response = await this.request.delete(`${this.baseUrl}/api/deleteAccount`, {
      form: { email, password }
    });
    return response;
  }

  /**
   * Helper to verify login
   */
  async verifyLogin(email: string, password: string) {
    const response = await this.request.post(`${this.baseUrl}/api/verifyLogin`, {
      form: { email, password }
    });
    const text = await response.text();
    return { status: response.status(), body: JSON.parse(text) };
  }
}
