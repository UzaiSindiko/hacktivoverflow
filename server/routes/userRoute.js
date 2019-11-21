const router = require('express').Router()
const UserController = require('../controllers/UserController')

require('../helpers/corn')
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router