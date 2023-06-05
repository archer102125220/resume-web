import _Sequelize from 'sequelize';
import process from 'process';

import databaseConfig from './config/database';
import FirebaseMessaging from './firebasemessaging';

const pluginBatabases = {
  FirebaseMessaging
};

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env] || {};

let _sequelize = null;
if (config.use_env_variable) {
  _sequelize = new _Sequelize(process.env[config.use_env_variable], config);
} else {
  _sequelize = new _Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {
  // FirebaseMessaging: _sequelize.import('firebasemessaging', FirebaseMessaging)
};

Object.keys(pluginBatabases).forEach(modelName => {
  db[modelName] = _sequelize.import(modelName, pluginBatabases[modelName]);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = _sequelize;
db.Sequelize = _Sequelize;

module.exports = db;
