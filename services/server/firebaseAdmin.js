import { MongoDBClient } from '@/utils/mongodb';

export async function addToken(token = { token: '', os: '' }) {
  await MongoDBClient.connect();
  try {
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');

    const _tokens = await firebaseAdminTable
      .find({ token: token.token })
      .toArray();
    if (_tokens.find(_token => _token.token === token.token) !== undefined) {
      return;
    }

    const response = await firebaseAdminTable.insertMany([token]);
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
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable.deleteMany({ token });
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
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable
      .find({ token: token.token })
      .toArray();
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
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable.find({}).toArray();
    return response;
  } catch (error) {
    console.log(error);
  }
  await MongoDBClient.close();
}
