import MongoLib from "../lib/mongo";

class MailServices {
  collection: string;
  mongoDB: MongoLib;

  constructor(collection: string = 'mail') {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async getMails() {
    const query = {};
    const [list, size] = await this.mongoDB.getAll(this.collection, query);
    return [list, size] || [];
  }

  async getMail({ objectId }: any) {
    const Mail = this.mongoDB.getById(this.collection, objectId);
    return { Mail } || {};
  }

  async createMail({ object }: any) {
    const createObjectId = await this.mongoDB.create(this.collection, object);
    return createObjectId;
  }

  async updateMail({ objectId = '', object = {} }) {
    const updatedObjectId = await this.mongoDB.update(this.collection, objectId, object);
    return updatedObjectId;
  }

  async deleteMail({ objectId }: any) {
    const deletedObjectId = await this.mongoDB.delete(this.collection, objectId);
    return deletedObjectId;
  }
}

export default MailServices;