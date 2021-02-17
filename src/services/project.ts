import MongoLib from "../lib/mongo";

class ProjectServices {
  collection: string;
  mongoDB: MongoLib;

  constructor(collection: string = 'Project') {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async getProjects() {
    const query = {};
    const [list, size] = await this.mongoDB.getAll(this.collection, query);
    return [list, size] || [];
  }

  async getProject({ objectId }: any) {
    const project = this.mongoDB.getById(this.collection, objectId);
    return { project } || {};
  }

  async createProject({ object }: any) {
    const createObjectId = await this.mongoDB.create(this.collection, object);
    return createObjectId;
  }

  async updateProject({ objectId = '', object = {} }) {
    const updatedObjectId = await this.mongoDB.update(this.collection, objectId, object);
    return updatedObjectId;
  }

  async deleteProject({ objectId }: any) {
    const deletedObjectId = await this.mongoDB.delete(this.collection, objectId);
    return deletedObjectId;
  }
}

export default ProjectServices;