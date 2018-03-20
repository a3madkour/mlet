var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExperimentSchema = new Schema({
  name: String,
  owner: String,
  project: String,
  status: String,
  description: String,
  tags: [String],
  parameterFile: String,
  notes:String,
  users: [String]
});

var Experiment = mongoose.model("Experiment", ExperimentSchema);
module.exports = Experiment;
