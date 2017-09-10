var express = require('express');
var router = express.Router();
var questions = require('../controllers/questions')
var auth = require('../helper/auth')

/* GET users listing. */
router.get('/', questions.getAll);
router.post('/', auth.authentikasi ,questions.insertData);
router.delete('/:id', auth.authentikasi ,questions.removeData);

router.post('/:id/answer', auth.authentikasi , questions.addAnswers)
router.delete('/:id/answer', auth.authentikasi , questions.deleteAnswers)



module.exports = router;
