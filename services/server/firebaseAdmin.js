import { MongoDBClient } from '@/utils/mongodb';
import { FirebaseMessaging, Sequelize } from '@/models';
const { Op } = Sequelize;

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

export async function sequelizeAddToken(token = { token: '', os: '' }) {
  const response = await FirebaseMessaging.findOrCreate({
    where: {
      [Op.and]: [
        { token: { [Op.eq]: token.token } },
        { os: { [Op.eq]: token.os } }
      ]
    },
    defaults: { ...token }
  });
  return response;
}

export async function sequelizeRemoveToken(token = '') {
  const response = await FirebaseMessaging.destroy({
    where: { token }
  });
  return response;
}

export async function sequelizeFindToken(token = '') {
  const response = await FirebaseMessaging.find({
    where: { token }
  });
  return response;
}

export async function sequelizeFindAllToken() {
  const response = await FirebaseMessaging.findAll();
  return response;
}
