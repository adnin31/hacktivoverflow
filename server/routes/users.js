var express = require('express');
var router = express.Router();
var users = require('../controllers/users')

/* GET users listing. */
router.get('/', users.getAll);
router.post('/register',users.insertData)
router.put('/:id',users.updateData)
router.delete('/:id',users.removeData)
router.post('/signin', users.signin)

module.exports = router;
