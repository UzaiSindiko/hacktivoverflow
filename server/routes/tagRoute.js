const router = require('express').Router()
const TagController = require('../controllers/TagController')

router.post('/', TagController.create)
router.get('/', TagController.find)
router.get('/all', TagController.findAll)
router.get('/:id', TagController.findById)

module.exports = router