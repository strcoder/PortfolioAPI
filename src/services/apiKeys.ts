import MongoLib from '../lib/mongo';

class ApiKeysService {
  collection: string;
  mongoDB: MongoLib;
  constructor() {
    this.collection = 'api-keys',
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }: any) {
    const [ apiKey ] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

export default ApiKeysService;