var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: {type:String, required:true},
  owner: {type:String, required:true},
  project:{type:String, required:true}, 
  project_id:{type:String, required:true},
  status: String,
  description: String,
  tags: [String],
  parameterFile: String,
  notes:String,
  users: [String],
  start_time: {type:Date, required:true},
  run_duration: Date
});

var Experiment = mongoose.model("Experiment", ExperimentSchema);
module.exports = Experiment;
