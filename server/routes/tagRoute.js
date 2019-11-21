const router = require('express').Router()
const TagController = require('../controllers/TagController')
const { authentication } = require('../middleware/auth')

router.post('/', TagController.create)
router.get('/', TagController.find)
router.get('/all', TagController.findAll)
router.get('/watch', authentication, TagController.getWatch)
router.get('/ignore', authentication, TagController.getIgnore)
router.get('/:id', TagController.findById)
router.patch('/:id/watch', authentication, TagController.watch)
router.patch('/:id/ignore', authentication, TagController.ignore)
router.patch('/:id/neutral', authentication, TagController.netral)

module.exports = router