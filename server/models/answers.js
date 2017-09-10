var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answersSchema = new Schema({
  author : [{type : Schema.Types.ObjectId, ref : 'User'}],
  content :{
    type : String,
    required : true
  }
});

var answers = mongoose.model('Answer', answersSchema);
module.exports = answers;
