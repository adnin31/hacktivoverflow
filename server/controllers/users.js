const users = require('../models/users')
const makeKey     = require("../helper/key")
const encryptPassword = require("../helper/encryptPassword")
var jwt = require('jsonwebtoken');
require('dotenv').config();

function getAll(req,res){
  users.find({},(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
}

function insertData(req,res) {
  var newKey = makeKey()
  var makePassword = encryptPassword(req.body.password,newKey)
  var newUser = new users({
    username  :req.body.username,
    email :req.body.email,
    password : makePassword,
    key : newKey,
    role : 'user'
  })

  newUser.save((err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.status(500).send(err)
    }
  })
}

function updateData(req,res){
  var newKey = makeKey()
  var makePassword = encryptPassword(req.body.password,newKey)
  users.update({
    _id : req.params.id
  },{
    username  :req.body.username,
    email :req.body.email,
    password : makePassword,
    key : newKey
  },(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(error)
    }
  })
}

function removeData(req,res) {
  users.remove({_id:req.params.id},(err,data)=>{
    if(!err){
      res.send(data)
    }else {
      res.send(err)
    }
  })
}
function signin(req,res){
  users.find({username: req.body.username}).
  then(data=>{

    if (data[0].password == encryptPassword(req.body.password,data[0].key)) {
      var token = jwt.sign({
        _id :data[0]._id,
        username : data[0].username,
        role : data[0].role
      },process.env.SECRET_KEY);
      res.send(token)
    }else {
      res.send('password salah')
    }
  })
  .catch(err=> res.send('You Must Register First'))
}


module.exports ={getAll,insertData,updateData,removeData,signin} ;
