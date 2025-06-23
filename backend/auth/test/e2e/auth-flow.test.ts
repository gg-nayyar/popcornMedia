import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('E2E Auth Flow', () => {
  const user = {name:'User', email: 'e2e@test.com', password: 'pass1234' };
  let token = '';

  it('registers and logs in a user', async () => {
    await request(app).post('/register').send(user);
    const loginRes = await request(app).post('/login').send(user);
    token = loginRes.body.token;
    expect(token).toBeDefined();
  });
});
