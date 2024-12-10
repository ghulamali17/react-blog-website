import conf from "../conf/conf";
import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
        if (!conf.databaseID || !conf.collectionID) {
            throw new Error("Invalid database or collection configuration");
        }

        const response = await this.databases.createDocument(
            conf.databaseID,
            conf.collectionID,
            slug, // Ensure this is unique, or use ID.unique() for auto-ID
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );
        return response;
    } catch (error) {
        console.error("Appwrite Service :: createPost :: Error:", {
            message: error.message,
            stack: error.stack,
            response: error.response,
        });
        throw error; // Propagate to the caller
    }
}


  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseID,
        conf.collectionID,
        slug
      );
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseID,
        conf.collectionID,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseID,
        conf.collectionID,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.bucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketID, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.bucketID, fileId);
    } catch (error) {
      console.error("Error getting file preview:", error);
      throw error;
    }
  }
}

const service = new Service();

export default service;
