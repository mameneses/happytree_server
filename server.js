var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');

var config = require('./config');
 
mongoose.connect(config.db);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

  // var User = require('./models/user')
  // var Student = require('./models/student')
  // var Assesment = require('./models/assesment')

var router = express.Router();

// middleware to use for all requests
// function isAuthenticated(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
//   }
 
//   var header = req.headers.authorization.split(' ');
//   var token = header[1];
//   var payload = jwt.decode(token, config.tokenSecret);
//   var now = moment().unix();
 
//   if (payload.exp <= now) {
//     return res.status(401).send({ message: 'Token has expired.' });
//   }
 
//   User.findById(payload.sub, function(err, user) {
//     if (!user) {
//       return res.status(400).send({ message: 'User no longer exists.' });
//     }
 
//     req.user = user;
//     next();
//   })
// }

// function createToken(user) {
//   var payload = {
//     exp: moment().add(14, 'days').unix(),
//     iat: moment().unix(),
//     sub: user._id
//   };
//   return jwt.encode(payload, config.tokenSecret);
// }

// app.use('/api', router)

// router.use(function(req, res, next) {
//     // do logging
//     console.log(req.method + " " + req.url )
//     console.log('*****');
//     next(); // make sure we go to the next routes and don't stop here
// });

// router.get('/', function (req, res) {
//   res.json({ message: 'hooray! welcome to our api!' });   
// });

// router.route('/users')
//   .get(isAuthenticated, function(req, res) { 

//   User.find({}, function(err, users) {
//       var users = users

//       res.json(users)
//     })
//   });

// /////////////////GET USER //////////////////////////

// router.route('/users/:user_id')
//   .get(isAuthenticated, function(req, res) {
//       User.findById(req.params.user_id, function(err, user) {
//           if (err)
//               res.send(err);
//           res.json(user);
//       });
//   });

// //////////////////// SAVE STUDENT /////////////////

// router.route('/students')
//   .post(isAuthenticated, function(req,res) {

//     var student = new Student ({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       currentGrade: req.body.currentGrade,
//       className: req.body.className,
//       currentTeacherID: req.body.currentTeacherID
//     })

//     student.save(function(){
    
//       Student.find({currentTeacherID: req.body.currentTeacherID}, function(err, students) {
//         if (err)
//           res.send(err);
//         res.json(students)
//       })
//     })
//   })


// //////////////////// Get STUDENTs /////////////////
// router.route('/students/:user_id')
//   .get(isAuthenticated, function(req,res) {
//     Student.find({currentTeacherID: req.params.user_id}, function(err, students) {
//       if (err)
//         res.send(err);
//       res.json(students)
//     })
//   });

// //////////////////// update STUDENT /////////////////

// router.route('/students/:student_id')
//   .put(isAuthenticated, function(req,res) {

//     Student.findOne({_id: req.params.student_id}, function(err, student) {

//       student.firstName = req.body.firstName
//       student.lastName = req.body.lastName
//       student.currentGrade = req.body.currentGrade
//       student.currentTeacherID = req.body.currentTeacherID
//       student.className = req.body.className
//       student.letterAssesmentScores = req.body.letterAssesmentScores
//       student.sightWordAssesmentScores = req.body.sightWordAssesmentScores

//       student.save( function(){
//         Student.find({currentTeacherID: req.body.currentTeacherID}, function(err, students) {
//           if (err)
//             res.send(err);
//           res.json(students)
//         })
//       })

//     })
//   });

//   ////////////// DELETE STUDENT ///////////////////////////

// router.route('/students/:student_id')
//   .delete(isAuthenticated, function(req,res) {
//     Assesment.find({studentID: req.params.student_id}).remove().exec();
    
//     Student.remove({_id: req.params.student_id}).remove(function(err) {
//       Student.find({currentTeacherID: req.query.currentTeacherID}, function(err, students) {
//         if (err)
//           res.send(err);
//         res.json(students)
//       })
//     })
//   });

//   // ############ UPDATE USER ####################

// router.route('/users/:user_id')
//   .put(isAuthenticated, function(req, res) {
//     User.findOne({_id: req.params.user_id}, '+password', function(err, user) {
//       if(!user) {
//         return res.status(401).send({ message: { email: 'Incorrect email' } });
//         console.log("no user")
//       }

