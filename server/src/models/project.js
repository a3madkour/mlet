var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  owner: String,
  description: String,
  creation_time: Date,
  run_duration: Date
});

var Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
