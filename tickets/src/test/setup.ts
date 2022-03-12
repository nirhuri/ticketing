import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { app } from '../app';

  declare global {
    var signin: () => string[];
  }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
}, 60 * 1000);

global.signin = () => {
  const payload = {
    id: 'jhfrtxyrcoui',
    email: 'test@test.com'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  // Take a JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string array (because of supertest) thats the cookie with the encoded data
  return [`session=${base64}`];
};