//       if(req.body.password) {

//         bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
//           if (!isMatch) {
//             console.log("incorrect password match")
//             return res.status(401).send({ message: { password: 'Incorrect password' } });
//           } else {
//             user.firstName = req.body.firstName
//             user.lastName = req.body.lastName
//             user.school = req.body.school
//             user.password = req.body.newPassword1
     
//             bcrypt.genSalt(10, function(err, salt) {
//               bcrypt.hash(user.password, salt, function(err, hash) {
//                 user.password = hash;
         
//                 user.save(function() {
//                   user = user.toObject();
//                   delete user.password

//                   res.json(user);
//                 });
//               });
//             });
//           };
//         });
//       } else {
        
//         user.firstName = req.body.firstName
//         user.lastName = req.body.lastName
//         user.school = req.body.school
//         user.sightWordLists = req.body.sightWordLists
//         user.recentAssesments = req.body.recentAssesments
//         user.progressTracker = req.body.progressTracker
//         user.classes = req.body.classes

//         user.save(function() {
//                   user = user.toObject();
//                   delete user.password
//                   res.json(user);
//                 });
//       }
//     });
//   });

// // ################DELETE USER ################

// router.route('/users/:user_id')
//   .delete(isAuthenticated, function(req, res) { 
//     User.remove({_id: req.params.user_id}).remove(function(err) { 
//       if (err)
//         res.send(err);
//       res.send({ message: "User was successfully deleted" })
//     })
//   })

// // ############# LOGIN ROUTE #############

// app.post('/auth/login', function(req, res) {
//   User.findOne({ email: req.body.email }, '+password', function(err, user) {
//     if (!user) {
//       return res.status(401).send({ message: { email: 'Incorrect email' } });
//     }
 
//     bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
//       if (!isMatch) {
//         return res.status(401).send({ message: { password: 'Incorrect password' } });
//       }

//       user = user.toObject();
//       delete user.password;

//       var token = createToken(user);
//       res.send({ token: token, user: user });
//     });
//   });
// });

// // // ############# SIGNUP ROUTE #############

// app.post('/auth/signup', function(req, res) {
//   User.findOne({ email: req.body.email }, function(err, existingUser) {
//     if (existingUser) {
//       return res.status(409).send({ message: 'Email is already taken.' });
//     }
 
//     var user = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       school: req.body.school,
//       email: req.body.email,
//       password: req.body.password
//     });
 
//     bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(user.password, salt, function(err, hash) {
//         user.password = hash;
 
//         user.save(function() {
//           user = user.toObject();
//           delete user.password;

//           var token = createToken(user);
//           res.send({ token: token, user: user });
//         });
//       });
//     });
//   });
// });

// /////////////////// GET ASSESMENTS ///////////////

// router.route('/assesments/:user_id')
//   .get(isAuthenticated, function(req,res) {
//     Assesment.find({teacherID: req.params.user_id}, function(err, assesments) {
//       if (err)
//         res.send(err);
//       res.json(assesments)
//     })
//   });
// ///////////////////// SAVE ASSESMENT ///////////////////

// router.route('/assesments')
//   .post(isAuthenticated, function(req,res) {

//     var newAssesment = new Assesment ({
//       studentName: req.body.studentName,
//       studentID: req.body.studentID,
//       teacherID: req.body.teacherID,
//       name: req.body.name,
//       type: req.body.type,
//       date: req.body.date,
//       percentCorrect: req.body.percentCorrect,
//       correctCount: req.body.correctCount,
//       incorrectCount: req.body.incorrectCount,
//       missed: req.body.missed
//     })

//     newAssesment.save(function(){
    
//       Assesment.find({teacherID: req.body.teacherID}, function(err, assesments) {
//         if (err) { res.send(err); return; };
//         res.json(assesments)
//       })
//     })
//   })

//   /////////////////// DELETE ASSEMENT ///////////

//   router.route('/assesments/:assesment_id')
//   .delete(isAuthenticated, function(req, res) { 
//     Assesment.remove({_id: req.params.assesment_id}).remove(function(err) { 
//       if (err)
//         res.send(err);
//       res.send({ message: "Assesment was successfully deleted" })
//     })
//   })


app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


