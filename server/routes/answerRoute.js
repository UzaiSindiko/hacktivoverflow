const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const { authentication, authorizationAnswer } = require('../middleware/auth')

router.post('/', authentication, AnswerController.create)
router.post('/question', AnswerController.findByQuestionId)
router.get('/user', authentication, AnswerController.findByUser)
router.get('/:id', authentication, authorizationAnswer, AnswerController.findById)
router.patch('/:id', authentication, authorizationAnswer, AnswerController.update)
router.patch('/:id/upvote', authentication, AnswerController.upvote)
router.patch('/:id/downvote', authentication, AnswerController.downvote)
router.delete('/:id', authentication, authorizationAnswer, AnswerController.delete)

module.exports = router