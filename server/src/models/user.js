var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String, required:true},
  password: {type:String, required:true},
  projects:[{
    name: String,
    _id : String
  }],
  notifications: [{
    description: String,
    type : String,
    time: String
  }]
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
