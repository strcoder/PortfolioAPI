import MongoLib from "../lib/mongo";
import bcrypt from 'bcrypt';

class AuthServices {
  collection: string;
  mongoDB: MongoLib;

  constructor(collection: string = 'auth') {
    this.collection = collection;
    this.mongoDB = new MongoLib();
  }

  async getAllAuth({ email, nickname }: { email?: string, nickname?: string }) {
    const query = email && nickname
      ? { $or: [ { email }, { nickname } ] } : email && !nickname
      ? { email } : !email && nickname
      ? { nickname } : {};
    const [auths, count] = await this.mongoDB.getAll(this.collection, query);
    return [auths, count] || [];
  }

  async getAuth({ email, nickname}: { email?: string, nickname?: string }) {
    const query = email && nickname
      ? { $or: [ { email }, { nickname } ] } : email && !nickname
      ? { email } : !email && nickname
      ? { nickname } : {};
    if (Object.entries(query).length > 0) {
      const auth = await this.mongoDB.getByQuery(this.collection, query);
      return auth;
    }
    return {};
  }

  async getAuthDistinct({ attribute }: { attribute: string }) {
    const list = await this.mongoDB.getDistinct(this.collection, attribute);
    return list || [];
  }

  async createAuth({ auth }: any) {
    const { password } = auth;
    const hashedPassword = await bcrypt.hash(password, 10);
    auth.password = hashedPassword;
    const createAuthId = await this.mongoDB.create(this.collection, auth);
    return createAuthId;
  }

  async updateAuth({ authId, auth }: { authId: string, auth: object }) {
    const updatedAuthId = await this.mongoDB.update(this.collection, authId, auth);
    return updatedAuthId;
  }

  async deleteAuth({ authId }: { authId: string }) {
    const deletedAuthId = await this.mongoDB.delete(this.collection, authId);
    return deletedAuthId;
  }

  // async getUserByNickname({ nickname }: any) {
  //   const [ user ] = await this.mongoDB.getAll(this.collection, { nickname });
  //   return user;
  // }

  // async getUserByEmail({ email }: any) {
  //   const [ user ] = await this.mongoDB.getAll(this.collection, { email });
  //   return user;
  // }

  // async verifyUserExist({ nickname, email }: any) {
  //   const [ userByNickname ] = await this.mongoDB.getAll(this.collection, { nickname });
  //   if (userByNickname) {
  //     return userByNickname;
  //   }
  //   const [ userByEmail ] = await this.mongoDB.getAll(this.collection, { email });
  //   return userByEmail;
  // }

  // async createUser({ user }: any) {
  //   const { password } = user;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   user.password = hashedPassword;

  //   const createUserId = await this.mongoDB.create(this.collection, user);

  //   return createUserId;
  // }

  // async updateUser({ email, user } = {}) {
  //   const updatedUserId = await this.mongoDB.update(this.collection, email, user);
  //   return updatedUserId;
  // }

  // async deleteUser({ userId }) {
  //   const deletedUserId = await this.mongoDB.delete(this.collection, userId);
  //   return deletedUserId;
  // }
}

export default AuthServices;