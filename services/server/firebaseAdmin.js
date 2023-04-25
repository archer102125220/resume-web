import { MongoDBClient } from '@/utils/mongodb';

export async function addToken(token = { token: '', os: '' }) {
  await MongoDBClient.connect();
  try {
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdmin = resumeWebDB.collection('firebaseAdmin');

    const _tokens = await firebaseAdmin.find({ token: token.token }).toArray();
    if (_tokens.find(_token => _token.token === token.token) !== undefined) {
      return;
    }

    const response = await firebaseAdmin.insertMany([token]);
    return response;
  } catch (error) {
    console.log(error);
  }
  await MongoDBClient.close();
}

export async function removeToken(token = '') {
  await MongoDBClient.connect();
  try {
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdmin = resumeWebDB.collection('firebaseAdmin');
    const response = await firebaseAdmin.deleteMany({ token });
    return response;
  } catch (error) {
    console.log(error);
  }
  await MongoDBClient.close();
}

export async function findToken(token = '') {
  await MongoDBClient.connect();
  try {
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdmin = resumeWebDB.collection('firebaseAdmin');
    const response = await firebaseAdmin.find({ token: token.token }).toArray();
    return response;
  } catch (error) {
    console.log(error);
  }
  await MongoDBClient.close();
}

export async function findAllToken() {
  await MongoDBClient.connect();
  try {
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdmin = resumeWebDB.collection('firebaseAdmin');
    const response = await firebaseAdmin.find({}).toArray();
    return response;
  } catch (error) {
    console.log(error);
  }
  await MongoDBClient.close();
}
