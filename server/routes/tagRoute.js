const router = require('express').Router()
const TagController = require('../controllers/TagController')
const { authentication } = require('../middleware/auth')

router.post('/', TagController.create)
router.get('/', TagController.find)
router.get('/all', TagController.findAll)
router.get('/:id', TagController.findById)
router.patch('/:id/watch', authentication, TagController.watch)
router.patch('/:id/unwatch', authentication, TagController.unwatch)

module.exports = router