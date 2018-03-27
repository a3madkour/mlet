var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {type: String, required:true},
  owner: {type: String, required:true},
  description: {type: String, required:false},
  date_of_creation: {type: String, required:true},
  users: [{
    name: String,
    permissions:  [String]
  }]
});

var Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
