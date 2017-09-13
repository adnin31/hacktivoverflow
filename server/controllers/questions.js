var question = require('../models/questions')
var jwt =require('jsonwebtoken');
require('dotenv').config();
var ObjectId = require('mongoose').Types.ObjectId;
answers = require('../models/answers')

function getAll(req,res){
  question.find().populate('answers').populate('author')
  .then(data=>{
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

function insertData(req,res) {
  let token = req.headers.token
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=> {
    console.log(decoded);
    var newQuestion = new question({
      author : decoded._id,
      content :req.body.content,
      question: req.body.question
    })

    newQuestion.save((err,data)=>{
      if(!err){
        res.send(data)
      }else {
        res.status(500).send(err)
      }
    })

  })
}

function getOneQuestion(req, res) {
  question.findOne({_id:req.params.id}).populate({
    path: 'answers',
    populate: {
      path: 'answerAuthor',
      model: 'User'
    }
  }).populate('author')
  .then(data=>{
    console.log(data);
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

function updateData(req,res){
  question.update({
    _id : req.params.id
  },{
    question: req.body.question,
    content :req.body.content
  },(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(error)
    }
  })
}

function removeData(req,res) {
  let token = req.headers.token
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    question.findById(req.params.id)
    .then(data=>{
      if (data.author[0] == decoded._id){
        question.remove({_id:req.params.id},(err,data)=>{
          if(!err){
            res.send(data)
          }else {
            res.send(err)
          }
        })
      }else {
        res.send('You cannot delete this data')
      }
    })
    .catch(err=>res.send(err))
  })
}

function addAnswers(req,res) {
  let token = req.headers.token
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    question.findById(req.params.id)
    .then(data=>{
      answers.create({
        answerAuthor: decoded._id,
        content: req.body.content
      })
      .then(dataAnswers=>{
        question.update({
          _id: req.params.id
        },{
          $push:{
            answers: dataAnswers._id
          }
        }).then(data=>{
          res.send(data)
        })
      })
    })
  })
}

function deleteAnswers (req, res) {
  console.log(req.params.idquestion);
  console.log(req.params.idanswer);
  let token = req.headers.token
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    question.findOne({_id:req.params.idquestion}).populate({
      path: 'answers'
    })
    .then(questionData=>{
      // console.log(questionData);
      // filter yang id != answers yang  mau kita hapus
      // console.log();
      var arrAnswer = questionData.answers
      console.log();

      question.update({
        _id : req.params.idquestion
      },{
        answers: arrAnswer.filter(answer => {
          return answer._id != req.params.idanswer
        })
      },(err,data)=>{
        if(!err){
          res.send('berhasil')
        }else {
          res.send(error)
        }
      })
    })
  })
}
module.exports = {getAll,insertData,updateData,removeData,addAnswers,deleteAnswers,getOneQuestion};
