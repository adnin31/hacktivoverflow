var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password :{
    type : String,
    required : true
  },
  email :{
    type : String,
    required : true
  },
  key : String,
  role : String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
