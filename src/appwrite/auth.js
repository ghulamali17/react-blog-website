import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const authService = new (class {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.projectID); 
    this.account = new Account(this.client); //
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
      throw error; 
    }
  }

  // Login user with email and password
  async login({email, password}) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw error;
    }
}
  // Get the currently logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error; 
    }
  }

  // Logout the current session
  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      throw error; 
    }
  }
})();

export default authService;
