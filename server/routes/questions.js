var express = require('express');
var router = express.Router();
var questions = require('../controllers/questions')
var auth = require('../helper/auth')

router.get('/', questions.getAll);
router.get('/:id', questions.getOneQuestion)
router.post('/', auth.authentikasi ,questions.insertData)
router.put('/:id', auth.authentikasi ,questions.updateData)
router.delete('/:id', auth.authentikasi ,questions.removeData);

router.post('/:id/answer', auth.authentikasi , questions.addAnswers)
router.delete('/:idquestion/answer/:idanswer', auth.authentikasi , questions.deleteAnswers)

module.exports = router;
