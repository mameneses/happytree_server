var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  currentGrade: String,
  className: String,
  currentTeacherID: String,
  letterAssesmentScores:[String],
  sightWordAssesmentScores:[String]

})

var Student = mongoose.model('Student', schema);

module.exports = Student;