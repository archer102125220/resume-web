import { MongoDBClient } from '@/utils/mongodb';

export async function mongoDBAddToken(token = { token: '', os: '' }) {
  try {
    await MongoDBClient.connect();
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');

    const _tokens = await firebaseAdminTable
      .find({ token: token.token })
      .toArray();
    if (_tokens.find(_token => _token.token === token.token) !== undefined) {
      return;
    }

    const response = await firebaseAdminTable.insertMany([token]);
    await MongoDBClient.close();
    return response;
  } catch (error) {
    console.log(error);
    MongoDBClient.close().catch(_error => console.log(_error));
  }
}

export async function mongoDBRemoveToken(token = '') {
  try {
    await MongoDBClient.connect();
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable.deleteMany({ token });
    await MongoDBClient.close();
    return response;
  } catch (error) {
    console.log(error);
    MongoDBClient.close().catch(_error => console.log(_error));
  }
}

export async function mongoDBFindToken(token = '') {
  try {
    await MongoDBClient.connect();
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable
      .find({ token: token.token })
      .toArray();
    await MongoDBClient.close();
    return response;
  } catch (error) {
    console.log(error);
    MongoDBClient.close().catch(_error => console.log(_error));
  }
}

export async function mongoDBFindAllToken() {
  try {
    await MongoDBClient.connect();
    const resumeWebDB = MongoDBClient.db('resumeWebDB');
    const firebaseAdminTable = resumeWebDB.collection('firebaseAdminTable');
    const response = await firebaseAdminTable.find({}).toArray();
    await MongoDBClient.close();
    return response;
  } catch (error) {
    console.log(error);
    MongoDBClient.close().catch(_error => console.log(_error));
  }
}
