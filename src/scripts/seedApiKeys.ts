// DEBUG=app:* node scripts/mongo/seedApiKeys.js
import chalk from 'chalk';
import crypto from 'crypto';
import MongoLib from './../lib/mongo';
// const debug = require('debug')('app:scripts:api-keys');
import debug from 'debug';
debug('app:scripts:api-keys');

const registerScopes = [
  'signin:auth',
  'signup:auth',
  'read:projects',
  'create:mesajes',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:projects',
];

const apiKeys = [
  {
    name: 'register',
    token: generateRandomToken(),
    scopes: registerScopes
  },
  {
    name: 'public',
    token: generateRandomToken(),
    scopes: publicScopes
  },
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();