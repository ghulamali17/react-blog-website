import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const authService = new (class {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) // Your API Endpoint
      .setProject(conf.projectID); // Your Project ID
    this.account = new Account(this.client); // Initialize Appwrite Account SDK
  }

  // Create a new account and log in immediately
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error; // Throw any error encountered
    }
  }

  // Login user with email and password
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error; // Throw error if login fails
    }
  }

  // Get the currently logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error; // Throw error if fetching user fails
    }
  }

  // Logout the current session
  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      throw error; // Throw error if logout fails
    }
  }
})();

export default authService;
