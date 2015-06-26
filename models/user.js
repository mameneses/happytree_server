var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  picture: String,
  school: String,
  classes:[],
  sightWordLists: [],
  recentAssesments: {letter:[], sightWords:[]},
  accessToken: String
})

var User = mongoose.model('User', schema);

module.exports = User;