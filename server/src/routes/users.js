var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user')
mongoose.connect('mongodb://localhost:27017/mlet');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// Add new post
router.post('/', (req, res) => {
  var db = req.db;
  var name = req.body.name;
  var projects = req.body.projects;
  var notifications = req.body.notifications;
  var password = req.body.password;
  var new_user = new User({
    name: name,
    projects: projects,
    notifications: notifications,
    password: password
  })

  new_user.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})
// Fetch all posts
router.get('/', (req, res) => {
  if(req.query.project_name != null){
    User.
      find({}).
      where('projects').
      elemMatch({"name":req.query.project_name}).
      sort({_id:-1}).
      exec(function(error,users){
        if (error) { console.error(error); }
        res.send({
          users: users
        })
      });
  }if (req.query.user_name != null){
    User.
      findOne({'name': req.query.user_name}).
      exec(function(error,users){
        if (error) { console.error(error); }
        res.send({
          users: users
        })
      });
  }else{
    User.find({}, function (error, users) {
      if (error) { console.error(error); }
      res.send({
        users: users
      })
    }).sort({_id:-1})
  }
})
// Fetch single post
router.get('/:id', (req, res) => {
  var arr = req.params.id.split(",")
  var name = arr[1]
  var db = req.db;
  User.findById(req.params.id, function (error, user) {
    if (error) { console.error(error); }
    res.send(user)
  })
})

// Update a post
router.put('/:id', (req, res) => {
  var db = req.db;
  User.findById(req.params.id, function (error, user) {
    if (error) { console.error(error); }
    
    if(req.body.name !=null){
      user.name = req.body.name
    }
    if(req.body.password !=null){
      user.password = req.body.password
    }
    if(req.body.projects !=null){
      user.projects = req.body.projects
    }
    if(req.body.notifications !=null){
      user.notifications = req.body.notifications;
    }
    user.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})
// Delete a post
router.delete('/:id', (req, res) => {
  var db = req.db;
  User.remove({
    _id: req.params.id
  }, function(err, user){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
module.exports = router;
