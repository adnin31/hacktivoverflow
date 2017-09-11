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
  question.findOne(req.params.id).populate('answers').populate('author')
  .then(data=>{
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

function updateData(req,res){
  // question.update({
  //   _id : req.params.id
  // },{
  //   username  :req.body.username,
  //   email :req.body.email,
  //   password : makePassword,
  //   key : newKey
  // },(err,data)=>{
  //   if(!err){
  //     res.send(data)
  //   }else {
  //     res.send(error)
  //   }
  // })
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
  let token = req.headers.token
  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    question.findById(req.params.id)
    .then(questionData=>{
      answers.findById(req.body.id)
      .then(answerData=>{
        var answerArr = questionData.answers
        var answersIndex = questionData.answers.indexOf(req.body.id)
        if(answerData.author[0]==decoded._id){
          answers.remove(req.body.id)
          .then(removedAnswer=>{
            // res.send(removedAnswer)
            console.log();
            answerArr.splice(answersIndex,1)
            console.log(removedAnswer);
            question.update({
              _id: req.params.id
            },{
              _id: questionData._id,
              content: questionData.content,
              answers: questionData.answers,
              author: questionData.author
            })
            .then(data=>{
              console.log(data);
              res.send('data has been updated with delete')
            })
            .catch(err=>res.send(err))
          })
          .catch(err=>{
            res.send(err)
          })
        }
        else {
          res.send('You cannot delete this answers')
        }
      })
    })
  })
}
module.exports = {getAll,insertData,updateData,removeData,addAnswers,deleteAnswers};
