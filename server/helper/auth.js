"use-strict"
var jwt =require('jsonwebtoken');
require('dotenv').config();

function authentikasi(req,res,next) {
    // console.log(req.headers.token);
    var token = req.headers.token
    // console.log('ini token', token);
    if (token != null) {
      jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=> {
        if (decoded.role == 'user') {
          return next()
        }else {
          res.status(500).send('not authorized')
        }
      })
    }
    else {
      res.send("Please Login")
    }

 }

module.exports ={authentikasi} ;
