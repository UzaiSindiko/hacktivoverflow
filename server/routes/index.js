const router = require('express').Router()
const userRoute = require('./userRoute')
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')
const tagRoute = require('./tagRoute')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)
router.use('/tags', tagRoute)

module.exports = router
