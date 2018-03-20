var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: String,
  owner: String,
  project: String,
  project_id:String,
  status: String,
  description: String,
  tags: [String],
  parameterFile: String,
  notes:String,
  users: [String],
  start_time: Date,
  run_duration: Date
});

var Experiment = mongoose.model("Experiment", ExperimentSchema);
module.exports = Experiment;
