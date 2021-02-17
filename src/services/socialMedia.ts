import MongoLib from "../lib/mongo";

class SocialMediaServices {
  collection: string;
  mongoDB: MongoLib;

  constructor(collection: string = 'social-media') {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async getSocialMedias() {
    const query = {};
    const [list, size] = await this.mongoDB.getAll(this.collection, query);
    return [list, size] || [];
  }

  async getSocialMedia({ objectId }: any) {
    const SocialMedia = await this.mongoDB.getById(this.collection, objectId);
    return { SocialMedia } || {};
  }

  async createSocialMedia({ object }: any) {
    const createObjectId = await this.mongoDB.create(this.collection, object);
    return createObjectId;
  }

  async updateSocialMedia({ objectId = '', object = {} }) {
    const updatedObjectId = await this.mongoDB.update(this.collection, objectId, object);
    return updatedObjectId;
  }

  async deleteSocialMedia({ objectId }: any) {
    const deletedObjectId = await this.mongoDB.delete(this.collection, objectId);
    return deletedObjectId;
  }
}

export default SocialMediaServices;