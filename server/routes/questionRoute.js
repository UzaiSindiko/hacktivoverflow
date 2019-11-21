const router = require('express').Router()
const QuestionController = require('../controllers/QuestionContoller')
const { authentication, authorizationQuestion } = require('../middleware/auth')

router.post('/', authentication, QuestionController.create)
router.get('/', QuestionController.find)
router.get('/top', QuestionController.findTop)
router.get('/:id/tag', QuestionController.tag)
router.get('/user', authentication, QuestionController.findByUser)
router.get('/search', QuestionController.search)
router.get('/:id', QuestionController.findById)
router.patch('/:id', authentication, authorizationQuestion, QuestionController.update)
router.delete('/:id', authentication, authorizationQuestion, QuestionController.delete)
router.patch('/:id/upvote', authentication, QuestionController.upvote)
router.patch('/:id/downvote', authentication, QuestionController.downvote)

module.exports = router
