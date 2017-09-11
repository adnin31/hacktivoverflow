var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  author : [{type : Schema.Types.ObjectId, ref : 'User'}],
  question: String,
  content :{
    type : String,
    required : true
  },
  answers :[{type : Schema.Types.ObjectId, ref : 'Answer'}]
});

var questions = mongoose.model('Question', questionSchema);
module.exports = questions;
