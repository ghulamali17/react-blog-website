import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

const authService = new (class {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) // Your API Endpoint
      .setProject(conf.projectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, passowrd, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        passowrd,
        name
      );
      if (userAccount) {
        // return userAccount
        return this.login({ email, passowrd });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, passowrd }) {
    try {
      return await this.account.createEmailSession(email, passowrd);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      throw error;
    }
  }
})();

export default authService;
