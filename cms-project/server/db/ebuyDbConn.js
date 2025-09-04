const mongoose = require('mongoose');
const Key = require('../configuration/env')()

module.exports = function ebuyDBUrlFactory() {
  const conn = mongoose.createConnection(Key.ebuyDBUrl, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

  const Article = conn.model('Article', require('./article'), 'article');
  const SeoSetting = conn.model('SeoSetting', require('./seoSetting'), 'seosetting');
  
  
  return {
    Article,
    SeoSetting,
    conn
  };
};