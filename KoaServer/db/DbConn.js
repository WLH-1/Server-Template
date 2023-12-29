const mongoose = require('mongoose');
const Key = require('../configuration/env')()

module.exports = function DBUrlFactory() {
  const conn = mongoose.createConnection(Key.DBUrl, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
  const Global = conn.model('Global', require('./global'), 'global');
  const User = conn.model('User', require('./user'), 'user');
  
  return {
    Global,
    User,
    conn
  };
};