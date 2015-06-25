module.exports = {
  db: process.env.MONGOLAB_URI || 'localhost',
  tokenSecret: process.env.tokenSecret || 'the giving tree'
 
};