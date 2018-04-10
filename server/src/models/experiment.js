var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: {type:String, required:true},
  owner: {type:String, required:true},
  project:{type:String, required:true},
  project_id:{type:String, required:true},
  status: String,
  notify: Boolean,
  description: String,
  tags: [String],
  parameterFile: String,
  terminal_out: String,
  notes:String,
  users: [String],
  start_time: {type:String, required:true},
  end_time: String
});

var Experiment = mongoose.model("Experiment", ExperimentSchema);
module.exports = Experiment;
