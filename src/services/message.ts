import MongoLib from "../lib/mongo";

class MessageServices {
  collection: string;
  mongoDB: MongoLib;

  constructor(collection: string = 'message') {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async getMessages() {
    const query = {};
    const [list, size] = await this.mongoDB.getAll(this.collection, query);
    return [list, size] || [];
  }

  async getMessage({ objectId }: any) {
    const Message = this.mongoDB.getById(this.collection, objectId);
    return { Message } || {};
  }

  async createMessage({ object }: any) {
    const createObjectId = await this.mongoDB.create(this.collection, object);
    return createObjectId;
  }

  async updateMessage({ objectId = '', object = {} }) {
    const updatedObjectId = await this.mongoDB.update(this.collection, objectId, object);
    return updatedObjectId;
  }

  async deleteMessage({ objectId }: any) {
    const deletedObjectId = await this.mongoDB.delete(this.collection, objectId);
    return deletedObjectId;
  }
}

export default MessageServices;