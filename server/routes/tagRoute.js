const router = require('express').Router()
const TagController = require('../controllers/TagController')

router.post('/', TagController.create)
router.get('/', TagController.find)

module.exports = router